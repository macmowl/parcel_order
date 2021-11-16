# Eurosender Assignment

This is a take-home assignment for the Frontend Engineer role at Eurosender.


## Description

The goal of this task is to create a frontend application for a simple parcel ordering form, where users can add, change and remove packages, update their dimensions and see the updated price. Finally, by submitting the form, user should be able to make an order and see a confirmation screen.

For the form to work, we have prepared a mock API, which is documented below.

## Details

### Order form

- The form should contain 2 select fields, each representing an origin and destination countries.
- The form should allow users to add and remove packages from the order
- Each package needs to have 4 fields: weight, height, width and length, whereas each is required to be filled by the user
- After each change, user should see prices for individual packages as well as a total price for the order. The price can be fetched from the `/api/quote` endpoint (see API documentation below)
- Make sure that the prices displayed are in a proper 2 decimals format
- By pressing on the "Make an order" button, a new order should be created by calling the `/api/order` endpoint (see documentation below) and a confirmation screen displayed
- As a bonus, you can implement a form validation based on the response from the API.

Note, that for the simplicity's sake, there is no need to add full address details. In this case only countries are fine.

### Technology

- The app should be written with React and TypeScript
- No need to change anything in the `api` folder
- You are free to choose any method for processing CSS (LESS/SASS)
- Try to avoid using CSS/styles frameworks (such as Bootstrap or Material UI)
- You can install external libraries

### Process
1. Clone the repository
2. Run the API server
```npm run api```
3. Start the app in the development mode: ```npm start```
4. Make changes as per the instructions above
6. Update the `README.md` file with your overview on the solution. Feel free to document your journey as you work on the task. You can also justify and explain your choices.
7. Zip the folder and send it back (make sure to remove the node_modules folder beforehand)
8. Let us know that your task is ready

## API

The api can be started with the following command:
```
npm run api
```

This will start an API server on port `8000`.

### Documentation

---
**GET** __/api/countries__  
Returns a list of available countries between which users can book parcels.

Example response:
```json
[
    {
        "id": "SI",
        "name": "Slovenia"
    },
    {
        "id": "UA",
        "name": "Ukraine"
    },
    {
        "id": "LX",
        "name": "Luxembourg"
    },
    {
        "id": "FR",
        "name": "France"
    },
    {
        "id": "DE",
        "name": "Germany"
    }
]
```

---
**POST** __/api/quote__  
An endpoint that calculates the price for a given order criteria.

It expects a JSON payload in a following schema:

- **countryFrom** - country ID (the same as the one from the countries endpoint)
- **countryTo** - country ID (the same as the one from the countries endpoint)
- **packages** - an array of objects, each representing a single package. Every package object is required to contain a `width`, `weight`, `length` and `height` integer values.

Example payload:

```json
{
    "countryFrom": "SI",
    "countryTo": "SI",
    "packages": [
        {
            "width": 100,
            "weight": 8,
            "length": 80,
            "height": 20
        },
        {
            "width": 120,
            "weight": 2,
            "length": 40,
            "height": 200
        }
    ]
}
```

Response:
```json
{
    "success": true,
    "quote": {
        "packages": [
            {
                "price": 154
            },
            {
                "price": 230
            }
        ],
        "totalPrice": 384
    }
}
```

**Note**, that the `quote.packages` contains an array of objects with individual prices for each package (in the same order as it was sent in the payload). `totalPrice` contains a sum of all the individual prices.

---
**POST** __/api/order__  
An endpoint that creates an order.

It accepts exactly same payload as the `/api/quote` endpoint, and returns the following response:

```json
{
    "success": true,
    "message": "Order successfully created",
    "totalPrice": 384
}
```

---

The project was bootstrapped with [Create React App](https://facebook.github.io/create-react-app/docs/getting-started).
