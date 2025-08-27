import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true,
    
  },
  contenu: {
    type: String,
  required: true,
  },
  image: {
    type: String,
   required: true,
  },
  datePublication: {
    type: Date,
    default: Date.now
  }
});

const Article = mongoose.model('Article', articleSchema);

export default Article;
