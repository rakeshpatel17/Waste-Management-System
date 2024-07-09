import React from 'react'
import loading from "../images/loading_gif.gif"
import "../css/loading.css"
export default function Loading() {
  return (
    <div className='loading-container'>
      <img src={loading} alt='loading' className='loading-image'/>
    </div>
  )
}