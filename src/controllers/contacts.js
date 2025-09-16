import { getAllContacts , getContactById } from "../services/contacts";
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