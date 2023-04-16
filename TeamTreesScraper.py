import requests 
import time
from bs4 import BeautifulSoup
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Use a service account.
cred = credentials.Certificate('./tree-clicker-c0637cfebe46.json')

app = firebase_admin.initialize_app(cred)

db = firestore.client()

TTLog = db.collection(u'TTLog')

url = "https://teamtrees.org/"

response = requests.get((url))

parsed = BeautifulSoup(response.text, "html.parser")

donos = parsed.find(class_="max-w-screen-sm w-full mx-auto")

donoList = []
for dono in donos.find_all(class_="w-full bg-white shadow rounded-md relative mt-4 flex flex-row", limit=10):
    donoDic = {}

    #appends the username
    donoDic[u'user'] = dono.find(class_="text-spruce font-black text-lg").get_text()
    #appends the number of trees
    donoDic[u'trees'] = (dono.find(class_="mt-0 md:mt-4 bg-lightMoss rounded-full text-white text-bold px-4 relative badge").get_text().split(" ")[0])
    #appends the timestamp
    donoDic[u'timestamp'] = (dono.find(class_="text-center text-xs mt-2 opacity-50 feed-datetime").get_text())

    user = donoDic[u'user']
    query = TTLog.where(u'user', u'==', user)
    trees = donoDic[u'trees']
    query = query.where(u'trees',u'==', trees)
    timestamp = donoDic[u'timestamp']
    query = query.where(u'timestamp',u'==',timestamp)
    if len(query.get()) == 0:
        TTLog.add(donoDic)

    donoList.append(donoDic)
