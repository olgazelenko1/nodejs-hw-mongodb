import { getAllContacts , getContactById, createContact , deleteContact, updateContact } from "../services/contacts.js";
import createHttpError from "http-errors";
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { getEnvVar } from '../utils/getEnvVar.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';


export const getAllContactsController = async ( req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);

  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    userId: req.user._id,
  });

  res.json({
    status: 200,
    message: "Successfully found contacts!",
    data: contacts,
  });
};

      
export const getContactByIdController = async (req, res) => {
  const {id} = req.params;
  const contact = await getContactById(id, req.user._id);

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
  const photo = req.file;
  let photoUrl = null;

  if (photo) {
    if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
      try {
        photoUrl = await saveFileToCloudinary(photo);
      } catch {
        photoUrl = await saveFileToUploadDir(photo);
      }
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const createdContact = await createContact({
    ...req.body,
    userId: req.user._id,
    photo: photoUrl,
  });
    res.json({
      status: 201,
      message: "Successfully created a contact!",
      data: createdContact,
    });
};

export const deleteContactControler = async (req, res ) => {
  const {id} = req.params;
  const result = await deleteContact(id, req.user._id);
    if(!result) {
        throw createHttpError(404, 'Contact not found');
    }
    res.status(204).end();
};


  export const updateContactController = async (req,res) => {
  const result = await updateContact( req.params.id , req.body, req.user._id);
    if(!result) {
      throw createHttpError(404, 'Contact not found');
    }
    res.json({
      status: 200,
      message: "Successfully patched a contact!", 
      data: result,
    });
  };
  
export const patchContactController = async (req, res, next) => {
  const {id} = req.params;
  const photo = req.file;

  let photoUrl;

  if (photo) {
    if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const result = await updateContact( id , {...req.body, photo: photoUrl}, req.user._id);

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }
    res.json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result,
  });
};