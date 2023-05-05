import React from 'react';
import { useHistory } from 'react-router-dom';
export default function NavbarOther() {

  const history = useHistory();

  const handleLogout=()=>{
    localStorage.removeItem("userInfo");
    history.push("/");
  }
  return (
    <>
       <nav className="navbar-pos navbar navbar-expand-lg navbar-dark navbar-pos">
        <div className="container-fluid">
        <h1 className="logo">
          
          Movie Booking Website<span></span>
         
        </h1>
        
          {/* <a className="navbar-brand main-text" href="#">Movie Booking Website</a> */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav m-auto">
        <li className="nav-item active navli">
          <a className="nav-link" href="/movies">Home <span className="sr-only">(current)</span></a>
        </li>
        <li className="nav-item  active navli">
          <a className="nav-link" href="/profile">Profile</a>
        </li>
        <li className="nav-item  active navli">
          <a className="nav-link" href="/booked">MoviesBooked</a>
        </li>
        <li className="nav-item  active navli">
          <a className="nav-link" href="" onClick={handleLogout}>Logout</a>
        </li>
      </ul>

          </div>
        </div>
      </nav>
    </>
  );
}
