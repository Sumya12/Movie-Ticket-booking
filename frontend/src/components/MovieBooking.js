import "../cssfile/moviebooking.css";
import React, { useState, useEffect } from "react";
import clsx from "clsx";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import Spinner from "./Spinner";

const seats = Array.from({ length: 8 * 8 }, (_, i) => i + 1);

export default function MovieBooking({ movieId, movies }) {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [moviename, setMoviename] = useState();
  const [userId, setuserId] = useState();
  const [moviepic, setMoviepic] = useState();
  const [movietprice, setMovietprice] = useState();
  const [movietime, setMovietime] = useState();
  const [seatBooking, setseatBooking] = useState([]);
  const history = useHistory();

  const fetchMovie = async () => {
    try {
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
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(`/api/movie/${movieId}`, config);
      setuserId(userInfo._id);
      setLoading(false);
      setMoviename(data.data.data.moviename);
      setMoviepic(data.data.data.moviepic);
      setMovietprice(data.data.data.movietprice);
      setMovietime(data.data.data.movietime);
      setseatBooking(data.data.data.seatBooked);
    } catch (err) {
      toast({
        title: "Error Occured!",
        description: "Failed to load the search results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      console.log("movie provider" + err.message);
      return;
    }
  };

  const handleBookSeats = async () => {
    let seatNumber = selectedSeats;
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.put(
        "/api/movie/book",
        { userId, movieId, seatNumber },
        config
      );
      toast({
        title: "Seat Booked and Mail sent successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      setLoading(false);
      history.push("/booked");
    } catch (err) {
      toast({
        title: "Error occured",
        status: "warning",
        description: err.response.data.message,
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      console.log(err.message);
      setLoading(false);
    }
  };

  const handleOpenRazorpay = async (data) => {
    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const options = {
        key: process.env.KEY_ID,
        amount: Number(data.amount),
        currency: data.currency,
        name: "Movie booking Website",
        description: "XYZ",
        order_id: data.id,
        handler: function (response) {
        
          axios
            .post("/api/movie/verify", { response: response }, config)
            .then((res) => {
              setLoading(true);
              handleBookSeats();
              setLoading(false);
            })
            .catch((err) => {
              console.log(err);
              setLoading(false);
            });
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      toast({
        title: "Error occured",
        status: "warning",
        description: err.response.data.message,
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      console.log(err.message);
      setLoading(false);
    }
  };
  const handlePayment = async (amount) => {
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/movie/payment",
        { amount },
        config
      );
      handleOpenRazorpay(data.data);
      setLoading(false);
     
    } catch (err) {
      toast({
        title: "Error occured",
        status: "warning",
        description: err.response.data.message,
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      console.log(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovie();
  }, []);
  const [selectedMovie, setSelectedMovie] = useState(movies[0]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  if (loading) {
    return <Spinner />;
  }
  return (
    <>
      <div>
        <div className="App11">
          <div className="mainnn">
            <div className="recipess">
              <div className="recipe">
                <img className="imgg" src={moviepic} alt="Logo" />
                <hr />
                <div className="preedit">
                  <span className="postedit">MovieName : </span> {moviename}{" "}
                </div>
                <div className="preedit">
                  <span className="postedit">Movie Ticket Price : </span>
                  {movietprice}{" "}
                </div>
                <div className="preedit">
                  <span className="postedit">Movie Time : </span>
                  {movietime}
                </div>
              </div>
            </div>
          </div>

          <ShowCase />
          <Cinema
            movie={selectedMovie}
            selectedSeats={selectedSeats}
            onSelectedSeatsChange={(selectedSeats) =>
              setSelectedSeats(selectedSeats)
            }
          />
          {selectedSeats.length > 0 && (
            <button
              className="btn btn-success"
              onClick={() =>
                handlePayment(selectedSeats.length * parseInt(movietprice))
              }
            >
              Confirm Booking and Pay money
            </button>
          )}
          {selectedSeats.length === 0 && (
            <button className="btn btn-success" disabled>
              Confirm Booking and Pay money
            </button>
          )}
        </div>
      </div>
    </>
  );
}

function ShowCase() {
  return (
    <ul className="ShowCase">
      <li>
        <span className="seat" /> <small>N/A</small>
      </li>
      <li>
        <span className="seat selected" /> <small>Selected</small>
      </li>
      <li>
        <span className="seat occupied" /> <small>Occupied</small>
      </li>
    </ul>
  );
}

function Cinema({ movie, selectedSeats, onSelectedSeatsChange }) {
  function handleSelectedState(seat) {
    const isSelected = selectedSeats.includes(seat);
    if (isSelected) {
      onSelectedSeatsChange(
        selectedSeats.filter((selectedSeat) => selectedSeat !== seat)
      );
    } else {
      onSelectedSeatsChange([...selectedSeats, seat]);
    }
  }

  return (
    <div className="Cinema">
      <div className="screen" />

      <div className="seats">
        {seats.map((seat) => {
          const isSelected = selectedSeats.includes(seat);
          const isOccupied = movie.occupied.includes(seat);
          return (
            <>
              <span
                tabIndex="0"
                key={seat}
                className={clsx(
                  "seat",
                  isSelected && "selected",
                  isOccupied && "occupied"
                )}
                onClick={isOccupied ? null : () => handleSelectedState(seat)}
                onKeyPress={
                  isOccupied
                    ? null
                    : (e) => {
                        if (e.key === "Enter") {
                          handleSelectedState(seat);
                        }
                      }
                }
              />
            </>
          );
        })}
      </div>
    </div>
  );
}
