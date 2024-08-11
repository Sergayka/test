from pymongo import *
import json


client = MongoClient('localhost', 27017)

db = client['faculty.db']

collection = db['faculty']

  
with open('db_info.json', 'r', encoding = 'utf-8') as file:
  data = json.load(file)
  faculty = data['faculty']



collection.insert_many(faculty)

print('Данные введены')