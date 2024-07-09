import React from 'react'
import '../css/home.css'
import { Link } from 'react-router-dom'
import waste_disposal from '../images/waste_disposal.jpg'
import waste_treatement from '../images/waste_treatement.jpg'
import waste_recycling from '../images/waste_recycling.jpeg'
import waste_transport from '../images/waste_transport.jpg'
import e_waste from '../images/e_waste.jpeg'
import food_waste from '../images/food_waste.jpeg'
import glass_waste from '../images/glass_waste.jpeg'
import medical_waste from '../images/medical_waste.jpeg'
import metallic_waste from '../images/metallic_waste.jpg'
import plastic_waste from '../images/plastic_waste.jpg'

export default function Home({isLoggedIn, userData}) {
  return (
    <div>
      <main>
        <section className="hero">
          <h1>Welcome to WasteWise</h1>
          <p>Revolutionizing Waste Management for Cleaner Communities</p>
          {!isLoggedIn && <Link to="/signup" className="btn">Get Started</Link>}
        </section>
        <section id="features" className="features">
          <h2>Features</h2>
          <div className="feature-item">
            <h3>User Authentication</h3>
            <p>Secure login and registration for all users.</p>
          </div>
          <div className="feature-item">
            <h3>Waste Collection Scheduling</h3>
            <p>Easy scheduling of waste pickups at your convenience.</p>
          </div>
          <div className="feature-item">
            <h3>Real-Time Tracking</h3>
            <p>Track the status of your waste collection requests in real-time.</p>
          </div>
          <div className="feature-item">
            <h3>Issue Reporting</h3>
            <p>Report any issues related to waste management effortlessly.</p>
          </div>
        </section>
        <section id="services" className="services">
          <h3 className='fw-medium'>Our Waste Handling Practices</h3>
          <div className='container d-flex' style={{gap:"10px"}}>
            <div className="card" style={{width: "18rem;"}}>
              <img src={waste_disposal} className="card-img-top" alt="Waste Disposal" width={"250px"} height={"200px"}/>
              <div className="card-body">
                <h5 className="card-title">Waste Disposal</h5>
                <p className="card-text">several large waste bins or dumpsters, commonly used for waste disposal in a waste management system.</p>
              </div>
            </div>
            <div className="card" style={{width: "18rem;"}}>
              <img src={waste_treatement} className="card-img-top" alt="Waste Treatement" width={"250px"} height={"200px"}/>
              <div className="card-body">
                <h5 className="card-title">Waste Treatement</h5>
                <p className="card-text"> Aerial view of a wastewater treatment facility which has several large, circular tanks used for various stages of sewage treatment</p>
              </div>
            </div>
            <div className="card" style={{width: "18rem;"}}>
              <img src={waste_recycling} className="card-img-top" alt="Waste Recycling" width={"250px"} height={"200px"}/>
              <div className="card-body">
                <h5 className="card-title">Waste Recycling</h5>
                <p className="card-text">Multiple conveyor belts and machinery designed to sort and process various types of waste materials.</p>
              </div>
            </div>
            <div className="card" style={{width: "18rem;"}}>
              <img src={waste_transport} className="card-img-top" alt="Waste Collection and Transportation" width={"250px"} height={"200px"}/>
              <div className="card-body">
                <h5 className="card-title">Waste Collection and Transportation</h5>
                <p className="card-text">
                Waste collection and transportation involve the systematic gathering of waste from various sources and its transfer to disposal or processing facilities.</p>
              </div>
            </div>
          </div>
          {
            isLoggedIn ? 
              <Link to="/schedulewaste"><button className='btn btn-primary my-3'>Schedule</button></Link> : 
              <Link to="/login"><button className='btn btn-primary my-3'>Schedule</button></Link>
          }
        </section>
        <section id="treatement" className="treatement">
          <h2>We Treat</h2>
          <div className='container d-flex' style={{gap:"10px"}}>
            <figure className="figure fig">
              <img src={e_waste} className="figure-img img-fluid rounded" alt="E Waste" width={"250px"} height={"200px"}/>
              <figcaption className="figure-caption">E Waste</figcaption>
            </figure>
            <figure className="figure fig">
              <img src={food_waste} className="figure-img img-fluid rounded" alt="Food Waste" width={"250px"} height={"200px"}/>
              <figcaption className="figure-caption">Food Waste</figcaption>
            </figure>
            <figure className="figure fig">
              <img src={glass_waste} className="figure-img img-fluid rounded" alt="Glass Waste" width={"250px"} height={"200px"}/>
              <figcaption className="figure-caption">Glass Waste</figcaption>
            </figure>
            <figure className="figure fig">
              <img src={medical_waste} className="figure-img img-fluid rounded" alt="Medical Waste" width={"250px"} height={"200px"}/>
              <figcaption className="figure-caption">Medical Waste</figcaption>
            </figure>
            <figure className="figure fig">
              <img src={metallic_waste} className="figure-img img-fluid rounded" alt="Metallic Waste" width={"250px"} height={"200px"}/>
              <figcaption className="figure-caption">Metallic Waste</figcaption>
            </figure>
            <figure className="figure fig">
              <img src={plastic_waste} className="figure-img img-fluid rounded" alt="Plastic Waste" width={"250px"} height={"200px"}/>
              <figcaption className="figure-caption">Plastic Waste</figcaption>
            </figure>
          </div>
        </section>
        <section id="about" className="about">
          <h2>About WasteWise</h2>
          <p>Efficient waste management is essential for maintaining clean and sustainable urban and rural environments. WasteWise addresses the challenges of traditional waste management systems by providing a transparent and user-friendly platform for scheduling waste collection, tracking progress, and reporting issues.</p>
        </section>
        <section id='contact'>
            Any Queries? <Link to="/contactus"> Contact Us</Link>
        </section>
      </main>
    </div>
  )
}
