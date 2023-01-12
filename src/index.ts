import { connectToDb } from "./db/connection";

await connectToDb();

// await deleteWithExpression("id >= 41", "flats", (value) => {
//   console.log(value);
// });

// await getAllFromTable("flats", (value) => {
//   console.log("flats", value);
// });
