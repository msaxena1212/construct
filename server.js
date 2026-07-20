require("dotenv").config();
process.env.GOOGLE_MAPS_API_KEY = "AIzaSyApcHkSTsP3N-uw2qwHlg36To7XXBGQCF0";
const app = require("./src/app");
const PORT = process.env.SERVER_PORT || 6568;

app.listen(PORT, () => {
  console.log(` \u001b[1;32m Server is running on port ${PORT}. \u001b[0m`);
});

