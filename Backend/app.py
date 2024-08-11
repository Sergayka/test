from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient, errors
from pymongo import *

app = Flask(__name__)
CORS(app)  

try:
    client = MongoClient('mongodb://localhost:27017', serverSelectionTimeoutMS=5000)
    db = client['Careermatch']
    collection_faculties_kfMGTU = db['kfMGTU']
    collection_universities = db['universities']
    collection_faculties_KSU = db['KSU']
except errors.ServerSelectionTimeoutError as e:
    print("Ошибка подключения к MongoDB:", e)
    exit()
    
@app.route('/api/universities', methods=['GET'])
def get_all_universities():
    try:
        universities = list(collection_universities.find({}, {'_id': 0}))
        return jsonify(universities)
    except Exception as e:
        print("Ошибка при получении данных:", e)
        return jsonify({'error': 'Ошибка при получении данных'}), 500

@app.route('/faculties_kfmgtu', methods=['GET'])
def get_all_faculties_kfMGTU():
    try:
        faculties = list(collection_faculties_kfMGTU.find({}, {'_id': 0}))
        return jsonify(faculties)
    except Exception as e:
        print("Ошибка при получении данных:", e)
        return jsonify({'error': 'Ошибка при получении данных'}), 500

@app.route('/faculties_ksu', methods=['GET'])
def get_all_faculties_KSU():
    try:
        faculties = list(collection_faculties_KSU.find({}, {'_id': 0}))
        return jsonify(faculties)
    except Exception as e:
        print("Ошибка при получении данных:", e)
        return jsonify({'error': 'Ошибка при получении данных'}), 500
    

@app.route('/collectionOnName', methods = ['GET'])
def get_all_collectionsName():
    name = request.args.get('nameColl')
    print(name)
    db_coll = db[name]
    try:
        names = list(db_coll.find({}, {'_id': 0}))
        return jsonify(names)
    except Exception as e:
        print("Ошибка при получении данных:", e)
        return jsonify({'error': 'Ошибка при получении данных'}), 500

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)