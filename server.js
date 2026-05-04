require("dotenv").config();
const app = require("./src/app");
const PORT = process.env.SERVER_PORT || 6568;

app.listen(PORT, () => {
  console.log(` \u001b[1;32m Server is running on port ${PORT}. \u001b[0m`);
});

