import requests
import time
from bs4 import BeautifulSoup

url = "https://teamtrees.org/"

response = requests.get((url))

parsed = BeautifulSoup(response.text, "html.parser")

recentDonos = parsed.find(class_="max-w-screen-sm w-full mx-auto").find_all(class_="w-full bg-white shadow  rounded-md relative mt-4 flex flex-row ", limit=10)

print(recentDonos)