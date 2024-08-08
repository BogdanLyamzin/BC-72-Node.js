import * as fs from "node:fs/promises";
import * as path from "node:path";

const contactsPath = path.resolve("db", "contacts.json");

export const listContacts = async ()=> {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data); 
}