from pymongo import *
import db_index

client = MongoClient('localhost', 27017)

db_index = client['faculty.db']

collection = db_index['faculty']

documents = collection.find()

for document in documents:
  print(document)