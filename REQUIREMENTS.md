# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Users
-  Index '/users'
-  Show '/user/:id'
-  Create '/newUser'
-  Destroy '/deleted/:id'

#### Products
-  Index '/products'
-  Show '/product/:id'
-  Create '/newProduct'
-  Destroy '/deleted/:id'

#### Orders
-  Index '/orders'
-  Show '/orders/:id'
-  Create '/newOrder'
-  Destroy '/deleted/:id'

## Data Shapes
#### Users
- id
- firstName
- lastName
- password

    id SERIAL PRIMARY KEY,
    firstName VARCHAR(30) NOT NULL,
    lastName VARCHAR(30) NOT NULL,
    password VARCHAR(30) NOT NULL

#### Products
-  id
- name
- price

    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    price INTEGER NOT NULL

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

    id SERIAL PRIMARY KEY,
    product_id INTEGER,
    quantity INTEGER,
    user_id INTEGER,
    status BOOLEAN,

    FOREIGN KEY (product_id) REFERENCES product(id),
    FOREIGN KEY (user_id) REFERENCES user(id)

