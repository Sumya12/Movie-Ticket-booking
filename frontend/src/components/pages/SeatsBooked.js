import React, { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
// import { useLocation } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";
import "../../cssfile/movies.css";
import Spinner from "../Spinner";
import Faq from "../Faq";
import NavbarOther from "../NavbarOther";
const SeatsBooked = () => {
  // const location = useLocation();
  // const {userId}= location.state;
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [seatBooked, setseatBooked] = useState([]);
  const [movies, setMovies] = useState([]);
  const fetchMovie = async () => {
    try {
      setLoading(true);
      const userInfo = await JSON.parse(localStorage.getItem("userInfo"));
      if (!userInfo) {
        toast({
          title: "No userinfo!",
          description: "No userinfo",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left",
        });
        return;
      }
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(`/api/user/${userInfo._id}`, config);

      setseatBooked(data.data.data.seatbooked);
      console.log(data.data.data.seatbooked);
      data.data.data.seatbooked.map(async (ele) => {
        if (ele.booked.length > 0) {
          const movieData = await axios.get(
            `/api/movie/${ele.movieId}`,
            config
          );

          let obj = {
            moviename: movieData.data.data.data.moviename,
            movietprice: movieData.data.data.data.movietprice,
            movietime: movieData.data.data.data.movietime,
            moviedescription: movieData.data.data.data.moviedescription,
            moviepic: movieData.data.data.data.moviepic,
            movieId: movieData.data.data.data._id,
          };
          setMovies((old) => [...old, obj]);
        }
      });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast({
        title: "Error Occured!",
        description: "Failed to load the search results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      console.log("Seat booked" + err.message);
      return;
    }
  };
  useEffect(() => {
    fetchMovie();
  }, []);

  if (loading) {
    return <Spinner />;
  }
  return (
    <>
      <NavbarOther/>
      <div>
        <div className="mainn">
          <div className="recipes">
            {movies.map((movie) => {
              return (
                <>
                  <div className="recipe" key={movie?.movieId}>
                    <img className="imgg" src={movie.moviepic} alt="Logo" />
                    <hr />
                    <div className="preedit">
                      <span className="postedit">MovieName : </span>{" "}
                      {movie?.moviename}{" "}
                    </div>
                    <div className="preedit">
                      <span className="postedit">Movie Ticket Price : </span>
                      {movie?.movietprice}{" "}
                    </div>
                    <div className="preedit">
                      <span className="postedit">Movie Time : </span>
                      {movie?.movietime}
                    </div>
                    {/* <div className="preedit"><span className="postedit">Movie Description : </span>{movie?.moviedescription}</div> */}

                    {seatBooked.map((seat) => {
                      if (seat.movieId === movie.movieId) {
                        return (
                          <>
                            <span className="postedit">
                              {" "}
                              ------------Seats Booked------------{" "}
                              <div className="preedit">
                                {seat.booked.map((ele) => {
                                  return <> {ele}</>;
                                })}
                              </div>
                            </span>
                            <span className="postedit">
                              ------------------------------------------
                            </span>
                            <div className="preedit">
                              <span className="postedit">Total Price : </span>
                              {seat.booked.length * parseInt(movie.movietprice)}
                            </div>
                          </>
                        );
                      }
                    })}
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
      <Faq />
      <Footer />
    </>
  );
};

export default SeatsBooked;
