import { SortOrder } from '../constants/index.js';

const parseSortOrder = (sortOrder) => {
  if ([SortOrder.ASC, SortOrder.DESC].includes(sortOrder)) {
    return sortOrder;
  }
  return SortOrder.ASC;
};

const parseSortBy = (sortBy) => {
  const keysOfContact = [
    '_id',
    'name',
  ];
  if (keysOfContact.includes(sortBy)) {
    return sortBy;
  }
  return '_id';
};

export const parseSortParams = (query) => {
  const { sortOrder, sortBy } = query;
  return {
    sortOrder: parseSortOrder(sortOrder),
    sortBy: parseSortBy(sortBy),
  };
};