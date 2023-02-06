import { connectToDb } from "./db/connection";
import express from "express";
import {
  addFlatController,
  addOwnerController,
  deleteFlatController,
  deleteOwnerController,
  editFlatController,
  editOwnerController,
  getGetAllFromTableController,
  getMainTableController,
} from "./controllers";

await connectToDb();

const app = express();
const port = 3001;

app.use(express.json());

app.get("/api/aggregatedTableData", getMainTableController);

app.get("/api/flatTypes", getGetAllFromTableController("flatTypes"));

app.get("/api/buildings", getGetAllFromTableController("buildings"));

app.get("/api/owners", getGetAllFromTableController("owners"));

app.post("/api/editFlat", editFlatController);

app.post("/api/deleteFlat", deleteFlatController);

app.post("/api/addFlat", addFlatController);

app.post("/api/addOwner", addOwnerController);

app.post("/api/editOwner", editOwnerController);

app.post("/api/deleteOwner", deleteOwnerController);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
