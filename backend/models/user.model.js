import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import isEmail from 'validator/lib/isEmail.js';

const modelUser = new mongoose.Schema({
    nom:{
        type: String,
        required: [true, "le nom est obligatoire"],
        minlength: [3, "Trop court, entrez plus de 3 caractères"],
        maxlength: [55, "Trop long, entrez moins de caractères"],
    },
    email:{
        type: String,
        required: [true, "l'email est obligatoire"],
        unique: [true, "L'email doit être unique"],
        validate: [isEmail],
        
    },
    password:{
        type: String,
        required: [true, "Le mot de passe est obligatoire"],
        minlength: [6, "Le mot de passe doit faire au moins six caractères"]
    }
})

modelUser.pre("save", async function(next){
    if(!this.isModified("password"))
        return next()
    try {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        next()
    } catch (error) {
        next(error)
    }
})

modelUser.methods.comparePassword = async function (password){
    try {
        return await bcrypt.compare(password, this.password)
    } catch (error) {
        console.log("Erreur", error)
        throw(error)
        
    }
}

const User = mongoose.model('Incrits', modelUser);

export default User;