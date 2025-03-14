import getPool from '../config/database.js';

const createTable = async () => {
    try {
      const connection = await pool.getConnection();

      await connection.query(`
      CREATE TABLE IF NOT EXISTS productos (
          id INT AUTO_INCREMENT PRIMARY KEY,
          CANTIDAD INT NOT NULL,
          PRODUCTO VARCHAR(255) NOT NULL,
          PVP DECIMAL(10, 2) NOT NULL
      );
      `);
      console.log('Tabla productos creada o ya existente.');
      connection.release();
    } catch (error) {
      console.error('Error creando la tabla productos:', error);
      throw error;
    }
  };

const getProductoById = async (id) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM productos WHERE id = ?', [id]);
    connection.release();
    return rows[0];
  } catch (error) {
    console.error('Error al obtener el producto por ID:', error);
    throw error;
  }
};

const getAllProductos = async () => {
  try {
    const pool = getPool(); // Obtiene el pool **correctamente**
    const connection = await pool.getConnection(); // Obtiene la conexión

    const [rows] = await connection.query('SELECT * FROM productos');
    connection.release();
    return rows;
  } catch (error) {
    console.error('Error al obtener todos los productos:', error);
    throw error;
  }
};

const createProducto = async (cantidad, producto, pvp) => {
  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      'INSERT INTO productos (CANTIDAD, PRODUCTO, PVP) VALUES (?, ?, ?)',
      [cantidad, producto, pvp]
    );
    connection.release();
    return { id: result.insertId, cantidad, producto, pvp };
  } catch (error) {
    console.error('Error al crear el producto:', error);
    throw error;
  }
};

const updateProducto = async (id, cantidad, producto, pvp) => {
  try {
    const connection = await pool.getConnection();
    await connection.query(
      'UPDATE productos SET CANTIDAD = ?, PRODUCTO = ?, PVP = ? WHERE id = ?',
      [cantidad, producto, pvp, id]
    );
    connection.release();
    return { id, cantidad, producto, pvp };
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    throw error;
  }
};

const deleteProducto = async (id) => {
  try {
    const connection = await pool.getConnection();
    await connection.query('DELETE FROM productos WHERE id = ?', [id]);
    connection.release();
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    throw error;
  }
};

export { createTable, getProductoById, getAllProductos, createProducto, updateProducto, deleteProducto };
