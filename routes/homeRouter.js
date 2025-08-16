// routes/homeRouter.js
import express from 'express';
import {createHome, getHomes, getHomeById, updateHome, deleteHome} from '../controller/homeController.js';

const router = express.Router();

// ✅ Routes for Home CRUD
router.post('/', createHome);           // Add new home
router.get('/', getHomes);              // Get all homes
router.get('/:id', getHomeById);        // Get single home by ID
router.put('/:id', updateHome);         // Update home details
router.delete('/:id', deleteHome);      // Delete home

export default router;
