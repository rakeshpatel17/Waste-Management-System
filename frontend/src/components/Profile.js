import React, { useEffect, useState } from 'react';
import '../css/profile.css'
export default function Profile({userData,setUserData }) {
  const [email, setEmail] = useState(userData.email);
  const [uname, setUname] = useState(userData.username);
  const [address, setAddress] = useState(userData.address);
  const [phone, setPhone] = useState(userData.phone);
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState('Edit');
  const [save, setSave] = useState(false);
  useEffect(() => {
    if (save) {
      const data = {
        uid:userData.uid,
        email,
        username: uname,
        address,
        phone,
      };
      setUserData(data);
      fetch("http://localhost:4000/api/users/profile", {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then((response) => response.json())
      .then((data) => {

        console.log(data);
        setSave(false);
      })
      .catch((err) => {
        console.log('Some Error occurred', err);
      });
    }
  }, [save, email, uname, address, phone]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNameChange = (e) => {
    setUname(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleEdit = () => {
    if (edit) {
      setSave(true);
    }
    setEdit(!edit);
    setText(edit ? 'Edit' : 'Save');
  };

  return (
    <div>
      <div className='container p-3' style={{"minHeight": "100vh"}}>
        <div className='container my-3 d-flex justify-content-center align-items-center flex-column p-4 profileDiv' style={{ width:"600px" ,borderRadius:"20px"}}>
          <h1 className='text-center m-4'>Profile</h1>
        <div className="form-floating mb-3" style={{ gap: "20px", width:"500px" }}>
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            value={email}
            onChange={handleEmailChange}
            disabled
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating mb-3 d-flex" style={{ gap: "20px",width:"500px"  }}>
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            value={uname}
            onChange={handleNameChange}
            disabled={!edit}
          />
          <label htmlFor="floatingInput">Username</label>
        </div>
        <div className="form-floating mb-3 d-flex" style={{ gap: "20px",width:"500px"  }}>
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            value={phone}
            onChange={handlePhoneChange}
            disabled={!edit}
          />
          <label htmlFor="floatingInput">Mobile Number</label>
        </div>
        <div className="form-floating mb-3 d-flex" style={{ gap: "20px",width:"500px"  }}>
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            value={address}
            onChange={handleAddressChange}
            disabled={!edit}
          />
          <label htmlFor="floatingInput">Address</label>
        </div>
        <div className='container p-2 d-flex justify-content-center align-content-center'>
          <button className='btn btn-primary' onClick={handleEdit}>{text}</button>
        </div>
        </div>
        
      </div>
    </div>
  );
}