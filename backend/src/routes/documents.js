const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { executeQuery, executeNonQuery } = require('../database/mssql-config');
const { authenticateToken } = require('../middleware/auth');
const logger = require('../utils/logger');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../../uploads');
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Get all documents
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { documentType, organizationId } = req.query;
    let query = 'SELECT * FROM Documents WHERE IsDeleted = 0';
    let params = {};
    let conditions = [];
    
    if (documentType) {
      conditions.push('DocumentType = @documentType');
      params.documentType = documentType;
    }
    if (organizationId) {
      conditions.push('OrganizationID = @organizationId');
      params.organizationId = organizationId;
    }
    
    if (conditions.length > 0) {
      query += ' AND ' + conditions.join(' AND ');
    }
    
    const documents = await executeQuery(query, params);
    res.json(documents);
  } catch (error) {
    logger.error('Database error fetching documents:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Get document by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const documents = await executeQuery(
      'SELECT * FROM Documents WHERE DocumentID = @id',
      { id: req.params.id }
    );

    if (documents.length === 0) {
      return res.status(404).json({ error: 'Document not found' });
    }

    res.json(documents[0]);
  } catch (error) {
    logger.error('Database error fetching document:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Upload document
router.post('/', authenticateToken, upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const { title, description, documentType, organizationId, folderId, tags } = req.body;
    
    const result = await executeNonQuery(
      `INSERT INTO Documents (DocumentID, OrganizationID, FolderID, Title, Description, DocumentType, FileName, FileURL, FileSize, MimeType, Version, Status, Tags, IsPublic, IsDeleted, CreatedBy, CreatedAt, UpdatedAt)
       OUTPUT INSERTED.DocumentID
       VALUES (NEWID(), @orgId, @folderId, @title, @description, @documentType, @fileName, @fileUrl, @fileSize, @mimeType, 1, 'Active', @tags, 0, 0, @createdBy, SYSUTCDATETIME(), SYSUTCDATETIME())`,
      {
        orgId: organizationId || null,
        folderId: folderId || null,
        title,
        description,
        documentType: documentType || 'General',
        fileName: req.file.originalname,
        fileUrl: `/uploads/${req.file.filename}`,
        fileSize: req.file.size,
        mimeType: req.file.mimetype,
        tags: tags || null,
        createdBy: req.user.id
      }
    );

    const newDocumentId = result && result.recordset && result.recordset[0] ? result.recordset[0].DocumentID : null;
    
    logger.info('Document uploaded:', { documentId: newDocumentId, filename: req.file.originalname });
    res.status(201).json({ id: newDocumentId, title, filename: req.file.originalname });
  } catch (error) {
    logger.error('Database error creating document:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Update document
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { title, description, status, tags } = req.body;
    
    await executeNonQuery(
      'UPDATE Documents SET Title = @title, Description = @description, Status = @status, Tags = @tags, UpdatedAt = SYSUTCDATETIME() WHERE DocumentID = @id',
      {
        title,
        description,
        status,
        tags,
        id: req.params.id
      }
    );

    logger.info('Document updated:', { documentId: req.params.id });
    res.json({ message: 'Document updated successfully' });
  } catch (error) {
    logger.error('Database error updating document:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Delete document
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    await executeNonQuery(
      'UPDATE Documents SET IsDeleted = 1, UpdatedAt = SYSUTCDATETIME() WHERE DocumentID = @id',
      { id: req.params.id }
    );

    logger.info('Document deleted:', { documentId: req.params.id });
    res.json({ message: 'Document deleted successfully' });
  } catch (error) {
    logger.error('Database error deleting document:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
