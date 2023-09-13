import sqlite3

# create a connection to the database
conn = sqlite3.connect('restaurant.db')

# create a cursor
cursor = conn.cursor()

# create the USER table
cursor.execute('''
CREATE TABLE USER (
    name TEXT,
    user_id INTEGER PRIMARY KEY,
    email TEXT,
    phone TEXT
)
''')

# create the ADDRESS table
cursor.execute('''
CREATE TABLE ADDRESS (
    id INTEGER,
    city TEXT,
    doorno INTEGER,
    pincode INTEGER,
    landmark TEXT,
    streetno INTEGER,
    FOREIGN KEY (id) REFERENCES USER (user_id)
)
''')

# create the RESTAURANT table
cursor.execute('''
CREATE TABLE RESTAURANT (
    restaurant_id INTEGER PRIMARY KEY,
    rating REAL,
    phone TEXT,
    images TEXT
)
''')

# create the FOOD_ITEM table
cursor.execute('''
CREATE TABLE FOOD_ITEM (
    qty INTEGER,
    rating REAL,
    food_id INTEGER PRIMARY KEY,
    price REAL,
    restaurant_id INTEGER,
    name TEXT,
    description TEXT,
    dish_photos TEXT,
    FOREIGN KEY (restaurant_id) REFERENCES RESTAURANT (restaurant_id)
)
''')

# create the ORDER table
cursor.execute('''
CREATE TABLE ORDERS (
    payment_status TEXT,
    bill_no INTEGER PRIMARY KEY,
    delivery_guy_name TEXT,
    time_of_delivery TEXT,
    user_id INTEGER,
    total_amount REAL,
    FOREIGN KEY (user_id) REFERENCES USER (user_id)
)
''')

# create the CART table
cursor.execute('''
CREATE TABLE CART (
    restaurant_id INTEGER,
    food_id INTEGER,
    user_id INTEGER,
    bill_no INTEGER,
    total_amount REAL,
    FOREIGN KEY (restaurant_id) REFERENCES RESTAURANT (restaurant_id),
    FOREIGN KEY (food_id) REFERENCES FOOD_ITEM (food_id),
    FOREIGN KEY (user_id) REFERENCES USER (user_id),
    FOREIGN KEY (bill_no) REFERENCES ORDERS (bill_no)
)
''')

# commit the transaction
conn.commit()

# close the connection
conn.close()

# insert a record into the ADDRESS table
cursor.execute('''
INSERT INTO ADDRESS (id, city, doorno, pincode, landmark, streetno)
VALUES (?, ?, ?, ?, ?, ?)
''', (1, 'Mumbai', 123, 400001, 'Near Gateway of India', 7))

# insert a record into the RESTAURANT table
cursor.execute('''
INSERT INTO RESTAURANT (restaurant_id, rating, phone, images)
VALUES (?, ?, ?, ?)
''', (1, 4.5, '9876543210', 'restaurant1.jpg,restaurant2.jpg'))

# insert a record into the FOOD_ITEM table
cursor.execute('''
INSERT INTO FOOD_ITEM (qty, rating, food_id, price, restaurant_id, name, description, dish_photos)
VALUES (?, ?, ?, ?, ?, ?, ?, ?)
''', (10, 4.0, 1, 150, 1, 'Veg Biryani', 'A delicious and spicy Indian rice dish', 'biryani1.jpg,biryani2.jpg'))

# insert a record into the ORDERS table
cursor.execute('''
INSERT INTO ORDERS (payment_status, bill_no, delivery_guy_name, time_of_delivery, user_id, total_amount)
VALUES (?, ?, ?, ?, ?, ?)
''', ('paid', 1, 'Mike', '2022-01-01 12:00:00', 1, 1000))

# insert a record into the CART table
cursor.execute('''
INSERT INTO CART (restaurant_id, food_id, user_id, bill_no, total_amount)
VALUES (?, ?, ?, ?, ?)
''', (1, 1, 1, 1, 1000))

# commit the transaction
conn.commit()

# perform a select operation to retrieve all records from the USER table
cursor.execute('''
SELECT * FROM USER
''')

# print the results
print(cursor.fetchall())

# perform an update operation on the USER table
cursor.execute('''
UPDATE USER
SET email = 'johnsmith@email.com'
WHERE user_id = 1
''')

# commit the transaction
conn.commit()

# perform a delete operation on the FOOD_ITEM table
cursor.execute('''
DELETE FROM FOOD_ITEM
WHERE food_id = 1
''')

# commit the transaction
conn.commit()

# close the connection
conn.close()


import mysql.connector

# create a connection to the database
conn = mysql.connector.connect(
    host='localhost',
    user='<username>',
    password='<password>',
    database='restaurant'
)

# create a cursor
cursor = conn.cursor()

# create the USER table
cursor.execute('''
CREATE TABLE USER (
    name VARCHAR(255),
    user_id INTEGER PRIMARY KEY,
    email VARCHAR(255),
    phone VARCHAR(255)
)
''')

# create the ADDRESS table
cursor.execute('''
CREATE TABLE ADDRESS (
    id INTEGER,
    city VARCHAR(255),
    doorno INTEGER,
    pincode INTEGER,
    landmark VARCHAR(255),
    streetno INTEGER,
    FOREIGN KEY (id) REFERENCES USER (user_id) ON DELETE CASCADE ON UPDATE CASCADE
)
''')

# create the RESTAURANT table
cursor.execute('''
CREATE TABLE RESTAURANT (
    restaurant_id INTEGER PRIMARY KEY,
    rating REAL,
    phone VARCHAR(255),
    images VARCHAR(255)
)
''')

# create the FOOD_ITEM table
cursor.execute('''
CREATE TABLE FOOD_ITEM (
    qty INTEGER,
    rating REAL,
    food_id INTEGER PRIMARY KEY,
    price REAL,
    restaurant_id INTEGER,
    name VARCHAR(255),
    description VARCHAR(255),
    dish_photos VARCHAR(255),
    FOREIGN KEY (restaurant_id) REFERENCES RESTAURANT (restaurant_id) ON DELETE CASCADE ON UPDATE CASCADE
)
''')

# create the ORDER table
cursor.execute('''
CREATE TABLE ORDERS (
    payment_status VARCHAR(255),
    bill_no INTEGER PRIMARY KEY,
    delivery_guy_name VARCHAR(255),
    time_of_delivery DATETIME,
    user_id INTEGER,
    total_amount REAL,
    FOREIGN KEY (user_id) REFERENCES USER (user_id) ON DELETE CASCADE ON UPDATE CASCADE
)
''')

# create the CART table
cursor.execute('''
CREATE TABLE CART (
    restaurant_id INTEGER,
    food_id INTEGER,
    user_id INTEGER,
    bill_no INTEGER,
    total_amount REAL,
    FOREIGN KEY (restaurant_id) REFERENCES RESTAURANT (restaurant_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (food_id) REFERENCES FOOD_ITEM (food_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (user_