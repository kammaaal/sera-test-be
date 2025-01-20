const pool = require('../config/db');

class Transactions {
  static async create(data) {
    const { client_name, car_id, start_date, end_date } = data;
    const result = await pool.query(
      'INSERT INTO transactions (client_name, car_id, start_date, end_date) VALUES ($1, $2, $3, $4) RETURNING *',
      [client_name, car_id, start_date, end_date]
    );
    return result.rows[0];
  }

  static async getAll() {
    const result = await pool.query('SELECT * FROM transactions');
    return result.rows;
  }

  static async getById(id) {
    const result = await pool.query('SELECT * FROM transactions WHERE id = $1', [id]);
    return result.rows[0];
  }

static async update(id, data) {
    const { client_name, car_id, start_date, end_date } = data;
  
    if (!client_name || !car_id || !start_date || !end_date) {
      throw new Error(`Column: ${client_name || car_id || start_date || end_date} are required`);
    }
  
    const result = await pool.query(
      'UPDATE transactions SET client_name = $1, car_id = $2, start_date = $3, end_date = $4 WHERE id = $5 RETURNING *',
      [client_name, car_id, start_date, end_date, id]
    );
  
    if (result.rowCount === 0) {
      return null;
    }
  
    return result.rows[0];
}
  

  static async delete(id) {
    const transaction_data = await this.getById(id)
    if (!transaction_data) {
        return null
    }
    await pool.query('DELETE FROM transactions WHERE id = $1', [id]);
    return { message: 'Deleted successfully' };
  }
}

module.exports = Transactions;