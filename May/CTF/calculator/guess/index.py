import requests
import json
url = "http://ctf-lb-138599028.ap-south-1.elb.amazonaws.com:8008/guess"
team_id = "Enigma Fortress"

headers = {
    "Content-Type": "application/json"
}


def binary_search(attempts):
    low, high = 1, 10000
    for _ in range(attempts):
        mid = (low + high) // 2
        payload = {
            "guess": mid,
            "team_id": team_id
        }
        response = requests.post(url, headers=headers, data=json.dumps(payload))
        try:
            data = response.json()
        except requests.exceptions.JSONDecodeError:
            print(f"Error decoding JSON response: {response.text}")
            return None, None

        hint, remaining_attempts, flag = data["hint"], data["remaining_attempts"], data["flag"]
        print(f"Guess: {mid}, Hint: {hint}, Remaining Attempts: {remaining_attempts}")
        
        if flag:
            print(f"Correct Guess: {mid}, Flag: {flag}")
            return mid, flag

        if hint == "higher":
            low = mid + 1
        else:
            high = mid - 1

    return None, None


attempts = 1000
guess, flag = binary_search(attempts)

if guess is not None:
    print(f"Correct Guess: {guess}, Flag: {flag}")
