import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

import { ENV } from "./env.js";
import User from "../../modules/user/user.model.js";



const cookieExtractor = (req: any): string | null => {
  return req?.cookies?.accessToken ?? null;
};

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([
        cookieExtractor
      ]),
      secretOrKey: ENV.JWT_ACCESS_SECRET
    },

    async (payload, done) => {
      try {

        const user = await User
          .findById(payload.userId)
          .select("-password");

        if (!user) return done(null, false);

        return done(null, user);

      } catch (error) {
        return done(error, false);
      }
    }
  )
);

export default passport;
