import requests
import time
from bs4 import BeautifulSoup

url = "https://teamtrees.org/"

response = requests.get((url))

parsed = BeautifulSoup(response.text, "lxml")

print(parsed.find(class_="max-w-screen-sm w-full mx-auto").find_all(class_=)
