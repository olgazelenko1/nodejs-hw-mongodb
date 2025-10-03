
import mongoose from 'mongoose';

const contactsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    isFavourite: {
        type: Boolean,
        default: false,
    },
    contactType: {
        type: String,
        enum: ['work', 'home', 'personal'],
        required: true,
        default: 'personal',
    },
},
{
    timestamps: true,
    versionKey: false
});

export const contacts = mongoose.model('contact', contactsSchema, 'contacts');