const Document = require('../models/Document');
const { generateDocument } = require('../services/gemini.service');

// Generate a new document
exports.generate = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ msg: "Prompt is required" });

    const content = await generateDocument(prompt);

    const doc = await Document.create({
      user: req.user.id, // ✅ Save only ObjectId
      prompt,
      content,
      title: prompt.substring(0, 50) + "..."
    });

    res.json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error generating document" });
  }
};

// Get all documents for the user
exports.getAllDocuments = async (req, res) => {
  try {
    const documents = await Document.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(documents);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error fetching documents" });
  }
};

// Get a single document by ID
exports.getDocumentById = async (req, res) => {
  try {
    const document = await Document.findOne({ _id: req.params.id, user: req.user.id }); // ✅ Use req.user.id
    if (!document) return res.status(404).json({ msg: "Document not found" });
    res.json(document);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error fetching document" });
  }
};

// Delete a document
exports.deleteDocument = async (req, res) => {
  try {
    const document = await Document.findOneAndDelete({ _id: req.params.id, user: req.user.id }); // ✅ Use req.user.id
    if (!document) return res.status(404).json({ msg: "Document not found" });
    res.json({ msg: "Document deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error deleting document" });
  }
};

// Get user-specific documents
exports.getUserDocuments = async (req, res) => {
  try {
    const docs = await Document.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(docs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch documents' });
  }
};


exports.updateDocument = async (req, res) => {
  try {
    const { title, content } = req.body;
    const updated = await Document.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { title, content },
      { new: true }
    );
    if (!updated) return res.status(404).json({ msg: 'Document not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: 'Error updating document' });
  }
};
