import requests
import json
import urllib.parse

base_url = 'http://bdfx4m.easypanel.host:3000'
email = 'nuviamarketing7@gmail.com'
password = '2328061410LeAMM@'

print("Logging in...")
login_payload = {"0":{"json":{"email":email,"password":password}}}
res = requests.post(f"{base_url}/api/trpc/auth.login?batch=1", json=login_payload)
data = res.json()
token = data[0]['result']['data']['json']['token']
headers = {'Authorization': f'Bearer {token}'}

print("Fetching app details...")
input_data = {"0":{"json":{"projectName":"demo-bello-mercado","serviceName":"bello-mercado"}}}
encoded_input = urllib.parse.quote(json.dumps(input_data))

# Try app.inspect or something similar to get the deployment logs
res = requests.get(f"{base_url}/api/trpc/app.inspect?batch=1&input={encoded_input}", headers=headers)
print("app.inspect:", res.status_code, res.text[:500])

# Try to fetch logs
res = requests.get(f"{base_url}/api/trpc/app.logs?batch=1&input={encoded_input}", headers=headers)
print("app.logs:", res.status_code, res.text[-1000:])
