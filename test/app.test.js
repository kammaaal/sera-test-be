const request = require('supertest');
const app = require('../src/app');
const { expect } = require('chai');

describe('Transactions API', () => {
  let transactionId;

  it('should create a new transaction', async () => {
    const res = await request(app)
      .post('/api/transaction/')
      .send({
        client_name: 'John Doe',
        car_id: 1,
        start_date: '2025-01-20',
        end_date: '2025-01-25',
      });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('client_name', 'John Doe');
    transactionId = res.body.id;
  });

  it('should fetch all transactions', async () => {
    const res = await request(app).get('/api/transaction/');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });

  it('should get transaction by ID', async () => {
    const res = await request(app).get(`/api/transaction/${transactionId}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('id', transactionId);
  });

  it('should update transaction', async () => {
    const res = await request(app)
      .put(`/api/transaction/${transactionId}`)
      .send({
        client_name: 'Jane Doe',
        car_id: 2,
        start_date: '2025-01-21',
        end_date: '2025-01-26',
      });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('client_name', 'Jane Doe');
    expect(res.body).to.have.property('car_id', 2);
  });
  

  it('should delete transaction', async () => {
    const res = await request(app).delete(`/api/transaction/${transactionId}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('message', 'Deleted successfully');
  });
});