const fs = require('fs/promises');
const path = require('path');
const {nanoid} = require('nanoid');

const contactPath = path.join(__dirname, '../contacts.json')

const listContacts = async () => {
    const data = await fs.readFile(contactPath, "utf-8");
    return JSON.parse(data)
}

const get = async (contactId) => {
    const contacts = await listContacts();
    const result = contacts.filter(contact => contact.id === contactId);
    return result || null;
} 

const remove = async (contactId) => {
    const contacts = await listContacts();
    const result = contacts.filter(contact => contact.id !== contactId);
    await fs.writeFile(contactPath, JSON.stringify(result, null, 2));
    return result || null;
}; 

const add = async (data) => {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        ...data
    }
    contacts.push(newContact);
    await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
    return newContact;
}

module.exports = {
    listContacts,
    get,
    remove,
    add,
};