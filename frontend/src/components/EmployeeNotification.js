import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import Modal from './Modal';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function EmployeeNotification() {
    const [wasteDetails, setWasteDetails] = useState([]);
    const [selectedWaste, setSelectedWaste] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const location = useLocation();
    const empid = location.state ? location.state.employee : null;

    const getPickupWaste = async () => {
        try {
            const pickupresponse = await fetch(`http://localhost:4000/api/collections/`);
            const response = await pickupresponse.json();
            const filteredWaste = response.filter(waste => waste.assignedEmpId === empid);
            setWasteDetails(filteredWaste);
        } catch (err) {
            console.error("Error fetching waste collections:", err);
        }
    };

    useEffect(() => {
        if (empid) {
            getPickupWaste();
        }
    }, [empid]); 

    const handleViewLocation = (waste) => {
        setSelectedWaste(waste);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedWaste(null);
    };

    return (
        <>
            <h1>Hey Employee.. Here are your notifications</h1>
            <div className='container p-3' style={{ width: "fitContent" }}>
                {
                    wasteDetails.length > 0 ? (
                        wasteDetails.map((waste) => (
                            <div key={waste.id} className='container border p-3 my-3' style={{ width: "fitContent", backgroundColor: "beige",borderRadius:"10px     "}}>
                                <p>Collection Id: {waste.collectionId}</p>
                                <p>User id: {waste.uid}</p>
                                <p>Collection Date: {waste.collectionDate}</p>
                                <p>Quantity: {waste.quantity}</p>
                                <button className="btn btn-info" style={{ backgroundColor: "brown" }} onClick={() => handleViewLocation(waste)}>
                                    View Location
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No notifications available</p>
                    )
                }
            </div>

            {selectedWaste && (
                <Modal show={showModal} onClose={closeModal}>
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
                </Modal>
            )}
        </>
    );
}
