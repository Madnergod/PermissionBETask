const express = require("express");
const cors = require("cors");
const { registerValidator } = require("./validations/auth");
const mongoose = require("mongoose");
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./swager-ui.json");

const {
  register,
  login,
  updateUserRole,
} = require("./controllers/UserController");
const {
  deleteRole,
  createRole,
  getAllRoles,
  manageRoles,
} = require("./controllers/RolesController");
const { getAllEndpoint } = require("./controllers/EndPointController");
const { getAllNumbers } = require("./controllers/NumbersController");
const { getAllLetters } = require("./controllers/LettersController");
const { getAllNames } = require("./controllers/NamesController");

const app = express();

mongoose
  .connect(
    "mongodb+srv://Madnergod:p0FXuAR3cucZYFAP@cluster0.wifzvfz.mongodb.net/Cluster0?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Соединение установлено");
  })
  .catch((e) => {
    console.log(e);
  });

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.post("/register", registerValidator, register);
app.post("/login", login);
app.patch("/updateUserRole:", updateUserRole);

app.post("/createRole", createRole);
app.patch("/manageRoles/:_id", manageRoles);
app.delete("/deleteRole/:_id", deleteRole);
app.get("/getAllRoles", getAllRoles);

app.get("/getAllEndpoints", getAllEndpoint);
app.get("/getAllNumbers", getAllNumbers);
app.get("/getAllLetters", getAllLetters);
app.get("/getAllNames", getAllNames);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server OK");
});
