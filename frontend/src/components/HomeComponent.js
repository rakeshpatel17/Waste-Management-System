import React, { useState } from 'react';
import "../css/song.css";

export default function HomeComponent() {
  const arr = [
    { song: "abcefe", artist: "abc" },
    { song: "bewrwdas", artist: "qwe" },
    { song: "cdsadq3was", artist: "asd" },
    { song: "ddasdqe", artist: "a3erfbc" },
  ];
  const [filterSong, setFilterSong] = useState('');
  
  const handleChange = (e) => {
    setFilterSong(e.target.value);
  };

  return (
    <>
      <div className='container mt-5'>
        <form className="form-inline my-2 my-lg-1" style={{ position: 'relative' }}>
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search for something"
            aria-label="Search"
            style={{
              width: '100%',
              padding: '10px 20px',
              borderRadius: '25px',
              border: '1px solid #ccc',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              color: 'black'
            }}
            onChange={handleChange}
          />
          <button type="submit" style={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            cursor: 'pointer'
          }}>
            <img src="https://cdn-icons-png.flaticon.com/128/11741/11741045.png" alt="Search" style={{ width: '20px', height: '20px' }} />
          </button>
        </form>
        <h3 className='mt-3' style={{color:"white"}}>Recently Played</h3>
        {
          arr.filter((song) => song.song.toLowerCase().includes(filterSong.toLowerCase())).map((song, index) => (
            <div key={index} className='container d-flex justify-content-between align-items-center p-2 mt-4' style={{backgroundColor:"#686D76", width:"auto",borderRadius:"3px",color:"white",fontWeight:"bolder"}}>
              <p>{index + 1}</p>
              <img 
                src='https://img.etimg.com/thumb/width-1600,height-900,imgsize-81174,resizemode-75,msid-103656314/magazines/panache/chaleya-from-jawan-hits-a-sweet-note-on-spotify-india-clocks-2-4-mn-streams-to-become-most-played-song-in-a-single-day-on-music-platform.jpg' 
                alt='Album Art' 
                width={"50px"} 
                height={"50px"} 
                style={{borderRadius: "10%"}}
              />
              <div className='d-flex flex-column' style={{marginLeft: "10px"}}>
                <p style={{margin: "0",color:"white"}}>{song.song}</p>
                <p style={{margin: "0",color:"white",fontWeight:"lighter" }}><small>{song.artist}</small></p>
              </div>
              <p>Jawaan</p>
              <p>04:32</p>
              <img src='https://cdn-icons-png.flaticon.com/128/1077/1077035.png' alt='like' width={"20px"} height={'20px'} />
            </div>
          ))
        }
      </div>
    </>
  );
}
