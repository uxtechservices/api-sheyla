import { createTable, getProductoById, getAllProductos, createProducto, updateProducto, deleteProducto } from '../models/productoModel.js';

const initTable = async (req, res) => {
    try {
        await createTable();
        res.status(201).json({ message: "Tabla productos creada"});
    } catch(error) {
        console.error(error);
        res.status(500).json({message: "Fallo al inicializar la tabla"});
    }
};

const getProducto = async (req, res) => {
  try {
    const id = req.params.id;
    const producto = await getProductoById(id);
    if (producto) {
      res.json(producto);
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el producto' });
  }
};

const getAll = async (req, res) => {
  try {
    const productos = await getAllProductos();
    res.json(productos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los productos' });
  }
};

const createNewProducto = async (req, res) => {
  try {
    const { cantidad, producto, pvp } = req.body;
    const newProducto = await createProducto(cantidad, producto, pvp);
    res.status(201).json(newProducto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el producto' });
  }
};

const updateExistingProducto = async (req, res) => {
  try {
    const id = req.params.id;
    const { cantidad, producto, pvp } = req.body;
    const updatedProducto = await updateProducto(id, cantidad, producto, pvp);
    res.json(updatedProducto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el producto' });
  }
};

const deleteExistingProducto = async (req, res) => {
  try {
    const id = req.params.id;
    await deleteProducto(id);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el producto' });
  }
};

export { initTable, getProducto, getAll, createNewProducto, updateExistingProducto, deleteExistingProducto };