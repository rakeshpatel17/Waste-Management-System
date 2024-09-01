import React, { useEffect, useState } from 'react';
import AdminProgress from './AdminProgress';
import Modal from './Modal';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon from '../images/marker-icon.png';
import markerShadow from '../images/marker-shadow.png';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const AllWastes = () => {
  const [wastes, setWastes] = useState([]);
  const [selectedWaste, setSelectedWaste] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEmp, setShowEmp] = useState(false);
  const [empData, setEmpData] = useState([]);
  const [assigned, setAssigned] = useState(false);
  const [imageModal, setImageModal] = useState(false);  // State for image modal
  const [viewImage,setViewImage] = useState(null);//for viewing image
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/admin/allwastes');
      const data = await response.json();
      setWastes(data);
    } catch (error) {
      console.log('Error in fetching the data', error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/employee/getAllEmployees');
      const data = await response.json();
      setEmpData(data.data);
      console.log("Employee data fetched:", data, ":: ", empData);
    } catch (err) {
      console.log("Error in fetching employee details", err);
    }
  };

  useEffect(() => {
    fetchData();
    fetchEmployees();
  }, []);

  const [sortDirection, setSortDirection] = useState('asc');
  const [sortBy, setSortBy] = useState(null);

  const handleHeaderDoubleClick = (header) => {
    const direction = sortDirection === 'asc' ? 'desc' : 'asc';
    setSortDirection(direction);
    setSortBy(header);

    const sortedArray = [...wastes].sort((a, b) => {
      if (direction === 'asc') {
        return a[header] < b[header] ? -1 : a[header] > b[header] ? 1 : 0;
      } else {
        return a[header] < b[header] ? 1 : a[header] > b[header] ? -1 : 0;
      }
    });
    setWastes(sortedArray);
  };

  const handleViewLocation = async (waste) => {
    setSelectedWaste(waste);
    setShowModal(true);
  };

  // const  handleViewImage = async (waste) => {
  //   setSelectedWaste(waste);
  //   setImageModal(true); 
  //   try {
  //     const temp = await axios.get(`http://localhost:4000/api/collections/image`,{params:{id:waste.image}});
  //     if(!temp)
  //       console.log("Error in fetching image");
  //     else
  //     {
  //       console.log(temp.data);
  //       // Assuming 'file' is a File object (e.g., from an <input> element or drag-and-drop)
  //     const blob = new Blob([temp.data], { type: temp.data.type });

  //     // Create a URL for the Blob
  //     const urlImage = URL.createObjectURL(blob);
  //     alert(urlImage);
  //       setViewImage(urlImage);
  //     }
    
  //   } catch (error) {
  //       console.log("error",error);
  //   }
  // };
  const handleViewImage = async (waste) => {
    setSelectedWaste(waste);
    setImageModal(true); 
  
    try {
      const response = await axios.get(`http://localhost:4000/api/collections/image`, {
        params: { id: waste.image },
        responseType: 'blob' // Ensure the response is treated as a Blob
      });
  
      if (!response || !response.data) {
        console.log("Error in fetching image");
      } else {
        // Create a Blob from the response data
        const blob = new Blob([response.data], { type: response.data.type || 'image/jpeg' });
  
        // Create a URL for the Blob
        const urlImage = URL.createObjectURL(blob);
  
        // Display the image URL or use it as needed
        setViewImage(urlImage);
      }
  
    } catch (error) {
      console.log("error", error);
    }
  };
  
  const closeModal = () => {
    setSelectedWaste(null);
    setShowModal(false);
    setImageModal(false);
  };

  const handleAssignDriver = (waste) => {
    setSelectedWaste(waste);
    setShowEmp(true);
  };

  const assignEmployee = async (empid) => {
    const assignedEmp = empData.find((emp) => emp._id === empid);
    if (assignedEmp) {
      const updatedWastes = wastes.map((waste) => 
        waste.collectionId === selectedWaste.collectionId && !waste.assignedEmpId
          ? { ...waste, assignedEmpId: assignedEmp._id }
          : waste
      );
      setWastes(updatedWastes);

      try {
        const response = await fetch(`http://localhost:4000/api/employee/assignEmployee/${empid}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ collectionId: selectedWaste.collectionId, assignedEmpId: assignedEmp._id })
        });
        const data = await response.json();
        console.log(data);
        setAssigned(true);
      } catch (error) {
        console.error("Error assigning employee:", error);
      }
    }

    setShowEmp(false);
  };

  const handleDriverDetails = (row) => {
    const assignedEmp = empData.find((emp) => emp._id === row.assignedEmpId);
    if (assignedEmp) {
      navigate('/employee', { state: { employee: assignedEmp } });
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">All Wastes Scheduled</h1>
      <table className="table table-hover">
        <thead className="table-dark">
          <tr>
            <th scope="col" onDoubleClick={() => handleHeaderDoubleClick('uid')} style={{ cursor: "pointer" }}>User Id</th>
            <th scope="col" onDoubleClick={() => handleHeaderDoubleClick('collectionId')} style={{ cursor: "pointer" }}>Collection Id</th>
            <th scope="col" onDoubleClick={() => handleHeaderDoubleClick('collectionDate')} style={{ cursor: "pointer" }}>Collection Scheduled Date</th>
            <th scope="col" onDoubleClick={() => handleHeaderDoubleClick('address')} style={{ cursor: "pointer" }}>Address</th>
            <th scope="col" onDoubleClick={() => handleHeaderDoubleClick('notes')} style={{ cursor: "pointer" }}>Notes</th>
            <th scope="col" style={{ cursor: "pointer" }}><center>Status</center></th>
            <th scope="col"><center>Actions</center></th>
          </tr>
        </thead>
        <tbody>
          {wastes.map((row) => (
            <tr key={row.collectionId}>
              <td>{row.uid}</td>
              <td>{row.collectionId}</td>
              <td>{row.collectionDate}</td>
              <td>{row.address}</td>
              <td><AdminProgress cid={row.collectionId} count={row.count} /></td>
              <td>
                <button className="btn btn-info" onClick={() => handleViewLocation(row)}>
                  View Location
                </button>
              </td>
              <td>
                <button className="btn btn-secondary" onClick={() => handleViewImage(row)}>
                  View Image
                </button>
              </td>
              <td key={row.collectionId}>
                <button id={row.collectionId} className="btn btn-primary" onClick={() => handleAssignDriver(row)} style={{display:row.assignedEmpId!==""?"none":"block"}}>Assign Driver</button>
                <button id={row.collectionId} className="btn btn-primary" onClick={() => handleDriverDetails(row)} style={{display:row.assignedEmpId===""?"none":"block"}} >View Details</button>
              </td>
            </tr>
          )).reverse()}
        </tbody>
      </table>
      <Modal show={showEmp} onClose={() => setShowEmp(false)}>
        <div className="d-flex flex-column justify-content-center align-items-center">
          {empData.length > 0 ? (
            empData.map((emp) => (
              emp.status!=='busy' && <div key={emp._id} className="card" style={{ width: "18rem", margin: "10px" }}>
                <div className="card-body">
                  <h5 className="card-title text-center">{emp.username}</h5>
                  <center>
                    <button 
                      className='btn' 
                      style={{backgroundColor:emp.status==='In Work'?'red':'green'}} 
                      onClick={() => assignEmployee(emp._id)}
                    >
                     {
                      emp.status==='In Work'?'Busy':'Assign'
                     } 
                    </button>
                  </center>
                </div>
              </div>
            ))
          ) : (
            <p>No employees found.</p>
          )}
        </div>
      </Modal>
      <Modal show={showModal} onClose={closeModal}>
        {selectedWaste && (
          <div>
            <h4>Location Details</h4>
            <MapContainer
              center={[selectedWaste.latitude, selectedWaste.longitude]}
              zoom={13}
              style={{ height: "400px", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[selectedWaste.latitude, selectedWaste.longitude]}>
                <Popup>{selectedWaste.address}</Popup>
              </Marker>
            </MapContainer>
          </div>
        )}
      </Modal>
      <Modal show={imageModal} onClose={closeModal}> {/* Modal for image */}
        {selectedWaste && (
          <div>
            <h4>Waste Image</h4>
            <img 
            src={viewImage} 
            alt="Waste" 
            style={{ 
              maxWidth: "100%", 
              maxHeight: "100%", 
              objectFit: "contain"
            }} 
          />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AllWastes;
