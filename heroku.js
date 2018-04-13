process.env.DEBUG = "actions-on-google:*";
const App = require("actions-on-google").DialogflowApp;
const functions = require("firebase-functions");
const { getData, YESTERDAY } = require("./getData");

const express = require("express");
const webApp = express();

webApp.post("/", (request, response) => {
  // getData(YESTERDAY).then(data => res.send(JSON.stringify(data)));

  // a. the action name from the make_name Dialogflow intent
  const NAME_ACTION = "activity";
  // b. the parameters that are parsed from the make_name intent
  const DATE_ARGUMENT = "date";

  const app = new App({ request, response });
  console.log("Request headers: " + JSON.stringify(request.headers));
  console.log("Request body: " + JSON.stringify(request.body));

  // c. The function that generates the silly name
  function getInfo(app) {
    let date = app.getArgument(DATE_ARGUMENT);
    getData()
      .then(data => app.tell(`${date} Caterina ha mangiato ${data[0].text}`))
      .catch();
  }
  // d. build an action map, which maps intent names to functions
  let actionMap = new Map();
  actionMap.set(NAME_ACTION, getInfo);

  app.handleRequest(actionMap);
});

webApp.listen(process.env.PORT || 3000, () =>
  console.log(`Example app listening on port ${process.env.PORT || 3000}!`)
);
