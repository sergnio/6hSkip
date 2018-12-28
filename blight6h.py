import pdb
import requests
loginUrl = 'https://blight.ironhelmet.com/arequest/login'

data = 'type=login&alias=claypooljake%40gmail.com&password=pizza'

response = requests.post(loginUrl, params=data, headers={"accept": "application/json, text/javascript, */*; q=0.01","accept-language": "en-US,en;q=0.9","content-type": "application/x-www-form-urlencoded; charset=UTF-8","x-requested-with": "XMLHttpRequest"})

print(response.json())
if (response.)
