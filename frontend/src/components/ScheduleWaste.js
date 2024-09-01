import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router'; 
import '../css/waste.css';
import LocationPicker from './LocationPicker';

const ScheduleWaste = ({ userData, isLoggedIn, setSchedule, scheduled }) => {
  const [submit, isSubmit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [useCurrentLocation, setUseCurrentLocation] = useState(true);
  const [location, setLocation] = useState(null);
  const [quantity, setQuantity] = useState(5); 
  const [image, setImage] = useState(null); 
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
    quantity: 5, 
    uid: userData.uid,
    latitude: '',
    longitude: '',
    image: null, 
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

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      quantity: quantity,
    }));
  }, [quantity]);

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: image, 
    }));
  }, [image]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append('collectionDate', formData.collectionDate);
    formDataToSend.append('address', formData.address);
    formDataToSend.append('quantity', formData.quantity);
    formDataToSend.append('uid', formData.uid);
    formDataToSend.append('latitude', formData.latitude);
    formDataToSend.append('longitude', formData.longitude);
    formDataToSend.append('image', formData.image);

    fetch("http://localhost:4000/api/collections", {
      method: "POST",
      body: formDataToSend,
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

  const getCurrentDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); 
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const handleDec = () => {
    if (quantity > 5) {
      setQuantity(quantity - 1);
    } else {
      alert("Minimum Quantity can be 5kg's only");
    }
  };

  const handleInc = () => {
    if (quantity < 20) {
      setQuantity(quantity + 1);
    } else {
      alert("Maximum Quantity can be up to 20kg's only");
    }
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
          <div className="form-group">
            <label htmlFor="quantity">Select Quantity (in Kgs)</label>
            <div className="counter-container">
              <button
                type="button"
                className="counter-btn"
                onClick={handleDec}
              >
                -
              </button>
              <span className="counter-value">{quantity}</span>
              <button
                type="button"
                className="counter-btn"
                onClick={handleInc}
              >
                +
              </button>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="image">Upload Image</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
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
