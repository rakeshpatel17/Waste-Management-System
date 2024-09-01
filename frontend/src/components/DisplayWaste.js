import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import '../css/issue.css';
import ProgressBars from './ProgressBar';
import Tracking from './Tracking';
function DisplayWaste({ userData, isLoggedIn, scheduled, setSchedule, lodgeComplaint }) {
  const [waste, setWaste] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    collectionDate: '',
    address: '',
    notes: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      fetchData();
    }
  }, [isLoggedIn, navigate]);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/collections/${userData.uid}`, { method: 'GET' });
      const data = await response.json();
      setWaste(data);
    } catch (error) {
      console.log("Error in fetching the data", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDelete = async (cid) => {
    try {
      await fetch(`http://localhost:4000/api/collections/${cid}`, { method: "DELETE" });
      setSchedule(scheduled - 1);
      fetchData();
    } catch (error) {
      console.log("Error in deleting the data", error);
    }

    try {
      const response = await fetch('http://localhost:4000/api/issues');
      const data = await response.json();
      lodgeComplaint(data.length);
    } catch (error) {
      console.log("Error in fetching issues after deletion", error);
    }
  };

  const handleEdit = (row) => {
    if (editingId === row.collectionId) {
      setEditingId(null);
    } else {
      setEditingId(row.collectionId);
      setFormData({
        collectionDate: row.collectionDate,
        address: row.address,
        notes: row.notes
      });
    }
  };

  const handleReport = (cid) => {
    try {
      navigate('/issuereport', { state: { data: cid } });
    } catch (error) {
      console.log("Error in navigating to report page", error);
    }
  };

  const handleSave = async () => {
    try {
      await fetch(`http://localhost:4000/api/collections/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      setEditingId(null);
      fetchData();
    } catch (error) {
      console.log("Error in updating the data", error);
    }
  };

  return (
    <div className="container p-5 mb-5" style={{ minHeight: "100vh" }}>
      <h1 className="text-center mb-4">Scheduled Waste</h1>
      <div className="row">
        {waste.map((row) => (
          <div className="mycard col-md-4 p-5" style={{ marginLeft: "auto", marginRight: "auto" }} key={row.collectionId}>
            <div className="card h-100 hover-enlarge">
              <div className="cardclass card-body d-flex" style={{ gap: "20px" }}>
                <div className="details">
                  <h4>ID: {row.collectionId}</h4>
                  <label htmlFor={`date-${row.collectionId}`}>Collection Date: </label>
                  <input
                    type='date'
                    id={`date-${row.collectionId}`}
                    name='collectionDate'
                    className="input-spacing"
                    value={editingId === row.collectionId ? formData.collectionDate : row.collectionDate}
                    onChange={handleChange}
                    disabled={editingId !== row.collectionId}
                  />
                  <label htmlFor={`address-${row.collectionId}`}>Address: </label>
                  <input
                    type='text'
                    id={`address-${row.collectionId}`}
                    name='address'
                    className="input-spacing"
                    value={editingId === row.collectionId ? formData.address : row.address}
                    onChange={handleChange}
                    disabled={editingId !== row.collectionId}
                  />
                  <label htmlFor={`notes-${row.collectionId}`}>Quantity: </label>
                  <p>{row.quantity}</p>
                  <div className="d-flex justify-content-between mt-3" style={{ gap: "10px" }}>
                    <button
                      className="btn btn-success"
                      style={{display: row.count >= 3 ? 'none' : 'inline-block'}}
                      onClick={() => {
                        if (editingId === row.collectionId) {
                          handleSave();
                        } else {
                          handleEdit(row);
                        }
                      }} 
                    >
                      {editingId === row.collectionId ? 'Save' : 'Update'}
                    </button>
                      <button className="btn btn-danger" onClick={() => handleDelete(row.collectionId)} >Delete</button>
                      <button className="btn btn-secondary" onClick={() => handleReport(row.collectionId)} >Report</button>
                  </div>
                </div>
                <div className="progress-bar-container mt-5">
                  <ProgressBars count={parseInt(row.count)} />
                </div>
              </div>
            </div>
          </div>
        )).reverse()}
      </div>
    </div>
  );
}

export default DisplayWaste;
