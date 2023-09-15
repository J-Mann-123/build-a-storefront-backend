CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    product_id INTEGER,
    quantity INTEGER,
    user_id INTEGER,
    status BOOLEAN,

    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
