import passport from "passport";
import { googleStrategy } from "./strategies/googleStrategy.ts";

passport.use("google", googleStrategy);

export { passport };
