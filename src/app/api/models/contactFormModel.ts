import { Schema, model, models } from 'mongoose';

const contactFormSchema = new Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true  },
    message: { type: String },
    }, 
    { collection: 'contactForm', timestamps: true }
);

const Contact = models.Contact || model('Contact', contactFormSchema);

export default Contact;