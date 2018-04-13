const express = require("express");
const { getData } = require("./getData");

const app = express();
app.get("/", (req, res) => {
  getData()
    .then(data => {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(data));
      return;
    })
    .catch();
});

app.listen(process.env.PORT || 3000, () =>
  console.log(`Example app listening on port ${process.env.PORT || 3000}!`)
);
