
import mongoose from 'mongoose';

const contactsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
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
        enum: ['work', 'home', 'personal', 'private'],
        required: true,
        default: 'personal',
    },
    photo: {
        type: String,
        required: false,
        default: null,
    },
},
{
    timestamps: true,
    versionKey: false
});

export const contacts = mongoose.model('contact', contactsSchema, 'contacts');