import os
import mysql.connector

# Generate AES key
def generate_aes_key():
    return os.urandom(16)  # 16 bytes for AES-128

# Store AES key in the database
def store_aes_key(client_address, aes_key):
    try:
        conn = mysql.connector.connect(
            host="localhost",
            user="root",
            password="yourpassword",
            database="PKI_BOSCH"
        )
        cursor = conn.cursor()

        # Creating a table to store the keys
        cursor.execute(
            """
        CREATE TABLE IF NOT EXISTS aes_keys (
            id INT AUTO_INCREMENT PRIMARY KEY,
            clientAddress TEXT NOT NULL,
            aes_key TEXT NOT NULL
        )
        """
        )

        # Insert the key into the table
        cursor.execute(
            """
        INSERT INTO aes_keys (clientAddress, aes_key)
        VALUES (%s, %s)
        """,
            (str(client_address), aes_key.hex())
        )

        # Commit the transaction
        conn.commit()
        print("AES key stored successfully!")

    except mysql.connector.Error as error:
        print("Couldn't store the AES key:", error)

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

# Main program
def main():
    # Generate AES key
    aes_key = generate_aes_key()
    print("AES Key:", aes_key.hex())

    # Store AES key in the database
    client_address = '127.0.0.1'  # Update with the client's address
    store_aes_key(client_address, aes_key)

if __name__ == "__main__":
    main()
