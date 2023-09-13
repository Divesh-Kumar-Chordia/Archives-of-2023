input_stream = "0101010101111111101111111"  # Example continuous stream of 0s and 1s

# Define the lengths of each segment
ECU1id_length = 8  # 1 byte = 8 bits
Requestid_length = 8
ECU2id_length = 8

# Calculate the start and end indices for each segment
start_index = 0
end_index = ECU1id_length
ECU1id = input_stream[start_index:end_index]

start_index = end_index
end_index += Requestid_length
Requestid = input_stream[start_index:end_index]

start_index = end_index
end_index += ECU2id_length
ECU2id = input_stream[start_index:end_index]

# Print the extracted IDs
print("ECU1 ID:", ECU1id)
# print("Request ID:", Requestid)
print("ECU2 ID:", ECU2id)
