const axios = require('axios');
const { expect } = require('chai');
const { StatusCodes } = require('http-status-codes');

describe('First Api Tests', () => {

    //Consumiendo un servicio GET
    it('Consume GET Service', async () => {
        const response = await axios.get('https://httpbin.org/ip');

        expect(response.status).to.equal(StatusCodes.OK);
        expect(response.data).to.have.property('origin');
    });

    //Consumiendo un servicio GET con Query Parameters
    it('Consume GET Service with query parameters', async () => {
        const query = {
            name: 'John',
            age: '31',
            city: 'New York'
        };

        const response = await axios.get('https://httpbin.org/get', { query });

        expect(response.status).to.equal(StatusCodes.OK);
        expect(response.config.query).to.eql(query);
    });

    //Consumiendo servicios POST
    it('Consume POST Service', async () => {
        const body = {
            name: 'Fred',
            age: '56',
            city: 'New York'
        }
        const response = await axios.post('https://httpbin.org/post', body );

        expect(response.status).to.equal(StatusCodes.OK);
        expect(response.data.json).to.eql(body);

        //expect(response.data.json.name).to.eql('Fred');
        //expect(response.data.json.age).to.eql('56');
        //expect(response.data.json.city).to.eql('New York');
    });

    //Consumiendo servicios HEAD
    it('Consume HEAD Service', async () => {
        const response = await axios.head('https://httpbin.org/headers');

        expect(response.status).to.equal(StatusCodes.OK);
        expect(response.data).to.eql('');
    });

    //Consumiendo servicios DELETE
    it('Consume DELETE Service', async () => {
        const body = {
            name: 'Fred',
            age: '56',
            city: 'New York'
        }
        const response = await axios.delete('https://httpbin.org/delete', body);
        expect(response.status).to.equal(StatusCodes.OK);
        expect(response.data.json).to.eql(null);

        //console.log(response)
    
    });
    
    //Consumiendo servicios PATCH
    it('Consume PATCH Service', async () => {
        const body = {
            name: 'Fred',
            age: '56',
            city: 'New York'
        }
        const response = await axios.patch('https://httpbin.org/patch', body);
        expect(response.status).to.equal(StatusCodes.OK);
        expect(response.data.json).to.eql(body);

    });

    //Consumiendo servicios PUT
    it('Consume PUT Service', async () => {
        const body = {
            name: 'Fred',
            age: '56',
            city: 'New York'
        }
        const response = await axios.put('https://httpbin.org/put', body);
        expect(response.status).to.equal(StatusCodes.OK);
        expect(response.data.json).to.eql(body);
    });
});




