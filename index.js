const contacts = require("./db/contacts.js");
const yargs = require("yargs")
const {hideBin} = require("yargs/helpers")

const invokeAction = async ({ action, id, name, email, phone }) => {
    switch (action) {
      case "listContacts":
        const read = await contacts.listContacts();
        console.table(read);
        break;
      case "get":
        const result = await contacts.get(id);
        console.log(result);
        break;
      case "remove":
        const newArr = await contacts.remove(id);
        console.log(newArr);
        break;
      case "add":
        const newContact = await contacts.add({ name, email, phone });
        console.log(newContact);
        break;
    default:
        console.log("What? I will not do it!");
    }
};

const arr = hideBin(process.argv);
const { argv } = yargs(arr)
invokeAction(argv);
