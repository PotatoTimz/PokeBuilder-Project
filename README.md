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
<br>
<br>
**NOTE:** There are a few endpoints that exists but are not in use in the project (used for testing) that are are not mentioned in the documentation but are documented within the code

## Controllers
- [Account](##Account)
- [Pokemon](##Pokemon)
- [Move](##Move)
- [Type](##Type)
- [PokeAPI](##PokeAPI)

## **Account Endpoints**
This outlines the API endpoints used for managing Account data, including endpoints that authenticate users to allow them to use other endpoints.

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
- **401 Unauthorized**: Invalid username
  ```json
  {
    "message": "Invalid Userrname"
  }
- **401 Unauthorized**: Invalid password
  ```json
  {
    "message": "Invalid Userrname"
  }

### 2. **Register**
#### **POST** `/register`
The `register` endpoint creates a new account with the provided username and password. 
#### Request Body:
- **Body**:
  ```json
  {
    "username": "new_user",
    "password": "new_password123"
  }
#### Responses:
- **201 Created**: Account was successfully created
  ```json
  {
    "token": "Account successfully created"
  }
- **400 Bad Request**: Account with username already exists
  ```json
  {
    "token": "Username already exists. Please enter a unique username!"
  }  
## **Pokemon Endpoints**
This documentation outlines the API endpoints used for manging Pokemon data including searching, creating, updating and deleting Pokemon data.

### 1. **Get All Pokémon**
#### **GET** `/pokemon`
The `pokemon` endpoint retrieves some information about all Pokemon in the database, with optional filter for "name" and "creator" (account name) 
#### Request Parameters:
- `name` (optional): Filter Pokémon by name.
- `creator` (optional): Filter Pokémon by creator's username.
#### Response:
- **200 OK**: Returns a list of Pokémon matching the filters (if any).
  ```json
  [
    {
      "pokemon_id": 1,
      "pokemon_name": "Pikachu",
      "creator": "trainer1",
      "pokemon_image": "pokemon_image.png",
      "pokemon_types" : [
        {
          "type_id": 1,
          "name": "electric"
        },
        ...
      ]
    },
    ...
  ]
  
### 2. **Get Pokemon by ID**
#### **GET** `/pokemon/<int:pokemon_id>`  
The `pokemon/<int:pokemon_id>` endpoint retrives details of a specific Pokemon based on ts ID
#### Response:
- **200 OK**: Returns the data of a specified Pokemon.
  ```json
  {
    "pokemon_id": 1,
    "pokemon_name": "Pikachu",
    "creator": "trainer1",
    "pokemon_image": "pokemon_image.png",
    "base_stats":{
      "hp": 35,
      "attack": 55,
      "defense": 40,
      "sp_attack": 50,
      "sp_defense": 50,
      "speed": 90
    }
    "pokemon_types" : [
      {
        "type_id": 1,
        "name": "electric"
      },
    ],
    "pokemon_moves": [
      {
        "move_id": 1,
        "move_name": "thunderbolt",
        "move_power": 80,
        "move_description": "The pokemon discharges some lightning."
        "move_accuracy": 100,
        "move_pp": 20,
        "type":{
          "type_id": 1,
          "name": electric
        }
      }
    ]
  }

### 3. **Update or Delete Pokemon**
### **PUT** `/user/pokemon/<int:pokemon_id>`
### **DELETE** `/user/pokemon/<int:pokemon_id>`
These endpoints allow **logged-in** users to update or delete their own Pokemon
#### Request Body (for PUT):
- **Body:**
  ```json
  {
    "types": ["Electric"],
    "name": "Pikachu",
  
    "hp": 35,
    "attack": 55,
    "defense": 40,
    "sp_attack": 50,
    "sp_defense": 50,
    "speed": 90
  }

## **Move Endpoints**

## **Type Endpoints**

## **PokeAPI Endpoints**