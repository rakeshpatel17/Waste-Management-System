import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';

const NotificationComponent = () => {
  const [notifications, setNotifications] = useState([]);
  const [waste, setWaste] = useState([]);
  const [rating,setRating] = useState(null);
  const fetchAssignEmp = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/collections/');
      const data = await response.json();
      setWaste(data);

      const empIds = data.map((item) => item.assignedEmpId);
      const empDataPromises = empIds.map(async (empId) => {
        const empResponse = await fetch(`http://localhost:4000/api/employee/${empId}`);
        if (empResponse.ok) {
          const empData = await empResponse.json();
          return {
            ...empData,
            assignedEmpId: empId, 
          };
        }
        console.error(`Failed to fetch employee data for empId ${empId}`);
        return null;
      });

      const empData = await Promise.all(empDataPromises);
      setNotifications(empData.filter(emp => emp !== null));
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };

  useEffect(() => {
    fetchAssignEmp();
  }, []);

  const navigate = useNavigate();

  const handleNavigation = (emp) => {
    const assignedEmp = notifications.find((e) => e._id === emp.assignedEmpId);
    if (assignedEmp) {
      navigate('/employee', { state: { employee: assignedEmp } });
    }
  };

  const getCollectionData = (empId, key) => {
    const wasteItem = waste.find((item) => item.assignedEmpId === empId);
    return wasteItem ? wasteItem[key] : 'N/A';
  };

  const handleRatingChange = (newRating, notificationId) => {
    setRating(newRating)
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Notifications</h2>
      <div className="container d-flex flex-column">
        {notifications.map((notification) => (
          <div key={notification._id} className="p-3" style={{ backgroundColor: '#B5CFB7', borderRadius: '5px', marginBottom: '10px' }}>
            <p>
              The waste which is scheduled on {getCollectionData(notification._id, 'collectionDate')} with id {getCollectionData(notification._id, 'collectionId')} at {getCollectionData(notification._id, 'address')} will be picked up by our employee, <strong>{notification.username}</strong>.
              <button style={{ background: "none", border: "none" }} onClick={() => handleNavigation(notification)}>See Details</button>
            </p>
            <div>
              <Typography component="legend">Rate the Driver</Typography>
              <Rating
                name={`rating-${notification._id}`}
                value={rating}
                precision={0.2}
                onChange={(event, newValue) => handleRatingChange(newValue, notification._id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default NotificationComponent;
