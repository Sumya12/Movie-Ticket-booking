import React from 'react'
import "../cssfile/movies.css"
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import { useToast } from '@chakra-ui/react';
import { Link } from "react-router-dom";               
import Spinner from './Spinner';

const Movies = () => {
  const [movieData, setMovieData] = useState([]);
  const [loading,setLoading] = useState(false);
  const toast = useToast();
  const fetchMovie=async()=>{
    try{
      setLoading(true);
      const userInfo = await JSON.parse(localStorage.getItem("userInfo"));
      if(!userInfo){
        toast({
          title: 'No userinfo!',
          description:"No userinfo",
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: "bottom-left",
        });
        return;
      }
      // console.log(userInfo);
      // console.log(userInfo.token);
      
      const config={
        headers:{
          Authorization:`Bearer ${userInfo.token}`,
        },
      };
      const {data} = await axios.get("/api/movie",config);
     
      setMovieData(data.data);
      setLoading(false);
  }catch(err){
    setLoading(false);
    toast({
      title: 'Error Occured!',
      description:"Failed to load the search results",
      status: 'error',
      duration: 5000,
      isClosable: true,
      position: "bottom-left",
    });
    console.log("movie provider" + err.message);
    return;
  }
  }
 

    useEffect(() => {
       fetchMovie();
      }, []);
    

    const movieInfo = movieData.map((movie)=>(
      <div className="recipe" key={movie?._id}>  
      <img className='imgg' src={movie.moviepic} alt="Logo" />
      <hr/>
      <div className="preedit"><span className="postedit">MovieName : </span> {movie.moviename} </div>
      <div className="preedit"><span className="postedit">Movie Ticket Price : </span>{movie.movietprice} </div>
      <div className="preedit"><span className="postedit">Movie Time : </span>{movie.movietime}</div>
      <div className="preedit"><span className="postedit">Movie Description : </span>{movie?.moviedescription}</div>

     
    <Link className='btn-danger btn buttoncustom' to={{pathname: "/seat",state: { movieid: movie._id,movieData:movieData }, }}>Book tickets</Link>
   
    </div>

  

    ))

    if (loading) {
      return <Spinner/>
    }
  return (
    <>
   <div>
      <div className="mainn">
     <div className="recipes">
          {movieInfo}
        </div>
      </div>
   
      
  </div>
   </>
  )
}

export default Movies
