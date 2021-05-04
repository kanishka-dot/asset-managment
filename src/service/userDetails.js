const USER_DETAILS = JSON.parse(sessionStorage.getItem("user"));

const ROLE = USER_DETAILS.ROLE;
const LOCATIONID = USER_DETAILS.LOCATION;
const USERID = USER_DETAILS.USERID;

const logout = () => {
  localStorage.removeItem("user");
};

export { ROLE, LOCATIONID, USERID, logout };
