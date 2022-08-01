import { ReadLine, createInterface } from "readline";
import * as fs from "fs";
import * as path from "path";

function getAllIndexes(arr : string[], val : string) {
    let indexes : number[]= [];
    let i = -1;
    while ((i = arr.indexOf(val, i+1)) != -1){
        indexes.push(i);
    }
    return indexes;
}
const main = async () => {
  let file = "./zips.csv";
  let output = "./output.csv";
  
  let rl = createInterface({
    input: fs.createReadStream(file),
    output: process.stdout,
    terminal: false,
  });

  rl.on("line", (line) => {
    const data = line.split("")
    const indexes = getAllIndexes(data, ";");
    data.splice(indexes[1] + 1, 0, "[")
    data.splice(indexes[2] + 1, 0, "]")
    fs.appendFileSync(output, data.join("")+"\n");

  })
};
main()


