import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router'; 
import '../css/waste.css';
import Loading from './Loading';

const ScheduleWaste = ({userData, isLoggedIn, setSchedule, scheduled}) => {
  const [submit, isSubmit] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(()=>{
    if(!isLoggedIn){
      navigate("/login")
    }
  }, [isLoggedIn]);

  const [formData, setFormData] = useState({
    collectionDate: '',
    address: '',
    notes: ''
  });

  formData.uid = userData.uid;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    fetch("http://localhost:4000/api/collections/", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
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

  useEffect(()=>{
    setTimeout(()=>{
      setLoading(false)
    },2000)
  },[])

  if(loading){
    return <Loading/>
  }
  const getCurrentDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); 
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };
  return (
    <div className='outer' style={{"minHeight": "100vh"}}>
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
              <label htmlFor="notes">Notes</label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn">Schedule Waste</button>
          </form>
      </div>
    </div>
  );
};

export default ScheduleWaste;
