import { getAllContacts , getContactById, createContact , deleteContact, updateContact } from "../services/contacts.js";
import createHttpError from "http-errors";


export const getAllContactsController = async ( req, res,next) => {
   try { 
    const contacts = await getAllContacts();
        res.json({
          status: 200,
          message: "Successfully found contacts!",
          data: contacts,
        });
    } catch (err) {
        next(err);
    }
};

export const getContactByIdController = async (req, res) => {
    const {id} = req.params;
    const contact = await getContactById(id);

       if(!contact) {
        throw createHttpError(404, 'Contact not found');
       }
        res.json({
          status: 200,
          message: "Successfully found contacts!",
          data: contact,
        });
};

export const createContactController = async (req, res) => {
    const createdContact = await createContact(req.body);
    res.json({
      status: 201,
      message: "Successfully created a contact!",
      data: createdContact,
    });
};

export const deleteContactControler = async (req, res ) => {
  const {id} = req.params;
  const result = await deleteContact(id);
    if(!result) {
        throw createHttpError(404, 'Contact not found');
       }
  res.json({
    status: 204,
  });
  };

  export const updateContactController = async (req,res) => {
    const result = await updateContact( req.params.id , req.body);
    if(!result) {
      throw createHttpError(404, 'Contact not found');
    }
    res.json({
      status: 200,
      message: "Successfully patched a contact!", data: result,
    });
  };