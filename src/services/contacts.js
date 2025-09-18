import {contacts} from '../models/contacts.js';

export const getAllContacts = async () => {
    const allContacts = await contacts.find({});
    return allContacts;
};

export const getContactById = async (id) => {
    const contact = await contacts.findById(id);
    return contact;
};
export const createContact = async (payload) => {
    return contacts.create(payload);
};
export const deleteContact = async (id) => {
    const contact = await contacts.findByIdAndDelete(id);
    return contact;
};
export const updateContact = async ( id, payload ) => {
    const contact = await contacts.findByIdAndUpdate(id, payload,{new:true});
    return contact;
};