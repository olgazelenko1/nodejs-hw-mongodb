const parseType = (type) => {
    if (typeof type !== 'string') return undefined;
  const allowedTypes = ['work', 'home', 'personal'];
    return allowedTypes.includes(type) ? type : undefined;
};

const parseIsFavourite = (isFavourite) => {
    if (typeof isFavourite === 'boolean') return isFavourite;
    if (typeof isFavourite === 'string') {
        if (isFavourite.toLowerCase() === 'true') return true;
        if (isFavourite.toLowerCase() === 'false') return false;
    }
    return undefined;
};


export const parseFilterParams = (query) => {
    const { type, isFavourite} = query;

    const parsedType = parseType(type);
    const parsedIsFavourite = parseIsFavourite(isFavourite);

    return {
        type: parsedType,
        isFavourite: parsedIsFavourite,
    };
    };
