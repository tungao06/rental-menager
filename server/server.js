const app = require("./app");
const logger = require("morgan");

app.use(logger("dev"));

// TODO : set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
