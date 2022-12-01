import { fetchAll } from "../../src/users/users-controller"
import { expect, jest } from '@jest/globals'

import axios from "axios";
jest.spyOn(axios, 'get');

const mockedResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
}

describe('Test the fetch all function', () => {
    afterEach(jest.resetAllMocks);
    it('1) Should send data with status 200 if the request is successful', async () => {
        const mockedAxiosResponse = { data: [ { id: 1 } ] }
        axios.get.mockResolvedValue(mockedAxiosResponse)
        const mockReq = {
            query: {
                since: undefined
            }
        }
        const mockRes = mockedResponse();

        await fetchAll(mockReq, mockRes);
        expect(axios.get).toHaveBeenCalledWith('https://api.github.com/users')
        expect(mockRes.status).toHaveBeenCalledWith(200)
        expect(mockRes.send).toHaveBeenCalledWith(mockedAxiosResponse.data)
    })
    it('2) Should work if request.query has a valid number', async () => {
        const mockedAxiosResponse = { data: [ { id: 1 } ] }
        axios.get.mockResolvedValue(mockedAxiosResponse)
        const mockReq = {
            query: {
                since: 10
            }
        }
        const mockRes = mockedResponse();

        await fetchAll(mockReq, mockRes);
        expect(axios.get).toHaveBeenCalledWith('https://api.github.com/users?since=10')
        expect(mockRes.status).toHaveBeenCalledWith(200)
        expect(mockRes.send).toHaveBeenCalledWith(mockedAxiosResponse.data)
    })
    it('3) Should send error message with status 500 if the request is successful', async () => {
        const mockedAxiosResponse = { message: 'Unexpected fetch all Error' }
        axios.get.mockRejectedValue(mockedAxiosResponse)

        const mockReq = {
            query: {
                since: 3
            }
        }
        const mockRes = mockedResponse();
        await fetchAll(mockReq, mockRes);
        expect(axios.get).toHaveBeenCalledWith('https://api.github.com/users?since=3');
        expect(mockRes.status).toHaveBeenCalledWith(500)
        expect(mockRes.send).toHaveBeenCalledWith(mockedAxiosResponse.message)
    })
})