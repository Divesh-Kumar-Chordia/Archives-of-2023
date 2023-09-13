import socket
import hashlib
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad
from Crypto.Random import get_random_bytes
import random
import secrets


# Server configuration
SERVER_IP = '0.0.0.0'  # Replace with the IP address of PC 1
SERVER_PORT = 8080

# Predefined IDs
predefined_id_1 = "ABC123"
predefined_id_2 = "XYZ789"

# Create a socket for the server
server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server_socket.bind((SERVER_IP, SERVER_PORT))
server_socket.listen(2)

# Establish connection with Client 1
client1_connection, client1_address = server_socket.accept()
print('Connected to Client 1:', client1_address)

# Establish connection with Client 2
client2_connection, client2_address = server_socket.accept()
print('Connected to Client 2:', client2_address)

while True:
    # Receive ID from Client 1
    client1_id = client1_connection.recv(1024).decode()
    if client1_id:
        print('ID received from Client 1:', client1_id)

    # Receive ID from Client 2
    client2_id = client2_connection.recv(1024).decode()
    if client2_id:
        print('ID received from Client 2:', client2_id)
    # Check if IDs match
    if client1_id == predefined_id_1 and client2_id == predefined_id_2:
        # Generate key using CBC-CMAC AES-128 algorithm
        def generate_aes_key():
             key_bytes = secrets.token_bytes(16)
             return key_bytes
        encrypted_key = generate_aes_key()  # 16 bytes for AES-128


        # Freshness Value
        def generate_freshness_value():
            val = random.randint(0, 511)  # Generate a random integer between 0 and 255 (inclusive)
            # value_hex = format(value, '02x')  # Convert the integer to a 2-character hexadecimal string
            # print(value_hex)
            val = val.to_bytes(2, 'big')
            return val
        encrypted_freshness_value = generate_freshness_value()

        # Encrypt the key and freshness value using the cipher
        # encrypted_key = cipher.encrypt(pad(key, AES.block_size))
        # encrypted_freshness_value = cipher.encrypt(pad(freshness_value, AES.block_size))

        #print(encrypted_key, encrypted_freshness_value)
        # Send the key and freshness value to Client 1
        client1_connection.sendall(encrypted_key)
        client1_connection.sendall(encrypted_freshness_value)
        #
        # # Send the key and freshness value to Client 2
        client2_connection.sendall(encrypted_key)
        client2_connection.sendall(encrypted_freshness_value)

# Close the connections
client1_connection.close()
client2_connection.close()
server_socket.close()