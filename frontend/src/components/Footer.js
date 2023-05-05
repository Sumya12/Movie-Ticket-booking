import React from "react";
import { useHistory } from 'react-router-dom';
export default function Footer() {
  const history = useHistory();
  const handleLogout=()=>{
    localStorage.removeItem("userInfo");
    history.push("/");
  }
  return (
    <>
      <footer id="footer" className="footertop text-center text-lg-start text-white footer-pos" style={{backgroundColor: '#1c2331'}}>
        <section className="d-flex justify-content-between p-4 bg-primary" >
          <div className="me-5">
            <span>Get connected with us on social networks:</span>
          </div>
          <div>
            <a href className="text-white me-4">
              <i className="fa fa-facebook-f" />
            </a>
            <a href className="text-white me-4">
              <i className="fa fa-twitter" />
            </a>
            <a href className="text-white me-4">
              <i className="fa fa-instagram" />
            </a>
            <a href className="text-white me-4">
              <i className="fa fa-linkedin" />
            </a>
            <a href className="text-white me-4">
              <i className="fa fa-github" />
            </a>
          </div>
        </section>
        <section className>
          <div className="container text-center text-md-start">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold">Movie Booking Website</h6>
                <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{width: '60px', backgroundColor: '#7c4dff', height: '2px'}} />
                <p>
                The company is currently India’s largest entertainment ticketing platform. BookMyShow started out in 1999 as a software re-seller for movie theaters and converted into a platform catering to cloud-based ticket booking of events, movies, sports, and plays. BookMyShow was known by the name of its parent company, Bigtree Entertainment Pvt. Ltd., at the time of its inception.


                </p>
              </div>
              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto">
                {/* Links */}
                <h6 className="text-uppercase fw-bold">Links</h6>
                <hr className=" mb-4 mt-0 d-inline-block mx-auto" style={{width: '60px', backgroundColor: '#7c4dff', height: '2px'}} />
                <p className="p-2 footertext">
                  <a href="/" className="text-white">Home</a>
                </p>
                <p className="p-2 footertext">
                  <a href="/#hero" className="text-white">About Us</a>
                </p>
  
                <p className="p-2 footertext">
                  <a href="/#faq" className="text-white">FAQs</a>
                </p>

                <p className="p-2 footertext">
                  <a href="/contact" className="text-white">Contact Us</a>
                </p>
              
              </div>
              {/* Grid column */}
              {/* Grid column */}
              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto">
                {/* Links */}
                <h6 className="text-uppercase fw-bold">Useful links</h6>
                <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{width: '60px', backgroundColor: '#7c4dff', height: '2px'}} />
                <p className="p-2 footertext">
                  <a href="/profile" className="text-white">Your Profile</a>
                </p>
                <p className="p-2 footertext">
                  <a href="/" className="text-white">Login</a>
                </p>
                <p className="p-2 footertext">
                  <a href="/" className="text-white">Sign Up</a>
                </p>
                <p className="p-2 footertext">
                  <a href="" className="text-white" onClick={handleLogout}>Logout</a>
                </p>
              </div>
              {/* Grid column */}
              {/* Grid column */}
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0">
                {/* Links */}
                <h6 className="text-uppercase fw-bold">Contact Us</h6>
                <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{width: '60px', backgroundColor: '#7c4dff', height: '2px'}} />
                <p className="p-2"><i className="fa fa-home mr-3" />&nbsp; Hadapsar , Pune</p>
                <p className="p-2">
                  <i className="fa fa-envelope mr-3" />&nbsp;
                  moviebooking.com
                </p>
                <p className="p-2"><i className="fa fa-phone mr-3" /> &nbsp;+ 01 234 567 88</p>
                <p className="p-2"><i className="fa fa-print mr-3" /> &nbsp;+ 01 234 567 89</p>
              </div>
              {/* Grid column */}
            </div>
            {/* Grid row */}
          </div>
        </section>
        {/* Section: Links  */}
        {/* Copyright */}
        <div className="text-center" style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
          © 2023 Copyright:
          <a className="text-white" href="https://mdbootstrap.com/">moviebooking@gmail.com</a>
        </div>
        {/* Copyright */}
      </footer>

    </>
  );
}
