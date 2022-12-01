import supertest from "supertest"
import app from "../../app"
import { expect, jest } from '@jest/globals'
import axios from "axios";

const request = supertest(app);
jest.spyOn(axios, 'get');

describe('Test /api/users', ()=>{
    afterEach(jest.resetAllMocks);
    describe('Test /api/users (root) route mocking the github API call', () => {
        it('1) Should send stringified response.data with status 200 in case of good response', async () => {
            const mockedResponse = { data: [ { id: 1 } ]}
            axios.get.mockResolvedValue(mockedResponse)

            const response = await request.get('/api/users/')
            expect(response.status).toBe(200);
            expect(response.text).toStrictEqual(JSON.stringify(mockedResponse.data))
        })
        it('2) Should send error.message with status 500 in case of bad response', async () => {
            const mockedResponse = { message: 'An unexpected error has happened'}
            axios.get.mockRejectedValue(mockedResponse)

            const response = await request.get('/api/users/')
            expect(response.status).toBe(500);
            expect(response.text).toStrictEqual(mockedResponse.message)
        })
    });

    describe('Test /api/users/:username/details route mocking the github API call', () => {
        const username = 'testUsername'
        it('3) Should send stringified response.data with status 200 in case of good response', async () => {
            const mockedResponse = { data: [ { id: 3 } ]}
            axios.get.mockResolvedValue(mockedResponse)

            const response = await request.get(`/api/users/${username}/details`)
            expect(response.status).toBe(200);
            expect(response.text).toStrictEqual(JSON.stringify(mockedResponse.data))
        })
        it('4) Should send error.message with status 500 in case of bad response', async () => {
            const mockedResponse = { message: 'An unexpected error has happened'}
            axios.get.mockRejectedValue(mockedResponse)

            const response = await request.get(`/api/users/${username}/details`)
            expect(response.status).toBe(500);
            expect(response.text).toStrictEqual(mockedResponse.message)
        })
    });

    describe('Test /api/users/:username/repos route mocking the github API call', () => {
        const username = 'testUsername'
        it('5) Should send stringified response.data with status 200 in case of good response', async () => {
            const mockedResponse = { data: [ { id: 5 } ]}
            axios.get.mockResolvedValue(mockedResponse)

            const response = await request.get(`/api/users/${username}/repos`)
            expect(response.status).toBe(200);
            expect(response.text).toStrictEqual(JSON.stringify(mockedResponse.data))
        })
        it('6) Should send error.message with status 500 in case of bad response', async () => {
            const mockedResponse = { message: 'An unexpected error has happened'}
            axios.get.mockRejectedValue(mockedResponse)

            const response = await request.get(`/api/users/${username}/repos`)
            expect(response.status).toBe(500);
            expect(response.text).toStrictEqual(mockedResponse.message)
        })
    });
});