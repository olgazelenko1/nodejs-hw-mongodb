import Joi from "joi";

export const contactSchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    phoneNumber: Joi.string().pattern(new RegExp('^[0-9]+$')).min(10).max(15).required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid('personal', 'business'),
});
export const updateContactSchema = Joi.object({
    name: Joi.string().min(3).max(20),
    phoneNumber: Joi.string().pattern(new RegExp('^[0-9]+$')).min(10).max(15),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid('personal', 'business'),
}).min(1);

