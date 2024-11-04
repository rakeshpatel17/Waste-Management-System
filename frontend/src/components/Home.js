import React from 'react';
import '../css/home.css';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import waste_disposal from '../images/waste_disposal.jpg';
import waste_treatement from '../images/waste_treatement.jpg';
import waste_recycling from '../images/waste_recycling.jpeg';
import waste_transport from '../images/waste_transport.jpg';
import e_waste from '../images/e_waste.jpeg';
import food_waste from '../images/food_waste.jpeg';
import glass_waste from '../images/glass_waste.jpeg';
import medical_waste from '../images/medical_waste.jpeg';
import metallic_waste from '../images/metallic_waste.jpg';
import plastic_waste from '../images/plastic_waste.jpg';

export default function Home({ isLoggedIn }) {
  return (
    <div>
      <main>
        <motion.section 
          className="hero"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1>Welcome to WasteWise</h1>
          <p>Revolutionizing Waste Management for Cleaner Communities</p>
          {!isLoggedIn && <Link to="/signup" className="btn">Get Started</Link>}
        </motion.section>

        <section id="features" className="features">
          <h2>Features</h2>
          <div className="feature-container">
            {["User Authentication", "Waste Collection Scheduling", "Real-Time Tracking", "Issue Reporting"].map((feature, index) => (
              <motion.div
                key={feature}
                className="feature-item"
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.3 }}
              >
                <h3>{feature}</h3>
                <p>{`Description for ${feature}`}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="services" className="services">
          <h3 className='fw-medium'>Our Waste Handling Practices</h3>
          <div className='container d-flex' style={{ gap: "10px" }}>
            {[{ img: waste_disposal, title: "Waste Disposal" }, 
              { img: waste_treatement, title: "Waste Treatment" }, 
              { img: waste_recycling, title: "Waste Recycling" }, 
              { img: waste_transport, title: "Waste Collection and Transportation" }]
              .map(({ img, title }, index) => (
                <motion.div 
                  key={title}
                  className="card"
                  style={{ width: "18rem" }}
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <img src={img} className="card-img-top" alt={title} width={"250px"} height={"200px"} />
                  <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">Description for {title}.</p>
                  </div>
                </motion.div>
            ))}
          </div>
          <Link to={isLoggedIn ? "/schedulewaste" : "/login"}>
            <motion.button
              className='btn btn-primary my-3'
              whileHover={{ scale: 1.1 }}
            >
              Schedule
            </motion.button>
          </Link>
        </section>

        <section id="treatement" className="treatement">
          <h2>We Treat</h2>
          <div className='container d-flex' style={{ gap: "10px" }}>
            {[{ img: e_waste, title: "E Waste" }, 
              { img: food_waste, title: "Food Waste" }, 
              { img: glass_waste, title: "Glass Waste" }, 
              { img: medical_waste, title: "Medical Waste" }, 
              { img: metallic_waste, title: "Metallic Waste" }, 
              { img: plastic_waste, title: "Plastic Waste" }]
              .map(({ img, title }, index) => (
                <motion.figure
                  key={title}
                  className="figure fig"
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <img src={img} className="figure-img img-fluid rounded" alt={title} width={"250px"} height={"200px"} />
                  <figcaption className="figure-caption">{title}</figcaption>
                </motion.figure>
            ))}
          </div>
        </section>

        <motion.section 
          id="about" 
          className="about"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2>About WasteWise</h2>
          <p>Efficient waste management is essential for maintaining clean and sustainable urban and rural environments...</p>
        </motion.section>

        <section id='contact'>
          Any Queries? <Link to="/contactus">Contact Us</Link>
        </section>
      </main>
    </div>
  );
}
