import requests

# make the GET request with the equation as a query parameter
url = "http://ctf-lb-138599028.ap-south-1.elb.amazonaws.com:8007/solve"
equation = "21455436 + 752160448"
response = requests.get(url, params={"equation": equation})

# extract the solution from the response
solution = response.json()["result"]

# create the solution dictionary and make the final POST request
solution_dict = {"result": solution}
capture_url = "http://ctf-lb-138599028.ap-south-1.elb.amazonaws.com:8007/capture"
capture_response = requests.post(capture_url, json=solution_dict)

print(capture_response.text)
