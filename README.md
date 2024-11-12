# PokeBuilder
##### Created By: Andre Alix & 

## Introduction
Pokebuilder is a full-stack website that allows you to create, customize, and view other people's custom-built Pokemon. Using Pokebuilder
users can create their own Pokemon to their liking, choosing between their looks, types, and other essential data points found
within the original games. Each created Pokemon is fully visible within the site, allowing users to view other member's custom Pokemon and
compare them with their own. Each Pokemon is linked to a user account, allowing users to fill their page with their different creations.
Additionally, the user may use data from the official Pokemon games to help them compare and create their moves & Pokemon.
<br><br>
Any information about official Pokemon, moves, and type matchups are all taken externally from **pokeapi.co**.

### Tech Stack
**Back-end:** Flask, SQLAlchemy, SQLite\
**Front-end:** React, SCSS, Bootstrap

## Set-up
Both front-end and back-end must be run simultaneously on the same terminal for the website to function as intended. 
Below are the terminal commands to install the necessary dependencies and properly compile the website.
#### Back-end
```
$ cd back-end
$ pip install -r requirements.txt
$ python app.py
```
#### Front-end
```
$ cd front-end
$ npm i 
$ npm run dev
```

## Database Schema
![Database Schema Link](https://imgur.com/rQiPQ8e.png)

# PokeBuilder API Documentation
The PokeBuilder API stores account, move, type and Pokemon info. Through the PokeBuilder API you will be able to perform CRUD operations on the following 
database tables and perform additional actions to change the relationships between tables. The API can be used to either retrieve info or perform actions
to allow for site functionality.

## Controllers
- [Account](##Account)
- [Pokemon](##Pokemon)
- [Move](##Move)
- [Type](##Type)
- [PokeAPI](##PokeAPI)

## **Account Endpoints**

### 1. **Login**
#### **POST** `/login`
The `login` endpoint authenticates a user by verifying their username and password.
#### Request Body:
- **Body**:
  ```json
  {
    "username": "user_example",
    "password": "password123"
  }
#### Responses:
- **200 OK**: Login successfull, returns a JWT Token
  ```json
  {
    "token": "jwt_token_string"
  }

#### Pokemon
#### Move
#### Type
#### PokeAPI
