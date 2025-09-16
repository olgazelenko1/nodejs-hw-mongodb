import {Router} from "express";
import { getAllContactsController, getContactByIdController } from "../controllers/contacts";
import { ctrlWrapper } from "../utils/ctrlWrapper";
const router = Router();

 router.get('/contacts', getAllContactsController);
 router.get('/contacts/:id', getContactByIdController),
 ctrlWrapper(getContactByIdController);
  export default router;