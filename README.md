# PokeBuilder

**Created By:** Andre Alix (100787216) & Ayman Zahid (100825254)
</br>
**Deployment Link:** [PokeBuilder Website](https://advanced-web-dev-project.vercel.app/)

## Table of Contents

- [Introduction](#introduction)
- [Website Showcase](#website-showcase)
- [Set-up](#set-up)
- [Database Schema](#database-schema)
- [UML](#uml)
- [PokeBuilder API Route Documentation](#pokebuilder-api-route-documentation)

## Introduction

Pokebuilder is a full-stack website that allows you to create, customize, and view other people's custom-built Pokemon. Using Pokebuilder
users can create their own Pokemon to their liking, choosing between their looks, types, and other essential data points found
within the original games. Each created Pokemon is fully visible within the site, allowing users to view other member's custom Pokemon and
compare them with their own. Each Pokemon is linked to a user account, allowing users to fill their page with their different creations.
Additionally, the user may use data from the official Pokemon games to help them compare and create their moves & Pokemon.
<br><br>
Any information about official Pokemon, moves, and type matchups are all taken externally from **pokeapi.co**.

## Website Showcase

### Home Page
The **Home Page** welcomes users to the PokeBuilder platform, providing an overview of its functionality. It invites users to explore existing Pokémon, moves, and create their own custom entries.

![Home Page](https://i.ibb.co/CJ8f117/Home-Page.png)

### Profile Page
The **Profile Page** displays the user’s account information, including their created Pokémon and moves. It serves as the hub for managing and viewing their creations.

![Profile Page](https://i.ibb.co/LR7NZs3/Profile-Page.png)

### Create Pokémon Page
The **Create Pokémon Page** allows users to design their own Pokémon by specifying stats, types, and an image. Users can make unique Pokémon to add to their collection.

![Create Pokémon Page](https://i.ibb.co/HVn4N7y/Create-Pokemon.png)

### Create Move Page
The **Create Move Page** provides users with the ability to create custom moves, defining attributes such as power, accuracy, and type.

![Create Move Page](https://i.ibb.co/p21cR1w/Create-Pokemon-Moves.png)

### Pokémon List
The **Pokémon List Page** showcases all user-created Pokémon, allowing users to browse through the creations of others.

![Pokémon List](https://i.ibb.co/7vKgqh3/Pokemon-List.png)

### Move List
The **Move List Page** displays all user-created moves, helping users discover custom moves created by the community.

![Move List](https://i.ibb.co/6NcPbdP/Pokemon-Moves-List.png)

### How the Website Works

1. **Account Management**:
   - Users must create an account to start building and managing Pokémon and moves.
   - Authentication is handled securely with JWT tokens.

2. **Creating Pokémon**:
   - Navigate to the "Create Pokémon" section.
   - Input attributes like stats, types, and an image URL to craft a custom Pokémon.

3. **Creating Moves**:
   - Navigate to the "Create Move" section.
   - Define move details such as name, type, power, accuracy, and description.

4. **Browsing Pokémon and Moves**:
   - Use the Pokémon and Move List pages to explore creations by other users.

5. **Profile Management**:
   - View and manage your own Pokémon and moves directly from your profile page.

This platform offers a user-friendly interface for building and sharing custom Pokémon creations. Dive in and start creating your Pokémon universe!

### Tech Stack

**Back-end:** Flask, SQLAlchemy, SQLite\
**Front-end:** React, SCSS, Bootstrap\
**Deployment:** Vercel for Front-end, Render for Back-end

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

### Docker
```
$ //backend setup
$ docker build -t pokebuilder-backend .
$ docker run -it --rm pokebuilder-backend

$ //frontend setup
$ docker build -t pokebuilder-frontend .
$ docker run -it --rm pokebuilder-frontend 
```

## Database Schema

![Database Schema Link](https://imgur.com/rQiPQ8e.png)

## UML
![UML](https://imgur.com/Ty8q14w.png)

## PokeBuilder API Route Documentation

The PokeBuilder API stores account, move, type and Pokemon info. Through the PokeBuilder API you will be able to perform CRUD operations on the following
database tables and perform additional actions to change the relationships between tables. The API can be used to either retrieve info or perform actions
to allow for site functionality.
<br>
<br>
**NOTE:** There are a few endpoints that exists but are not in use in the project (used for testing) that are are not mentioned in the documentation but are documented within the code

## Controllers

- [Account](#account-endpoints)
- [Pokemon](#pokemon-endpoints)
- [Move](#move-endpoints)
- [Type](#type-endpoints)
- [PokeAPI](#pokeapi-endpoints)

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
  ```

#### Responses:

- **200 OK**: Login successfull, returns a JWT Token
  ```json
  {
    "token": "jwt_token_string"
  }
  ```
- **401 Unauthorized**: Invalid username
  ```json
  {
    "message": "Invalid Username"
  }
  ```
- **401 Unauthorized**: Invalid password
  ```json
  {
    "message": "Invalid Userrname"
  }
  ```

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
  ```

#### Responses:

- **201 CREATED**: Account was successfully created
  ```json
  {
    "token": "Account successfully created"
  }
  ```
- **400 BAD REQUEST**: Account with username already exists
  ```json
  {
    "token": "Username already exists. Please enter a unique username!"
  }
  ```

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

  ```

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
          "name": "electric"
        }
      }
    ]
  }
  ```

### 3. **Update or Delete Pokemon**

#### **PUT** `/user/pokemon/<int:pokemon_id>`

#### **DELETE** `/user/pokemon/<int:pokemon_id>`

These endpoints allow **logged-in** users to update or delete their own Pokemon. Type must be an array with two strings (second string can be empty if the pokemon doesn't have a second type).

#### Request Body (for PUT):

- **Body:**
  ```json
  {
    "name": "Pikachu",
    "types": ["Electric", ""],
    "image": "pokemon_image.png"
    "hp": 35,
    "attack": 55,
    "defense": 40,
    "sp_attack": 50,
    "sp_defense": 50,
    "speed": 90
  }
  ```

#### Response:

- **200 OK**: If the update or deletion is successful.
- `(PUT)`:
  ```json
  {
    "message": "pokemon successfully updated!"
  }
  ```
- `(DELETE)`:
  ```json
  {
    "message": "pokemon successfully deleted!"
  }
  ```
- **400 BAD REQUEST** Invaid input
  ```json
  {
    "message": "Invalid Input!"
  }
  ```
- **401 BAD REQUEST** Updating / Deleting a Pokemon you didn't create
  ```json
  {
    "message": "You cannot edit a pokemon you didn't create"
  }
  ```

### 4. **Create or Get User Pokemon**

#### **POST** `/user/pokemon`

#### **GET** `/user/pokemon`

These endpoints allow a logged-in user to create new Pokémon or retrieve their own Pokémon collection

#### Request Body (for POST):

- **Body:**
  ```json
  {
    "name": "Pikachu",
    "types": ["Electric", ""],
    "image": "pokemon_image.png",
    "hp": 35,
    "attack": 55,
    "defense": 40,
    "sp_attack": 50,
    "sp_defense": 50,
    "speed": 90
  }
  ```

#### Response:

- **201 CREATED**: If successfull retrieval or creation'
- `(POST)`:
  ```json
  {
    "message": "pokemon succesfully added!",
    "id": 2
  }
  ```
- `(GET)`:

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

  ```

### 5. **Get Pokemon from Other Users**

#### **POST** `/user/pokemon/<string:username>`

This endpoint retrieves all Pokemon associated with a specifc user's username.

#### Response:

- **200 OK**: Returns a list of Pokemon owned by the specified user.

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

  ```

### 6. **Add or Remove Pokemon Moves**

#### **POST** `/user/pokemon/<int:pokemon_id>/move`

#### **Delete** `/user/pokemon/<int:pokemon_id>/move`

These endpoints allow a logged-in user to add or remove moves for a specified Pokemon. Done by passing the name of the move that should be added/deleted into the body.

#### Request Body (for POST & DELETE):

- **Body:**
  ```json
  {
    "move": "Thunderbolt"
  }
  ```

#### Response:

- **200 OK**: If the move is successfully added or removed.
- `(POST)`:
  ```json
  {
    "message": "move successfully added to pokemon!"
  }
  ```
- `(DELETE)`:
  ```json
  {
    "message": "move successfully removed!"
  }
  ```

## **Move Endpoints**

This documentation outlines the API endpoints used for manging Move data including searching, creating, updating and deleting Move data.

### 1. **Get All Moves**

#### **GET** `/move`

The `move` endpoint retrieves some information about all move in the database, with optional filter for "name" and "creator" (account name)

#### Request Parameters:

- `name` (optional): Filter move by name.
- `creator` (optional): Filter move by associated creator.

#### Response:

- **200 OK**: Returns a list of moves matching the filters.
  ```json
  {
    [
      {
        "move_id": 1,
        "move_name": "Thunderbolt",
        "move_creator": "Ash Ketchup",
        "move_power": 90,
        "move_description": "A strong electric move.",
        "move_accuracy": 100,
        "move_pp": 10,
        "type":{
          "type_id": 1,
          "name": "electric"
        }
      },
      ...
    ]
  }
  ```

### 2. **Get/Create Moves Associated to User**

#### **GET** `/user/move`

#### **POST** `/user/move`

These endpoints allow a logged-in user to create new Moves or retrieve their own Move collection.

#### Request Body (for POST):

- **Body:**
  ```json
  {
    "name": "Thunderbolt",
    "power": 90,
    "description": "A strong electric move.",
    "accuracy": 100,
    "pp": 10,
    "type": "Electric"
  }
  ```

#### Response:

- **200 OK**: Returns a list of moves associated to the logged in user.
  <br> `(GET)`:
  ```json
    {
      [
        {
          "move_id": 1,
          "move_name": "Thunderbolt",
          "move_creator": "Ash Ketchup",
          "move_power": 90,
          "move_description": "A strong electric move.",
          "move_accuracy": 100,
          "move_pp": 10,
          "type":{
            "type_id": 1,
            "name": "electric"
          }
        },
        ...
      ]
    }
  ```
- **400 BAD REQUEST** Invalid body, missing parameters for move creation.
  <br> `(POST)`

  ```json
  {
    "message": "Invalid Input!"
  }
  ```

- **400 BAD REQUEST** Cannot make move with a non-existant type.
  <br> `(POST)`

  ```json
  {
    "message": "Type not found. Invalid Input"
  }
  ```

- `(DELETE)`:

### 3. **Get Learnable Moves**

#### **GET** `/user/move/learnable/<int:id>`

Endpoint retrieves all moves unassociated with the given pokemon. Essentially giving a list of moves the pokemon can learn. Pokemon is determined by the given `id` parameter

#### Response:

- **200 OK**: Returns all moves unassocated with the given Pokemon.
  ```json
    {
      [
        {
          "move_id": 1,
          "move_name": "Thunderbolt",
          "move_creator": "Ash Ketchup",
          "move_power": 90,
          "move_description": "A strong electric move.",
          "move_accuracy": 100,
          "move_pp": 10,
          "type":{
            "type_id": 1,
            "name": "electric"
          }
        },
        ...
      ]
    }
  ```

### 4. **Get Other Users Moves**

#### **GET** `/user/move/<string:username>`

Endpoint retrieves all moves of the given user. Account is determined by the given `username` parameter.

#### Response:

- **200 OK**: Returns all moves associated with the given account.
  ```json
    {
      [
        {
          "move_id": 1,
          "move_name": "Thunderbolt",
          "move_creator": "Ash Ketchup",
          "move_power": 90,
          "move_description": "A strong electric move.",
          "move_accuracy": 100,
          "move_pp": 10,
          "type":{
            "type_id": 1,
            "name": "electric"
          }
        },
        ...
      ]
    }
  ```

### 5. **Get Specific Move**

#### **GET** `/move/<int:move_id>`

Endpoint retrieves data of a specific move. Move determined by the given `move_id` parameter

#### Response:

- **200 OK**: Returns data associated with the given move.

  ```json
  {
    "move_id": 1,
    "move_name": "Thunderbolt",
    "move_creator": "Ash Ketchup",
    "move_power": 90,
    "move_description": "A strong electric move.",
    "move_accuracy": 100,
    "move_pp": 10,
    "type": {
      "type_id": 1,
      "name": "electric"
    }
  }
  ```

### 6. **Update / Delete Move**

#### **PUT** `/user/move/<int:move_id>`

#### **DELETE** `/user/move/<int:move_id>`

Updates / deletes the specified move. Move determined by the given `move_id` parameter.

#### Request Body (for PUT):

- **Body:**
  ```json
  {
    "name": "Thunderbolt",
    "power": 90,
    "description": "A strong electric move.",
    "accuracy": 100,
    "pp": 10,
    "type": "Electric"
  }
  ```

#### Response:

- **200 OK**: Returns message on successfull update.
  <br> `(PUT)`:

  ```json
  {
    "message": "successfully deleted move!"
  }
  ```

- **200 OK**: Returns message on successfull delete.
  <br> `(DELETE)`:

  ```json
  {
    "message": "successfully deleted move!"
  }
  ```

- **400 BAD REQUEST** Invalid body, missing parameters for move creation.
  <br> `(PUT)`

  ```json
  {
    "message": "Invalid Input!"
  }
  ```

- **400 BAD REQUEST**: Invalid type.
  <br> `(PUT)`:

  ```json
  {
    "message": "Type not found. Invalid Input"
  }
  ```

## **Type Endpoints**

This documentation outlines the API endpoints used for manging Type data.

### 1. **Add / Get Types**

#### **GET** `/type`

#### **POST** `/type`

Adds new type or retrieves all type data. Used only for testing purposes.

#### Request Body (for POST):

- **Body:**
  ```json
  {
    "name": "electric"
  }
  ```

#### Response:

- **200 OK**: Returns all of the types in the database.
  <br> `(GET)`:

  ```json
  {
    [
      {
        "name": "electric",
        "id": 1
      },
      ...
    ]
  }

  ```

- **200 OK**: Returns information of newly made type
  <br> `(POST)`:

  ```json
  {
    "name": "electric",
    "id": 1
  }
  ```

- **400 BAD REQUEST** Invalid body, missing parameters for type creation.
  <br> `(POST)`

  ```json
  {
    "message": "Invalid Input!"
  }
  ```

## **PokeAPI Endpoints**

This documentation outlines the API endpoints used to interact with the PokeAPI. Not information is needed from PokeAPI calls so the pokebuilder website makes a seperate call to the PokeAPI to filter the needed information and send it directly to the client.

### 1. **Get Official Pokemon Data**

#### **GET** `/pokeapi/pokemon/<string:pokemon>`

Converts information about official pokemon from the PokeAPI to mimic the Pokemon model found in the database. Parameter `pokemon` is used to determine which Pokemon to get info about.

- **200 OK**: Returns all of information of the desired pokemon
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
    }
  ```

### 2. **Generate Matchup Chart**

#### **GET** `/pokeapi/pokemon/<string:pokemon>/typechart`

Generate the matchup chart for the desired pokemon. Pokemon determined via parameter `pokemon` passed. Information about types matchup is determined through the PokeAPI and than sent back to the user categorizing each damage effectiveness within lists. Only determine damage effectiveness (weaknesses) of the pokemon.

- **200 OK**: Returns type matchups. Each in game type should pre represented within the matchup chart
  ```json
  {
    "type_chart": {
      "0": ["fire"],
      "1/4": ["water"],
      "1/2": ["grass"],
      "1": ["normal"],
      "2": ["ghost"],
      "4": ["electric"]
    }
  }
  ```

### 3. **Get Official Move Data**

#### **GET** `/pokeapi/move/<string:move>`

Converts information about official pokemon from the PokeAPI to mimic the Move model found in the database. Parameter `move` is used to determine which move to get info about.

- **200 OK**: Returns all of information of the desired pokemon
  ```json
  {
    "move_name": "flamethrower",
    "move_accuracy": 100,
    "move_description": "The Pokemon excerts fire from it's mouth",
    "move_power": 100,
    "move_pp": 10,
    "type": ["fire"]
  }
  ```

## Authentication

All endpoints that /user generally requires you to be logged in with a **valid** JWT token. An endpoint will requires a JWT Token if @token_required is annotated within the endpoint. The passed bearer token will be authenticated. Invalid tokens will not allow you to proceed forwards.

#### Header:

- **Header Body**
  ```json
  {
    "Authorization": "Bearer token"
  }
  ```

#### Response:

- **403 FORBIDDEN**: Token is not passed.
  ```json
  {
    "message": "Token is missing!"
  }
  ```
- **403 FORBIDDEN**: Token has expired.
  ```json
  {
    "message": "Token has expired!"
  }
  ```
- **403 FORBIDDEN**: Token failed authentication.
  ```json
  {
    "message": "Invalid or expired token!"
  }
  ```
