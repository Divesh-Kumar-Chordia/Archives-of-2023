import socket
import re
import time

# Set the host and port
HOST = "calculator-v2-df30313705a1f14d.elb.ap-south-1.amazonaws.com"
PORT = 8000

# Create a socket and connect to the host and port
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect((HOST, PORT))

# Receive data (the math question) from the server
data = s.recv(1024)
math_question = data.decode('utf-8').strip()
print(f"Math Question: {math_question}")

# Check if the math question contains a math problem
if "+" in math_question:
    # Extract numbers from the math question
    nums = re.findall(r'\d+\s*\+\s*\d+', math_question)
    num1, num2 = [int(x.strip()) for x in nums[0].split("+")]

    # Calculate the answer and encode it
    answer = num1 + num2
    encoded_answer = f"{answer}\n".encode('utf-8')

    # Send the answer back to the server
    s.sendall(encoded_answer)

    # Receive confirmation from the server
    confirmation = s.recv(1024).decode("utf-8").strip()
    print(f"Confirmation: {confirmation}")
else:
    print("No math problem found in the question.")

# Close the socket
s.close()
