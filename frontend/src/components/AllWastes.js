import React, { useEffect, useState } from 'react';
import AdminProgress from './AdminProgress';
import Modal from './Modal';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon from '../images/marker-icon.png';
import markerShadow from '../images/marker-shadow.png';
// Fix marker icon issue with Leaflet and Webpack
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

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/admin/allwastes', { method: 'GET' });
      const data = await response.json();
      setWastes(data);
    } catch (error) {
      console.log('Error in fetching the data', error);
    }
  };

  useEffect(() => {
    fetchData();
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

  const handleViewLocation = (waste) => {
    setSelectedWaste(waste);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedWaste(null);
    setShowModal(false);
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
              <td>{row.notes}</td>
              <td><AdminProgress cid={row.collectionId} count={row.count} /></td>
              <td>
                <button
                  className="btn btn-info"
                  onClick={() => handleViewLocation(row)}
                >
                  View Location
                </button>
              </td>
            </tr>
          )).reverse()}
        </tbody>
      </table>

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
                /*attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'*/
              />
              <Marker position={[selectedWaste.latitude, selectedWaste.longitude]}>
                <Popup>
                  {selectedWaste.address}
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AllWastes;
