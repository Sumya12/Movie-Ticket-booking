import axios from "axios";


const backend = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

backend.defaults.headers.common["authorization"] =
  "Bearer " + localStorage.getItem(process.env.REACT_APP_TOKEN_NAME) || null;

const getMovies = async () => await backend.get("/api/movie");
const Requests={
    getMovies
}
export default Requests;