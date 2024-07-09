import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
const IssueReport = ({ isLoggedIn,userData,complaint,lodgeComplaint }) => {
  const [submit, setSubmit] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = location.state || {};
  const [formData, setFormData] = useState({
    uid: '',
    collectionId:'',
    issueType: '',
    issueDescription: ''
  });
  
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  useEffect(()=>{
    
  },[submit])
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.uid = userData.uid;
    formData.collectionId = data;
    console.log("sdjkhf",data);
    console.log('Form submitted:', formData);
    fetch("http://localhost:4000/api/issues/", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSubmit(true);
        navigate('/dashboard');
        lodgeComplaint(complaint+1)
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="container mt-5" style={{"minHeight": "100vh"}}>
      <h2>Report an Issue</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="issueType">Issue Type</label>
          <select
            className="form-control"
            id="issueType"
            name="issueType"
            value={formData.issueType}
            onChange={handleChange}
            required
          >
            <option value="">Select an issue type</option>
            <option value="Missed Pickup">Missed Pickup</option>
            <option value="Bad response">Bad response</option>
            <option value=" Partially Collected"> Partially Collected</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="issueDescription">Description of Issue</label>
          <textarea
            className="form-control"
            id="issueDescription"
            name="issueDescription"
            rows="4"
            value={formData.issueDescription}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">Submit</button>
      </form>
    </div>
  );
};

export default IssueReport;