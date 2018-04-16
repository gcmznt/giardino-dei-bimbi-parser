"use strict";

process.env.DEBUG = "actions-on-google:*";
const App = require("actions-on-google").DialogflowApp;
const functions = require("firebase-functions");
const fetch = require("node-fetch");
// const URL = "https://giardino-dei-bimbi.herokuapp.com/";
const URL = "https://brave-dijkstra-88885e.netlify.com/cate.json";

// a. the action name from the make_name Dialogflow intent
const NAME_ACTION = "make_name";
const NAME_ACTION_2 = "activity";
// b. the parameters that are parsed from the make_name intent
const DATE_ARGUMENT = "date";
const COLOR_ARGUMENT = "color";
const NUMBER_ARGUMENT = "number";

module.exports.giardinoDeiBimbi = function(request, response) {
  const app = new App({ request, response });
  console.log("Request headers: " + JSON.stringify(request.headers));
  console.log("Request body: " + JSON.stringify(request.body));

  // c. The function that generates the silly name
  function makeName(app) {
    let number = app.getArgument(NUMBER_ARGUMENT);
    let color = app.getArgument(COLOR_ARGUMENT);
    app.tell(
      "Alright, your silly name is " +
        color +
        " " +
        number +
        "! I hope you like it. See you next time."
    );
  }
  // d. build an action map, which maps intent names to functions
  function getActivities(app) {
    let date = app.getArgument(DATE_ARGUMENT);
    // let json = [
    //   [
    //     {
    //       title: "Menu del Giorno:",
    //       text:
    //         "Passato di verdura TUTTO \nprosciutto cotto TUTTO\nfinocchi all'olio TUTTO\nfrutta di stagione BANANA SI "
    //     },
    //     { title: "Annotazioni Varie:", text: "TOBRAL PRIMA DELLA NANNA OK" },
    //     { title: "Ha Mangiato?", text: "SI" },
    //     { title: "Ha Scaricato?", text: "SI\n8.15 bene 15.30 BENE" },
    //     {
    //       title: "Ha Dormito?",
    //       text: "SI \ndalle 8.45   alle 9.15\ndalle 12.30  alle 15\n\n"
    //     },
    //     { title: "Ha Fatto Merenda?", text: "SI    BUDINO" },
    //     { title: "Attività Svolte?", text: "PALLE SENSORIALI" }
    //   ],
    //   [
    //     {
    //       title: "Menu del Giorno:",
    //       text:
    //         "Risotto allo zafferano tutto\nricotta  tutto\ncavolfiori tutto\nfruttino si"
    //     },
    //     { title: "Annotazioni Varie:", text: "tobral ok prima della nanna " },
    //     { title: "Ha Mangiato?", text: "SI" },
    //     {
    //       title: "Ha Scaricato?",
    //       text: "NO\nBene alle 10.30 , poco e bene alle 15.55\n     "
    //     },
    //     {
    //       title: "Ha Dormito?",
    //       text:
    //         "SI \ndalle 8.45   alle 9.15\n\n\t\t\t \n\t\t\t dalle 12.40  alle 15\n\n\t\t\t \n\t\t\t \n\n\t\t\t "
    //     },
    //     { title: "Ha Fatto Merenda?", text: "SI    frullato" },
    //     { title: "Attività Svolte?", text: "casette e personaggi " }
    //   ],
    //   [
    //     {
    //       title: "Menu del Giorno:",
    //       text:
    //         "Pizza margherita TUTTO\ninsalata di carote POCO\nfrutta di stagione banana SI"
    //     },
    //     { title: "Annotazioni Varie:", text: "TOBRAL PRIMA DELLA NANNA OK" },
    //     { title: "Ha Mangiato?", text: "SI" },
    //     {
    //       title: "Ha Scaricato?",
    //       text: "SI\n8.30 BENE 15.30 bene \n     "
    //     },
    //     {
    //       title: "Ha Dormito?",
    //       text:
    //         "SI \ndalle 8.45   alle 9.20\n\n\t\t\t \n\t\t\t dalle 12.40  alle 15\n\n\t\t\t \n\t\t\t \n\n\t\t\t "
    //     },
    //     { title: "Ha Fatto Merenda?", text: "SI    YOGURT" },
    //     { title: "Attività Svolte?", text: "ATTIVITA' DENTRO E FUORI" }
    //   ]
    // ];

    fetch(URL)
      .then(res => res.json())
      .then(json => {
        app.tell({
          speech: `Caterina ha mangiato ${json[0][0].text}`,
          displayText: `${json[0][0].text}`
        });
        response.end();
        return;
      })
      .catch();
  }
  // d. build an action map, which maps intent names to functions
  let actionMap = new Map();

  actionMap.set(NAME_ACTION, makeName);
  actionMap.set(NAME_ACTION_2, getActivities);

  app.handleRequest(actionMap);
};
