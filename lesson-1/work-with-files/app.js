// import * as fs from "node:fs";
import * as fs from "node:fs/promises";
import DetectFileEncodingAndLanguage from "detect-file-encoding-and-language";

const func = async () => {
    const filePath = "./files/file.txt";
    // const buffer = await fs.readFile(filePath);
    // const text = buffer.toString();
    // console.log(text);
    // const text = await fs.readFile(filePath, "utf-8");
    // console.log(text);
    // const {encoding} = await DetectFileEncodingAndLanguage(filePath);
    // const text = await fs.readFile(filePath, encoding);
    // console.log(text);
    // await fs.appendFile(filePath, "\nPHP forever");
    // await fs.writeFile(filePath, "Mojo the best");
    // await fs.appendFile("./files/file2.txt", "\nPHP forever");
    // await fs.writeFile("./files/file3.txt", "Mojo the best");
    // await fs.unlink("./files/file3.txt");
}

func();

// fs.readFile("./files/file.txt")
//     .then(data => console.log(data))
//     .catch(error => console.log(error.message));

// fs.readFile("./files/file.txt", (error, data)=> {
//     console.log(error);
//     console.log(data);
// })