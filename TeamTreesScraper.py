import requests 
import time
from bs4 import BeautifulSoup

url = "https://teamtrees.org/"

response = requests.get((url))

donoDic = {}

parsed = BeautifulSoup(response.text, "html.parser")

for i in range(10):
    if i == 0:
        continue
    treeTimestamp = []
    dono = parsed.find(class_="max-w-screen-sm w-full mx-auto").contents[i]
    treeTimestamp.append(dono.find(class_="mt-0 md:mt-4 bg-lightMoss rounded-full text-white text-bold px-4 relative badge").get_text())
    treeTimestamp.append(dono.find(class_="text-center text-xs mt-2 opacity-50 feed-datetime").get_text())

    donoDic[dono.find(class_="text-spruce font-black text-lg")] = treeTimestamp

print(donoDic)
