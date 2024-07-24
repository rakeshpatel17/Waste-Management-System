import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router'; 
import '../css/waste.css';
import Loading from './Loading';
import LocationPicker from './LocationPicker';
import file from "../images/call.png"
import QuantityInput from './Quantity';
const ScheduleWaste = ({ userData, isLoggedIn, setSchedule, scheduled }) => {
  const [submit, isSubmit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [useCurrentLocation, setUseCurrentLocation] = useState(true);
  const [location, setLocation] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setLocation(currentLocation);
        },
        (error) => {
          console.error("Error getting location: ", error);
        }
      );
    }
  }, []);

  const [formData, setFormData] = useState({
    collectionDate: '',
    address: '',
    quantity: '',
    uid: userData.uid,
    latitude: '',
    longitude: '',
  });

  useEffect(() => {
    if (location) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        latitude: location.lat,
        longitude: location.lng,
      }));
    }
  }, [location]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    fetch("http://localhost:4000/api/collections", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        isSubmit(true);
        setSchedule(scheduled + 1);
        setLoading(false); 
        navigate('/dashboard');
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false); 
      });
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return <Loading />;
  }

  const getCurrentDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); 
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };
  return (
    <div className='outer' style={{ minHeight: "100vh" }}>
      <div className='container'>
        <h2 className='text-center my-5'>Schedule Waste Here!!</h2>
          <form className="waste-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="collectionDate">Collection Date</label>
              <input
                type="date"
                id="collectionDate"
                name="collectionDate"
                value={formData.collectionDate}
                onChange={handleChange}
                min={getCurrentDate()}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group" >
                <label htmlFor="quanity">Select Quantity(in Kgs)</label>
                <QuantityInput />
            </div>
            <div className="form-group">
            <label>Location</label>
            <div className="radio-group">
              <label htmlFor="currentLocation">Use Current Location</label>
              <input
                type="radio"
                id="currentLocation"
                name="locationOption"
                value="currentLocation"
                checked={useCurrentLocation}
                onChange={() => setUseCurrentLocation(true)}
              />
              <label htmlFor="selectLocation">Select Location on Map</label>
              <input
                type="radio"
                id="selectLocation"
                name="locationOption"
                value="selectLocation"
                checked={!useCurrentLocation}
                onChange={() => setUseCurrentLocation(false)}
              />
            </div>
          </div>
          {!useCurrentLocation && location && (
            <LocationPicker initialPosition={location} setLocation={setLocation} />
          )}
            <button type="submit" className="btn">Schedule Waste</button>
          </form>
      </div>
    </div>
  );
};

export default ScheduleWaste;
