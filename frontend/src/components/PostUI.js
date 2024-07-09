import React from 'react';
import "../css/post.css"
import arrow from "../images/down-arrow.png"
import { Link } from 'react-router-dom';
const PostUI=()=>{
    return(
        <>
        <div className='container mt-5 row justify-content-md-center align-items-md-center' style={{gap:"50px", marginLeft:"auto",marginRight:"auto"}}>
            <div className="card post col-md-auto">
                <center><img src="https://i.pinimg.com/736x/63/1d/2e/631d2e26bb82ad3cfce42df432fcede3.jpg" className="card-img-top" alt="..." style={{width:"150px",height:"150px"}}/></center>
                <div className="card-body body">
                    <center><span class="badge text-bg-info category">Travel</span>
                    <h5 className="card-title">Travel blog</h5>
                    <p className="card-text">Description</p>
                    <img src={arrow} className='img img-fluid' alt='readmore' width={"35px"} style={{cursor:"pointer"}}/>
                    </center>
                </div>
            </div>
            <div className="card post">
                <center><img src="https://i.pinimg.com/736x/63/1d/2e/631d2e26bb82ad3cfce42df432fcede3.jpg" className="card-img-top" alt="..." style={{width:"150px",height:"150px"}}/></center>
                <div className="card-body body">
                    <center><span class="badge text-bg-info category">Travel</span>
                    <h5 className="card-title">Travel blog</h5>
                    <p className="card-text">Description</p>
                    <img src={arrow} className='img img-fluid' alt='readmore' width={"35px"} style={{cursor:"pointer"}}/>
                    </center>
                </div>
            </div>
            <div className="card post">
                <center><img src="https://i.pinimg.com/736x/63/1d/2e/631d2e26bb82ad3cfce42df432fcede3.jpg" className="card-img-top" alt="..." style={{width:"150px",height:"150px"}}/></center>
                <div className="card-body body">
                    <center><span class="badge text-bg-info category">Travel</span>
                    <h5 className="card-title">Travel blog</h5>
                    <p className="card-text">Description</p>
                    <img src={arrow} className='img img-fluid' alt='readmore' width={"35px"} style={{cursor:"pointer"}}/>
                    </center>
                </div>
            </div>
            <div className="card post">
                <center><img src="https://i.pinimg.com/736x/63/1d/2e/631d2e26bb82ad3cfce42df432fcede3.jpg" className="card-img-top" alt="..." style={{width:"150px",height:"150px"}}/></center>
                <div className="card-body body">
                    <center><span class="badge text-bg-info category">Travel</span>
                    <h5 className="card-title">Travel blog</h5>
                    <p className="card-text">Description</p>
                    <img src={arrow} className='img img-fluid' alt='readmore' width={"35px"} style={{cursor:"pointer"}}/>
                    </center>
                </div>
            </div>
            <div className="card post">
                <center><img src="https://i.pinimg.com/736x/63/1d/2e/631d2e26bb82ad3cfce42df432fcede3.jpg" className="card-img-top" alt="..." style={{width:"150px",height:"150px"}}/></center>
                <div className="card-body body">
                    <center><span class="badge text-bg-info category">Travel</span>
                    <h5 className="card-title">Travel blog</h5>
                    <p className="card-text">Description</p>
                    <img src={arrow} className='img img-fluid' alt='readmore' width={"35px"} style={{cursor:"pointer"}}/>
                    </center>
                </div>
            </div>
            <div className="card post">
                <center><img src="https://i.pinimg.com/736x/63/1d/2e/631d2e26bb82ad3cfce42df432fcede3.jpg" className="card-img-top" alt="..." style={{width:"150px",height:"150px"}}/></center>
                <div className="card-body body">
                    <center><span class="badge text-bg-info category">Travel</span>
                    <h5 className="card-title">Travel blog</h5>
                    <p className="card-text">Description</p>
                    <img src={arrow} className='img img-fluid' alt='readmore' width={"35px"} style={{cursor:"pointer"}}/>
                    </center>
                </div>
            </div>
            <div className="card post">
                <center><img src="https://i.pinimg.com/736x/63/1d/2e/631d2e26bb82ad3cfce42df432fcede3.jpg" className="card-img-top" alt="..." style={{width:"150px",height:"150px"}}/></center>
                <div className="card-body body">
                    <center><span class="badge text-bg-info category">Travel</span>
                    <h5 className="card-title">Travel blog</h5>
                    <p className="card-text">Description</p>
                    <Link data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="read more about this post" data-bs-title="This top tooltip is themed via CSS variables."><img src={arrow} className='img img-fluid' alt='readmore' width={"35px"} style={{cursor:"pointer"}}/></Link>
                    </center>
                </div>
            </div>
        </div>
        </>
    )
}

export default PostUI