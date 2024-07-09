import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Loading from './Loading';

export default function Dashboard({ isLoggedIn, scheduled, complaint, userData, pending }) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        }
    }, [isLoggedIn]);

    const [greet, setGreeting] = useState(false);
    

    

    useEffect(() => {
        if (isLoggedIn) {
            setGreeting(true);
            const time = setTimeout(() => {
                setGreeting(false);
            }, 2000);
            return () => clearTimeout(time);
        }
    }, [isLoggedIn]);

    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        setTimeout(()=>{
          setLoading(false)
        },500)
      },[])
    
    if(loading){
    return <Loading/>
    }

    if (!isLoggedIn) {
        return null;
    }

    
    
    return (
        <div className='dash ' style={{"minHeight": "100vh"}} >
            {isLoggedIn && greet &&
                <div className="alert alert-success text-center" role="alert">
                    Welcome {userData.username}
                </div>
            }

            <div className='container p-5 '>
                <div className='container d-flex justify-content-center' style={{ gap: '1rem' }}>
                    <div className='card mb-5 bg-body-tertiary rounded' style={{width: "18rem" }}>
                        <div className='card-body p-4'>
                            <h5 className='card-title'>Total Lodged Complain</h5>
                            <p className='card-text my-2'>{complaint}</p>
                            <Link to="/displayissues">View Details</Link>
                        </div>
                    </div>
                    <div className='card mb-5 bg-body-tertiary rounded' style={{ width: "18rem" }}>
                        <div className='card-body p-4'>
                            <h5 className='card-title'>Pending Lodged Complain</h5>
                            <p className='card-text my-2'>{pending}</p>
                        </div>
                    </div>
                    <div className='card mb-5 bg-body-tertiary rounded' style={{width: "18rem" }}>
                        <div className='card-body p-4' >
                            <h5 className='card-title'>Total Waste Scheduled</h5>
                            <p className='card-text'>{scheduled}</p>
                            <Link to="/getWaste">View Details</Link>
                        </div>
                    </div>
                    <div className='card mb-5 bg-body-tertiary rounded' style={{ width: "18rem",display:"none" }}>
                        <div className='card-body p-4'>
                            <h5 className='card-title'>Scheduled Waste Completed</h5>
                            <p className='card-text'>0</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='container d-flex justify-content-center align-content-center' style={{ gap: "1rem" }}>
                <Link to="/schedulewaste"><button className='btn btn-primary'>Schedule Waste</button></Link>
            </div>
        </div>
    );
}
