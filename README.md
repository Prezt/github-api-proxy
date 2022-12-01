## Overview
This is a proxy API of some endpoints from the github API  
The project is hosted on https://github-api-proxy-prezt.herokuapp.com/  
There is a basic home page on the root endpoint  

### Installing
Clone or download the repository, then run  
```
npm install
```

### Testing
To run the tests, go to the project root directory and run  
```
npm test
```
The results will be shown in the terminal you ran the command
This tests are ran using `jest` and `supertest`  

### Running
After installing the dependencies, go to the project root directory and run the following command  
```
npm start
```
If everything has worked fine, there should be a message on the terminal `App is listening at port 3000`  
The API will be hosted on http://localhost:3000  
There are 4 available `GET` routes. Other responses 404 with "Not Found" as a message  

### Routes
###### Home page
```
GET /
```
Basic home page used mostly for dev purposes
###### List users
```
GET /api/users?since={userId}
```
List 30 github users starting with an id greater than `userId`  
If no userId is sent, it will list all users starting with `userId` = 1
###### User details
```
GET /api/users/:username/details
```
Get the details from a specific user, found from his `username`
###### User repositories
```
GET /api/users/:username/repos
```
Get the list of public repositories from a specific user, found from his `username`