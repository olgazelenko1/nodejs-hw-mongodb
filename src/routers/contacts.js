import { Router } from "express";
import { getAllContactsController, getContactByIdController, deleteContactControler, updateContactController, patchContactController } from "../controllers/contacts.js";
import { createContactController } from "../controllers/contacts.js";
import { contactCreateSchema, contactUpdateSchema } from "../validation/contact.js";
import { isValidId } from "../middlewares/isValidId.js";
import { validateBody } from "../middlewares/validateBody.js";
import { authenticate } from "../middlewares/authenticate.js";
import { upload } from '../middlewares/multer.js';



 const router = Router();



router.use(authenticate);

router.get('/', getAllContactsController);
router.get('/:id', isValidId, getContactByIdController);
router.post('/', upload.single('photo'), validateBody(contactCreateSchema), createContactController);
router.delete('/:id', isValidId, deleteContactControler);
router.patch('/:id', isValidId, upload.single('photo'), validateBody(contactUpdateSchema), patchContactController);
router.put('/:id', isValidId, upload.single('photo'), validateBody(contactCreateSchema), updateContactController);

export default router;