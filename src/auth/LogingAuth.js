const authentication = {
  isauthenticated: false,

  voidAuthentication() {
    this.isauthenticated = false;
  },

  onAuthentication() {
    this.isauthenticated = true;
  },

  getAuthenticationStatus() {
    return this.isauthenticated;
  },
};

export default authentication;
