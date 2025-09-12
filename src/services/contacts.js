import {contacts} from '../models/contacts.js';

export const getAllContacts = async () => {
    const allContacts = await contacts.find({});
    return allContacts;
};

export const getContactById = async (id) => {
    const contact = await contacts.findById(id);
    return contact;
};