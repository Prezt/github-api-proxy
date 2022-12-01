import express from "express"
import { homepage } from "./home.js";
import { usersController } from "./users/users-controller.js";

const router = express.Router(); 
export const appRouter = router
    .get('/', async (req, res) =>  { 
        res.send(homepage) 
    })
    .get('/api/users', usersController.fetchAll)
    .get('/api/users/:username/details', usersController.fetchDetailsByUsername)
    .get('/api/users/:username/repos', usersController.fetchReposByUsername)
