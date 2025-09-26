import {contacts} from '../models/contacts.js';
import {calculatePaginationData} from '../utils/calculatePaginationData.js';
import { SortOrder } from '../constants/index.js';


export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SortOrder.ASC,
  sortBy = '_id',
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  // Формуємо запит один раз
  const contactsQuery = contacts.find();

  // Загальна кількість документів (для пагінації)
  const allContactsCount = await contacts.countDocuments({});

  // Сортування, пагінація
  const contactsList = await contactsQuery
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

