const express = require('express');
const { generate, getAllDocuments, getDocumentById, deleteDocument, getUserDocuments, updateDocument } = require('../controllers/document.controller');
const auth = require('../middlewares/auth.middleware');
const router = express.Router();

router.post('/generate', auth, generate);
router.get('/my-documents', auth, getUserDocuments);
router.get('/', auth, getAllDocuments);
router.get('/:id', auth, getDocumentById);
router.delete('/:id', auth, deleteDocument);
router.put('/:id', auth, updateDocument);

module.exports = router;
