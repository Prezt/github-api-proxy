import { fetchDetailsByUsername } from "../../src/users/users-controller"
import { expect, jest } from '@jest/globals'

import axios from "axios";
jest.spyOn(axios, 'get');

const mockedResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
}

describe('Test the fetch details by username function', () => {
    afterEach(jest.resetAllMocks);
    it('1) Should send data with status 200 if the request is successful', async () => {
        const mockedAxiosResponse = { data: [ { id: 1 } ] }
        axios.get.mockResolvedValue(mockedAxiosResponse)
        const username = 'test_user'
        const mockReq = {
            params: {
                username
            }
        }
        const mockRes = mockedResponse();

        await fetchDetailsByUsername(mockReq, mockRes);
        expect(axios.get).toHaveBeenCalledWith(`https://api.github.com/users/${username}`)
        expect(mockRes.status).toHaveBeenCalledWith(200)
        expect(mockRes.send).toHaveBeenCalledWith(mockedAxiosResponse.data)
    })
    it('2) Should work if request.query has a valid number', async () => {
        const mockedAxiosResponse = { data: [ { id: 1 } ] }
        axios.get.mockResolvedValue(mockedAxiosResponse)
        const username = 'test_user'
        const mockReq = {
            params: {
                username
            }
        }
        const mockRes = mockedResponse();

        await fetchDetailsByUsername(mockReq, mockRes);
        expect(axios.get).toHaveBeenCalledWith(`https://api.github.com/users/${username}`)
        expect(mockRes.status).toHaveBeenCalledWith(200)
        expect(mockRes.send).toHaveBeenCalledWith(mockedAxiosResponse.data)
    })
    it('3) Should send error message with status 500 if the request is successful', async () => {
        const mockedAxiosResponse = { message: 'Unexpected fetch details by username Error' }
        axios.get.mockRejectedValue(mockedAxiosResponse)
        const username = 'test_user'
        const mockReq = {
            params: {
                username
            }
        }
        const mockRes = mockedResponse();

        await fetchDetailsByUsername(mockReq, mockRes);
        expect(axios.get).toHaveBeenCalledWith(`https://api.github.com/users/${username}`)
        expect(mockRes.status).toHaveBeenCalledWith(500)
        expect(mockRes.send).toHaveBeenCalledWith(mockedAxiosResponse.message)
    })
})