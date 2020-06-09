const User = require("../models/User");

module.exports = async function (req, res, next) {
  try {
    const user = await User.findById(req.user.id).select(["role"]);
    if (user.role === "admin") {
      next();
    } else {
      res.status(403).json({
        message: "This route is restricted and can only performed by an admin",
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
