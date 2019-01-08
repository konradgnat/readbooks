module.exports = {
  facebookAuth: {
    clientID: "240706906430140",
    clientSecret: "a9016350e448a9acf08754243ada04b5",
    callbackURL: "https://books-read.herokuapp.com/auth/facebook/callback",
    profileFields: ["emails"]
  },
  twitterAuth: {
    consumerKey: "pTevEj3yeEdbt0EXhTn807sh2",
    consumerSecret: "56QObWiNSoezheiXswvssG9tQxCgAPcii31YMvGhGDwP23J8eP",
    callbackURL: "https://books-read.herokuapp.com/auth/twitter/callback"
  },
  googleAuth: {
    clientID:
      "380330303351-249vf2rvmlrhftqfcttp8npui0no8m6p.apps.googleusercontent.com",
    clientSecret: "YnoXkCjbECpNwxsvkP-XuRG3",
    callbackURL: "https://books-read.herokuapp.com/auth/google/callback"
  }
};
