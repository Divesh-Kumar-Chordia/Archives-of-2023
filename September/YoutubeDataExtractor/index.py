# Replace 'YOUR_API_KEY' with your actual API key
import googleapiclient.discovery

# Replace 'YOUR_API_KEY' with your actual API key
api_key = 'AIzaSyAhbGw_da01G5QRgtec3e6nTbVd_-dZa0Q'


# Build the YouTube API service
youtube = googleapiclient.discovery.build('youtube', 'v3', developerKey=api_key)

# Make the request
request = youtube.subscriptions().list(part='snippet,contentDetails', mine=True)
response = request.execute()

print(response)
