import React, { useState, useEffect } from 'react';

const AllUsers = () => {
    const [issues, setIssues] = useState([]);
    const [sortDirection, setSortDirection] = useState('asc');
    const [sortBy, setSortBy] = useState(null);
    const [change,setChange]=useState(false);
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/admin/allissues', { method: 'GET' });
            const data = await response.json();
            setIssues(data);
        } catch (error) {
            console.log("Error in fetching the data", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [change]);

    const handleHeaderDoubleClick = (header) => {
        const direction = sortDirection === 'asc' ? 'desc' : 'asc';
        setSortDirection(direction);
        setSortBy(header);

        const sortedArray = [...issues].sort((a, b) => {
            if (direction === 'asc') {
                return a[header] < b[header] ? -1 : a[header] > b[header] ? 1 : 0;
            } else {
                return a[header] < b[header] ? 1 : a[header] > b[header] ? -1 : 0;
            }
        });

        setIssues(sortedArray);
    };

    const handleStatus = async (id) => {
        try {
            const response = await fetch(`http://localhost:4000/api/issues/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: 'resolved' }),
            });
            setChange(true);

            const updatedIssue = await response.json();

            // Update the local state with the new status
            setIssues((prevIssues) =>
                prevIssues.map((issue) =>
                    issue.issueId === id ? { ...issue, status: updatedIssue.status } : issue
                )
            );
        } catch (error) {
            console.log("Error in updating the status", error);
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center">Reported Issues</h1>
            <table className="table table-hover">
                <thead className="table-dark">
                    <tr>
                        <th scope="col" onDoubleClick={() => handleHeaderDoubleClick('uid')} style={{ cursor: "pointer" }}>User Id</th>
                        <th scope="col" onDoubleClick={() => handleHeaderDoubleClick('collectionId')} style={{ cursor: "pointer" }}>Collection Id</th>
                        <th scope="col" onDoubleClick={() => handleHeaderDoubleClick('issueId')} style={{ cursor: "pointer" }}>Issue Id</th>
                        <th scope="col" onDoubleClick={() => handleHeaderDoubleClick('issueType')} style={{ cursor: "pointer" }}>Issue Type</th>
                        <th scope="col" onDoubleClick={() => handleHeaderDoubleClick('issueDescription')} style={{ cursor: "pointer" }}>Issue Description</th>
                        <th scope="col" onDoubleClick={() => handleHeaderDoubleClick('status')} style={{ cursor: "pointer" }}>Issue Status</th>
                    </tr>
                </thead>
                <tbody>
                    {issues.map((row) => (
                        <tr key={row.issueId}>
                            <td>{row.uid}</td>
                            <td>{row.collectionId}</td>
                            <td>{row.issueId}</td>
                            <td>{row.issueType}</td>
                            <td>{row.issueDescription}</td>
                            <td onDoubleClick={() => handleStatus(row.issueId)}>
                                <span
                                    className={`badge text-bg-${row.status === 'resolved' ? 'success' : 'danger'} p-2`}
                                    
                                    style={{ cursor: "pointer" }}
                                >
                                    {row.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllUsers;
