import { connectToDb } from "./db/connection";
import express from "express";
import {
  addFlatController,
  addOwnerController,
  deleteFlatController,
  editFlatController,
  getGetAllFromTableController,
  getMainTableController,
} from "./controllers";

await connectToDb();

const app = express();
const port = 3001;

app.get("/api/aggregatedTableData", getMainTableController);

app.get("/api/flatTypes", getGetAllFromTableController("flatTypes"));

app.get("/api/buildings", getGetAllFromTableController("buildings"));

app.post("/api/editFlat", editFlatController);

app.post("/api/deleteFlat", deleteFlatController);

app.post("/api/addFlat", addFlatController);

app.post("/api/addOwner", addOwnerController);

app.post("/api/editOwner", (req, res) => {
  res.send("Express + TypeScript Server");
});

app.post("/api/deleteOwner", (req, res) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
