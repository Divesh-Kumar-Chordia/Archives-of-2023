import asyncio
import websockets

async def send_input():
    async with websockets.connect("ws://localhost:9000") as websocket:
        # Send ECU1 ID
        await websocket.send("ECU1A")

        # Send ECU2 ID
        await websocket.send("ECU2X")

        # Send input stream
        await websocket.send("ECU1ARequestECU2X")

        # Receive server response
        response = await websocket.recv()
        print("Server response:", response)

async def ping_server():
    async with websockets.connect("ws://localhost:9000") as websocket:
        while True:
            try:
                await websocket.ping()
            except websockets.exceptions.ConnectionClosed:
                print("Connection to server closed.")
                break
            await asyncio.sleep(10)

async def main():
    await asyncio.gather(
        send_input(),
        ping_server()
    )

asyncio.run(main())