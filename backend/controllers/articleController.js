import Article from '../models/Article.js';

/**
 * @desc    Créer un nouvel article
 * @route   POST /api/v1/articles
 * @access  Privé/Admin
 */
export const createArticle = async (req, res) => {
  try {
    const { titre, contenu } = req.body;
    const image = req.file ? req.file.filename : null;

    const article = new Article({
      titre,
      contenu,
      image
    });

    await article.save();
    res.status(201).json(article);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * @desc    Récupérer tous les articles
 * @route   GET /api/v1/articles
 * @access  Public
 */
export const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ datePublication: -1 });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * @desc    Récupérer un article par son ID
 * @route   GET /api/v1/articles/:id
 * @access  Public
 */
export const getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: 'Non trouvé' });
    res.json(article);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * @desc    Mettre à jour un article
 * @route   PUT /api/v1/articles/:id
 * @access  Privé/Admin
 */
export const updateArticle = async (req, res) => {
  try {
    const { titre, contenu } = req.body;
    const image = req.file ? req.file.filename : null;

    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: 'Non trouvé' });

    article.titre = titre || article.titre;
    article.contenu = contenu || article.contenu;
    if (image) article.image = image;

    await article.save();
    res.json(article);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * @desc    Supprimer un article
 * @route   DELETE /api/v1/articles/:id
 * @access  Privé/Admin
 */
export const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) return res.status(404).json({ message: 'Non trouvé' });
    res.json({ message: 'Article supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
