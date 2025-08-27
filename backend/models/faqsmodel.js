import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    reponse: {
        type: String,
        required: true
    },
    
    dateCreation: {
        type: Date,
        default: Date.now
    }
});

const FAQ = mongoose.model('FAQ', faqSchema);

export default FAQ;
