import handlers from "./handlers";
import jwtValidate from "./jwt";
import ipLimiter from "./ipLimiter";

export default {
  ipLimiter,
  jwtValidate,
  ...handlers,
};
