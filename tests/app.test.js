import axios from 'axios';
import mocha from 'mocha';
import { expect } from 'chai';

describe('post request to /api/candidates', function () {
  it('should respond with status code 404 when route does not exist', async () => {
    try {
      await axios.post('http://localhost:3001/api/candidates', { count: 10 });
    } catch (error) {
      expect(error.response.status).to.equal(404); // Ensure the test checks for 404
    }
  });

  it('should generate candidates in quantity of given number', async () => {
    const response = await axios.post('http://localhost:3001/api/generate-candidates', { count: 10 });
    console.log(response);
    expect(response.status).to.equal(201); // Check for successful creation
    expect(response.data.candidates).to.have.lengthOf(10); // Verify candidate count
  });

  it('should return all candidates', async () => {
    const response = await axios.get('http://localhost:3001/api/candidates');
    expect(response.status).to.equal(200); // Check for successful retrieval
    expect(response.data).to.be.an('array'); // Ensure the response is an array
  });
});
