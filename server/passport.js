import GoogleStrategy from "passport-google-oauth20";
import passport from "passport";
import dotenv from "dotenv";
dotenv.config();
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/google/callback",
      scope: ["profile", "email"],
    },
    (accessToken, refreshToken, profile, callback) => {
      console.log("passport callback function fired");
      console.log(profile);
      callback(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  console.log("serializing user");
  done(null, user);
});

passport.deserializeUser((user, done) => {
  console.log("deserializing user");
  done(null, user);
});

export default passport;
