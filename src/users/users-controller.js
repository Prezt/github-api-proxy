import axios from "axios";

export const fetchAll =  async (req, res) => {
    const queryString = req.query?.since ? 
        `?since=${req.query.since}` 
        : '';

    const url = `https://api.github.com/users${queryString}`
    try{
        const gitHubResponse = await axios.get(url);
        res.status(200).send(gitHubResponse.data);
    }
    catch(e) {
        res.status(500).send(e.message)
    }
}

export const fetchDetailsByUsername = async (req, res) => {
    const { username } = req.params
    const url = `https://api.github.com/users/${username}`

    try{
        const gitHubResponse = await axios.get(url);
        res.status(200).send(gitHubResponse.data);
    }
    catch(e) {
        res.status(500).send(e.message)
    }
}

export const fetchReposByUsername = async (req, res) => {
    const { username } = req.params
    const url = `https://api.github.com/users/${username}/repos`

    try{
        const gitHubResponse = await axios.get(url);
        res.status(200).send(gitHubResponse.data);
    }
    catch(e) {
        res.status(500).send(e.message)
    }
}

export const usersController = {
    fetchAll,
    fetchDetailsByUsername,
    fetchReposByUsername
}