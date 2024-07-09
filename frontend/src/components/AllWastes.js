import React from 'react'
import { useEffect,useState } from 'react';
import AdminProgress from './AdminProgress';
export default function AllWastes() {
    const [wastes, getWastes] = useState([])

    const fetchData=async ()=>{
        try {
            const response = await fetch(`http://localhost:4000/api/admin/allwastes`, { method: 'GET' });
            const data = await response.json();
            getWastes(data);
        } catch {
        console.log("Error in fetching the data");
        }    
    }
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
                if (a[header] < b[header]) return -1;
                if (a[header] > b[header]) return 1;
                return 0;
            } else {
                if (a[header] < b[header]) return 1;
                if (a[header] > b[header]) return -1;
                return 0;
            }
        });

        getWastes(sortedArray);
    };
    return (
        <div className="container mt-4">
      <h1 className="text-center">All Wastes Scheduled</h1>
      <table className="table table-hover">
        <thead className="table-dark">
          <tr>
          <th scope="col"  onDoubleClick={() => handleHeaderDoubleClick('uid')} style={{cursor:"pointer"}}>User Id</th>
          <th scope="col"  onDoubleClick={() => handleHeaderDoubleClick('collectionId')} style={{cursor:"pointer"}}>Collection Id</th>
          <th scope="col"  onDoubleClick={() => handleHeaderDoubleClick('collectionDate')} style={{cursor:"pointer"}}>Collection Scheduled Date</th>
          <th scope="col"  onDoubleClick={() => handleHeaderDoubleClick('address')} style={{cursor:"pointer"}}>Address</th>
          <th scope="col"  onDoubleClick={() => handleHeaderDoubleClick('notes')} style={{cursor:"pointer"}}>Notes</th>
          <th scope="col"  style={{cursor:"pointer"}}><center>Status</center></th>
          </tr>
        </thead>
        <tbody>
        {
            wastes.map((row) => (
            <tr key={row.id}>
                <td>{row.uid}</td>
                <td>{row.collectionId}</td>
                <td>{row.collectionDate}</td>
                <td>{row.address}</td>
                <td>{row.notes}</td>
                <td><AdminProgress cid={row.collectionId} count={row.count}/></td>
            </tr>
            )).reverse()
        }
        </tbody>
      </table>
    </div>
    )
}
