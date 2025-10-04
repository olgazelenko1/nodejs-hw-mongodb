import {contacts} from '../models/contacts.js';
import {calculatePaginationData} from '../utils/calculatePaginationData.js';
import { SortOrder } from '../constants/index.js';
import { UsersCollection } from '../models/user.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SortOrder.ASC,
  sortBy = '_id',
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const filter = { userId };

  const allContactsCount = await contacts.countDocuments(filter);

  const contactsList = await contacts
    .find(filter)
    .sort({ [sortBy]: sortOrder })
    .skip(skip)
    .limit(limit)
    .exec();

  const paginationData = calculatePaginationData(allContactsCount, perPage, page);

  return {
    data: contactsList,
    ...paginationData,
  };
};

export const getContactById = async (id, userId) => {
  const contact = await contacts.findOne({ _id: id, userId });
  return contact;
};
export const createContact = async (payload) => {
  return contacts.create(payload);
};
export const deleteContact = async (id, userId) => {
  const contact = await contacts.findOneAndDelete({ _id: id, userId });
  return contact;
};
export const updateContact = async (id, payload, userId) => {
  const contact = await contacts.findOneAndUpdate({ _id: id, userId }, payload, { new: true });
  return contact;
};

export const registerUser = async (payload) => {
  return await UsersCollection.create(payload);
};
