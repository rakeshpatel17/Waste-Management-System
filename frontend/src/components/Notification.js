import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';

const NotificationComponent = () => {
  const [notifications, setNotifications] = useState([]);
  const [waste, setWaste] = useState([]);
  const [ratedNotifications, setRatedNotifications] = useState({}); // store ratings by collectionId

  const fetchAssignEmp = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/collections/');
      const data = await response.json();
      setWaste(data);

      // Fetch employee data
      const empDataPromises = data.map(async (item) => {
        const empResponse = await fetch(`http://localhost:4000/api/employee/${item.assignedEmpId}`);
        if (empResponse.ok) {
          const empData = await empResponse.json();
          return {
            ...empData,
            assignedEmpId: item.assignedEmpId,
            collectionId: item.collectionId,
            count: item.count // include count from the collection data
          };
        }
        console.error(`Failed to fetch employee data for empId ${item.assignedEmpId}`);
        return null;
      });

      const empData = await Promise.all(empDataPromises);
      setNotifications(empData.filter(emp => emp !== null));

      // Initialize ratings for collections
      setRatedNotifications(data.reduce((acc, item) => {
        if (item.rating !== null) acc[item.collectionId] = item.rating;
        return acc;
      }, {}));
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

  const handleRatingChange = async (newRating, notificationId, collectionId) => {
    setRatedNotifications({ ...ratedNotifications, [collectionId]: newRating }); // set rating per collection
    try {
      await fetch('http://localhost:4000/api/employee/rateEmployee', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ empId: notificationId, collectionId, rating: newRating }),
      });
    } catch (error) {
      console.error('Error saving rating:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Notifications</h2>
      <div className="container d-flex flex-column">
        {notifications.map((notification) => (
          <div key={notification.collectionId} className="p-3" style={{ backgroundColor: '#B5CFB7', borderRadius: '5px', marginBottom: '10px' }}>
            <p>
              The waste scheduled on {getCollectionData(notification.assignedEmpId, 'collectionDate')} with id {getCollectionData(notification.assignedEmpId, 'collectionId')} at {getCollectionData(notification.assignedEmpId, 'address')} will be picked up by our employee, <strong>{notification.username}</strong>.
              <button style={{ background: "none", border: "none" }} onClick={() => handleNavigation(notification)}>See Details</button>
            </p>
            {notification.count===3 && 
            <div>
              
              <Typography component="legend">Rate the Driver</Typography>
              <Rating
                name={`rating-${notification.collectionId}`}
                value={ratedNotifications[notification.collectionId] || 0}
                precision={0.2}
                onChange={(event, newValue) => handleRatingChange(newValue, notification._id, notification.collectionId)}
                disabled={ratedNotifications[notification.collectionId] !== undefined || notification.count < 3}
              />
            </div>
            }
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationComponent;
