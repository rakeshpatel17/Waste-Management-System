import React from 'react'
import telegram from "../images/telegram.png"
import location from "../images/location.png"
import call from "../images/call.png"
export default function Contactus() {
  return (
    <>
    <div className='container p-5 d-flex m-5' >
        <div className='container p-4'style={{backgroundColor:"#edf6e3",borderRadius:"10px",border:"0.1px solid #edf6e3"}}>
            <h3>Contact Us</h3>
            <form className='p-2' >
                    <div className='form-group'>
                        <label for='name'>Name</label>
                        <input type='text' className='form-control' id='name' placeholder='Enter name' style={{width:"100%"}} />
                    </div>
                    <div className='form-group'>
                        <label for='email'>Email</label>
                        <input type='email' className='form-control' id='email' placeholder='Enter email' style={{width:"100%"}} />
                    </div>
                    <div className='form-group'>
                        <label for='message'>Message</label>
                        <textarea className='form-control' id='message' rows='3' style={{width:"100%"}}></textarea>
                    </div>
                    <button type='submit' className='btn' style={{backgroundColor:'#abd676'}}>Send Message</button>

                    </form>
        </div>
        <div className='container-fluid'>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243647.34241144217!2d78.24288937077264!3d17.41228073359254!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaebd2c7%3A0xae93b78392bafbc2!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1719638898774!5m2!1sen!2sin" style={{width:"100%",height:"100%",border:"0"}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
        
    </div>
    <div className='container'>
            <div className='container d-flex justify-content-evenly'>
                <figure class="figure">
                    <img src={location} class="figure-img img-fluid rounded" alt="Location" style={{width:"25px",height:"25px"}}/>
                    <figcaption class="figure-caption">
                    <address>
                            Box 564, Himayatnagar<br/>
                            Hyderabad
                    </address>
                    </figcaption>
                </figure>
                <figure class="figure">
                    <img src={call} class="figure-img img-fluid rounded" alt="callme" style={{width:"25px",height:"25px"}}/>
                    <figcaption class="figure-caption">+91 1234567890</figcaption>
                </figure>
                <figure class="figure">
                    <img src={telegram} class="figure-img img-fluid rounded" alt="emailme" style={{width:"25px",height:"25px"}}/>
                    <figcaption class="figure-caption">contact@wastewise.com</figcaption>
                </figure>
            </div>
    </div>
    </>
  )
}
