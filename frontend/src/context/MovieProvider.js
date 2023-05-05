// import {createContext,useContext,useState,useEffect} from "react";
// import { useHistory } from "react-router-dom";

// const MovieContext = createContext();
// const MovieProvider = ({children})=>{

//     const [user,setUser] = useState();
//     // const [movie,setMovie] = useState([]);
//     let history = useHistory();
//     useEffect(()=>{
//         const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//         setUser(userInfo);
//         //if user is not logged in
//         console.log("userinfo"+userInfo); 
//         console.log("user"+user); 
//         if(!userInfo){
//             history.push("/");
//         }
//     },[history]);
//     return(
//         <MovieContext.Provider value={{user,setUser}}>
//             {children} 
//         </MovieContext.Provider>
//     )
// };
// export const MovieState=()=>{
//     return useContext(MovieContext);
// }

// export default MovieProvider;