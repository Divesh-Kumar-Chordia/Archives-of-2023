import asyncio
import websockets

# Store the received ECU1 and ECU2 IDs
valid_ids = set()

async def handle_connection(websocket, path):
    # Receive ECU1 ID
    ECU1id = await websocket.recv()
    valid_ids.add(ECU1id)

    # Receive ECU2 ID
    ECU2id = await websocket.recv()
    valid_ids.add(ECU2id)

    # Receive the combined input stream
    input_stream = await websocket.recv()

    # Extract ECU1 ID, Request ID, and ECU2 ID from the input stream
    ECU1id_received = input_stream[:8]
    Requestid_received = input_stream[8:16]
    ECU2id_received = input_stream[16:24]

    # Check if the received IDs match the stored ones for authentication
    if ECU1id_received in valid_ids and ECU2id_received in valid_ids:
        await websocket.send("Authentication successful. Allowing connection.")
    else:
        await websocket.send("Authentication failed. Dropping connection.")

start_server = websockets.serve(handle_connection, "localhost", 8765)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
