import {Router} from "express";
import { getAllContactsController, getContactByIdController, deleteContactControler, updateContactController } from "../controllers/contacts.js";
import { createContactController } from "../controllers/contacts.js";
import { contactCreateSchema, contactUpdateSchema } from "../validation/contact.js";
import { isValidId } from "../middlewares/isValidId.js";
import { validateBody } from "../middlewares/validateBody.js";

export const router = Router();

 router.get('/contacts', getAllContactsController);
 router.get('/contacts/:id',isValidId, getContactByIdController);
router.post('/contacts', validateBody(contactCreateSchema), createContactController); 
router.delete('/contacts/:id',isValidId, deleteContactControler);
router.patch('/contacts/:id', isValidId, validateBody(contactUpdateSchema), updateContactController);