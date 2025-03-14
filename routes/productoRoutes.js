import express from 'express';
import { initTable, getProducto, getAll, createNewProducto, updateExistingProducto, deleteExistingProducto } from '../controllers/productoController.js';

const router = express.Router();

router.get('/init', initTable);

router.get('/:id', getProducto);
router.get('/', getAll);
router.post('/', createNewProducto);
router.put('/:id', updateExistingProducto);
router.delete('/:id', deleteExistingProducto);

export default router;