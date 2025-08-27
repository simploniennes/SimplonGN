import mongoose from 'mongoose';

const schemaFormateur = new mongoose.Schema({
    nom: { type: String, required: true },
    poste: { type: String },
    bio: { type: String },
    photo: { type: String }
});

const Formateur = mongoose.model("Formateurs", schemaFormateur);

export default Formateur;
