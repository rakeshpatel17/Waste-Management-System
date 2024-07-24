import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

function DisplayIssues({ userData, isLoggedIn, complaint, lodgeComplaint, issue,setIssue}) {
  const [editingId, setEditingId] = useState(null);
  const [tableData, setTableData] = useState({
    issueId: '',
    issueType: '',
    issueDescription: '',
    status: '',
    collectionId: ''
  });
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/issues/${userData.uid}`, { method: 'GET' });
      const data = await response.json();
      setIssue(data);
    } catch {
      console.log("Error in fetching the data");
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
    fetchData();
  }, [isLoggedIn]);

  const handleChange = (e) => {
    setTableData({
      ...tableData,
      [e.target.name]: e.target.value
    });
  };

  const handleDelete = async (iid) => {
    try {
      await fetch(`http://localhost:4000/api/issues/${iid}`, { method: "DELETE" });
      lodgeComplaint(complaint-1)
      fetchData();
    } catch {
      console.log("Error in deleting the data");
    }
  };

  const handleEdit = (row) => {
    if (editingId === row.issueId) {
      setEditingId(null);
    } else {
      setEditingId(row.issueId);
      setTableData({
        issueId: row.issueId,
        issueType: row.issueType,
        issueDescription: row.issueDescription,
        status: row.status
      });
    }
  };

  const handleSave = async () => {
    try {
      await fetch(`http://localhost:4000/api/issues/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tableData),
      });
      fetchData(); 
      setEditingId(null);
    } catch {
      console.log("Error in updating the data");
    }
  };

  return (
    <div className="container mt-4" style={{"minHeight": "100vh"}}>
      <h1 className="text-center">Lodged Complaints</h1>
      <table className="table table-hover">
        <thead className="table-dark">
          <tr>
            <th scope="col">Issue Id</th>
            <th scope="col">Issue Type</th>
            <th scope="col">Issue Description</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {
            issue.map((row) => (
              <tr key={row._id}>
                <td>{row.issueId}</td>
                <td>
                  {/* <select
                    id={`issueType-${row.issueId}`}
                    name='issueType'
                    value={editingId === row.issueId ? tableData.issueType : row.issueType}
                    onChange={handleChange}
                    disabled={editingId !== row.issueId}
                  >
                    <option value="">Select an issue type</option>
                    <option value="Missed Pickup">Missed Pickup</option>
                    <option value="Overflowing Bin">Overflowing Bin</option>
                    <option value="Damaged Bin">Damaged Bin</option>
                    <option value="Other">Other</option>
                  </select> */}
                  <td>{row.issueType}</td>
                </td>
                <td>
                  <input
                    type='text'
                    id={`issueDescription-${row.issueId}`}
                    name='issueDescription'
                    value={editingId === row.issueId ? tableData.issueDescription : row.issueDescription}
                    onChange={handleChange}
                    disabled={editingId !== row.issueId}
                  />
                </td>
                <td>{row.status}</td>
                <td>
                  {row.status!=="resolved"&&<button
                      className="btn btn-primary me-4"
                      onClick={() => {
                        if (editingId === row.issueId) {
                          handleSave();
                        } else {
                          handleEdit(row);
                        }
                      }}
                    >
                      {editingId === row.issueId ? 'Save' : 'Update'}
                    </button>
                  }
                  <button className="btn btn-danger" onClick={() => handleDelete(row.issueId)}>Delete</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default DisplayIssues;
