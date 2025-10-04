import { Router } from "express";
import { getAllContactsController, getContactByIdController, deleteContactControler, updateContactController } from "../controllers/contacts.js";
import { createContactController } from "../controllers/contacts.js";
import { contactCreateSchema, contactUpdateSchema } from "../validation/contact.js";
import { isValidId } from "../middlewares/isValidId.js";
import { validateBody } from "../middlewares/validateBody.js";
import { authenticate } from "../middlewares/authenticate.js";




 const router = Router();



router.use(authenticate);

router.get('/', getAllContactsController);
router.get('/:id', isValidId, getContactByIdController);
router.post('/', validateBody(contactCreateSchema), createContactController);
router.delete('/:id', isValidId, deleteContactControler);
router.patch('/:id', isValidId, validateBody(contactUpdateSchema), updateContactController);


export default router;