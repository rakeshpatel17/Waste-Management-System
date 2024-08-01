import React, { useEffect, useState } from 'react';
import { Link} from 'react-router-dom';
import logo_1 from "../images/logo_1.png"
export default function Navbar({ isLoggedIn ,userData}) {
  const [greet,setGreeting] = useState(false)
  useEffect(()=>{
    if(isLoggedIn){
      setGreeting(true)
      const time = setTimeout(()=>{
        setGreeting(false);
      },2000)
      return ()=>clearTimeout(time)
    }
  },[isLoggedIn])
  return (
<>    
    <div style={{backgroundColor:"#D6EFD8"}}>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/"><img className='img img-fluid' src={logo_1} width={"100vw"} alt='logo'></img>Waste Wise</Link>
          {isLoggedIn ? (
                <>
                  <Link className="nav-link active" aria-current="page" to="/dashboard">Dashboard</Link>
                </>
              ) : null
          }

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse d-flex flex-row-reverse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              {isLoggedIn ? (
                <>
                  <Link className="nav-link active" aria-current="page" to="/profile">Profile</Link>
                  <Link className="nav-link" to="/logout">Logout</Link>
                  <Link className='m-2' to="/notification">
                    <img src='https://cdn-icons-png.flaticon.com/128/2529/2529521.png' alt='notification' width={"15%"}></img> 
                  </Link> 
                  
                </>
              ) : (
                <>
                  <Link className="nav-link active" aria-current="page" to="/login">Login</Link>
                  <Link className="nav-link" to="/signup">Sign up</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>

</>
  );
}



