import {Router} from "express";
import { getAllContactsController, getContactByIdController, deleteContactControler, updateContactController } from "../controllers/contacts.js";
import { createContactController } from "../controllers/contacts.js";
export const router = Router();

 router.get('/contacts', getAllContactsController);
 router.get('/contacts/:id', getContactByIdController);
router.post('/contacts', createContactController); 
router.delete('/contacts/:id', deleteContactControler);
router.patch('/contacts/:id', updateContactController);