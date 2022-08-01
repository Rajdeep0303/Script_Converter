import { ReadLine, createInterface } from "readline";
import * as fs from "fs";
import * as path from "path";
const csvWriter = require("csv-writer");
const main = async () => {
  try {
    const writer = csvWriter.createObjectCsvWriter({
      path: path.resolve(__dirname, "zips.csv"),
      header: [
        { id: "zip", title: "zip" },
        { id: "city", title: "city" },
        { id: "loc", title: "loc" },
        { id: "pop", title: "pop" },
        { id: "state", title: "state" },
      ],
      append: true,
      fieldDelimiter: ";",
    });
    let file = "./zips.json";
    let rl = createInterface({
      input: fs.createReadStream(file),
      output: process.stdout,
      terminal: false,
    });
    rl.on("line", async (data) => {
      try {
        let json: {
          city: string;
          loc: Array<Number>;
          pop: number;
          state: string;
          _id: string;
        } = JSON.parse(data);
        const obj = {
          city: json.city,
          loc: json.loc,
          pop: json.pop,
          state: json.state,
          zip: json._id,
        };
        await writer.writeRecords([obj]);
      } catch (err) {
        console.log(err);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
main();
