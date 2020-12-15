const authentication = {
  isauthenticated: false,

  onAuthentication() {
    this.isauthenticated = true;
  },

  getAuthenticationStatus() {
    return this.isauthenticated;
  },
};

export default authentication;
