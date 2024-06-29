import { jwtDecode } from 'jwt-decode';

export const isLoggedIn = () => {
  let data = localStorage.getItem("loginUser");
  
  if (data) {
    const parsedData = JSON.parse(data);
    const token = parsedData.jwtToken;
    const useremail = parsedData.username;

    if (token && useremail) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; //convert  into seconds

      // Check if the token is expired
      if (decodedToken.exp < currentTime) {
        // Token is expired
        localStorage.removeItem("loginUser");
        return false;
      }

      // Token is not expired
      return useremail;
    }
  }

  return false;
};

//set to data into  localstorage
export const doLogin = (data,next) =>{
    localStorage.setItem("loginUser",JSON.stringify(data));
    //console.log(localStorage.getItem("loginUser"));
    next()
}

//remove from localstorage
export  const  doLogout = (next)=>{
    localStorage.removeItem("loginUser");
    next()
}

