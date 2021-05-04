
 const USER_DETAILS = JSON.parse(sessionStorage.getItem("user"));

 let ROLE = ""
 let LOCATIONID = ""
 let USERID = ""
 

if(sessionStorage.getItem("user")){
 
   ROLE = USER_DETAILS.ROLE;
   LOCATIONID = USER_DETAILS.LOCATION;
   USERID = USER_DETAILS.USERID;
  
}

const logout = () => {
  localStorage.removeItem("user");
};



export { ROLE, LOCATIONID, USERID, logout };



