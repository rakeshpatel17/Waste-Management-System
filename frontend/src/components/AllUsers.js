import React, { useState , useEffect} from 'react';
const AllUsers = () => {
    const [users, setUsers] = useState([])

    /* fetching data */
    const fetchData=async ()=>{
        try {
            const response = await fetch(`http://localhost:4000/api/admin/allusers`, { method: 'GET' });
            const data = await response.json();
            setUsers(data);
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

        const sortedArray = [...users].sort((a, b) => {
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

        setUsers(sortedArray);
    };
    return (
    //     <div className="container mt-4">
    //   <h1 className="text-center">All Users</h1>
    //   <table className="table table-hover">
    //     <thead className="table-dark">
    //       <tr>
    //         <th scope="col">User Id</th>
    //         <th scope="col">User Name</th>
    //         <th scope="col">Address</th>
    //         <th scope="col">Phone</th>
    //       </tr>
    //     </thead>
        // <tbody>
        // {
        //     users.map((row) => (
        //     <tr key={row.id}>
        //         <td>{row.uid}</td>
        //         <td>{row.username}</td>
        //         <td>{row.address}</td>
        //         <td>{row.phone}</td>
        //     </tr>
        //     ))
        // }
        // </tbody>
    //   </table>
    // </div>
    <>
    <h1 className='text-center'>All Users</h1>
    <div className="container mt-4">
      <table className="table table-hover">
          <thead className="table-dark">
          <tr>
              <th scope="col"  onDoubleClick={() => handleHeaderDoubleClick('uid')} style={{cursor:"pointer"}}>User Id</th>
              <th scope="col" onDoubleClick={() => handleHeaderDoubleClick('username')} style={{cursor:"pointer"}}>User Name</th>
              <th scope="col" onDoubleClick={() => handleHeaderDoubleClick('address')} style={{cursor:"pointer"}}>Address</th>
              <th scope="col" onDoubleClick={() => handleHeaderDoubleClick('phone')} style={{cursor:"pointer"}}>Phone</th>

          </tr>
          </thead>
          <tbody>
          {
              users.map((row) => (
              <tr key={row.id}>
                  <td>{row.uid}</td>
                  <td>{row.username}</td>
                  <td>{row.address}</td>
                  <td>{row.phone}</td>
              </tr>
              ))
          }
          </tbody>
      </table>
      </div>
    </>
    )
};

export default AllUsers