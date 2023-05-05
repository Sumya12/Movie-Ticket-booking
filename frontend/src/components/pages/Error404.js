import React from 'react'
import { Link } from 'react-router-dom'

export default function Error404() {
  return (
    <>
    <div id="mainerror">
        <div className="fof">
          <h1>Error 404</h1>
          <h3 class="fadeIn">PAGE NOT FOUND</h3>
          <Link to="/"><button className='errorbutton' type="button" name="button">Return To Home</button></Link>
    
        </div>
      </div>
    </>
  )
}
