import express from 'express';
import multer from 'multer';
import * as crud from '../controllers/formateur.js';
import auther from '../middlewares/auth.middleware.js';

const router = express.Router();

// Pour les photos des formateurs
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

router.get("/", crud.lister);
router.get("/:id", crud.detail);
router.post("/",auther, upload.single("photo"), crud.creer);
router.put("/:id",auther, upload.single("photo"), crud.modifier);
router.delete("/:id",auther,  crud.supprimer);

export default router;
