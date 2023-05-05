import React from 'react'
import Footer from '../Footer'
import Movies from '../Movies'
import Navbar from '../Navbar'
import Faq from '../Faq'
const MoviePage = () => {
  
  return (
   <> 
   <Navbar/>
    <section id="hero" className="d-flex align-items-center colorr">
          <div className="container" data-aos="zoom-out" data-aos-delay="100">
            <h1>Welcome To<span><br/> Movie Booking Website</span></h1>
            {/* <h2>Movie Booking Website</h2> */}
            <br/>
            <h3 className="about">
          The company is currently India’s largest entertainment ticketing platform. BookMyShow started out in 1999 as a software re-seller for movie theaters and converted into a platform catering to cloud-based ticket booking of events, movies, sports, and plays. BookMyShow was known by the name of its parent company, Bigtree Entertainment Pvt. Ltd., at the time of its inception.

It operates in 5+ countries with more than 30+ million customers. In sixteen years, BookMyShow has been through a roller-coaster ride, seeing all kinds of crests and troughs. From INR 25,000 in initial capital to INR 391 crores in revenue in FY2018, from the 'Dot Com' crash in the early 2000s to the global financial crisis of 2008, the company has a story at par with the David v/s Goliath legend. It managed to sail through tough times and emerged as a winner in the end.

          </h3>
          </div>
        </section>

      
   <Movies/>
   <Faq/>
   <Footer/>
   </>
     
  
  )
}

export default MoviePage
