import handlers from "./handlers";
import ipLimiter from "./ipLimiter";
import jwtValidate from "./jwt";

export default {
  ipLimiter,
  jwtValidate,
  ...handlers,
};
