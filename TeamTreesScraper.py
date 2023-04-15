import requests 
import time
from bs4 import BeautifulSoup

url = "https://teamtrees.org/"

response = requests.get((url))

donoDic = {}

parsed = BeautifulSoup(response.text, "html.parser")

donos = parsed.find(class_="max-w-screen-sm w-full mx-auto")

first = True

for dono in donos.find_all(class_="w-full bg-white shadow rounded-md relative mt-4 flex flex-row", limit=2):
    if first:
        first = False
        continue
    treeTimestamp = []

    print(dono.find(class_="text-spruce font-black text-lg"))

    donoDic[dono.find(class_="text-spruce font-black text-lg").get_text()] = treeTimestamp

print(donoDic)
