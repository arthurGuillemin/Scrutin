from flask import Flask, jsonify
from pymongo import MongoClient

app = Flask(__name__)

client = MongoClient("mongodb+srv://aguillemin291:erleiuhOoKl8uYbk@cluster0.vsgyr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")  # Remplacez par l'URL de votre MongoDB si nécessaire
db = client["Scrutin"]  
candidates_collection = db["candidates"] 
votes_collection = db["votes"]


@app.route('/api/latestVotes', methods=['GET'])
def get_latestVotes():
    """
    recuperer les derniers votes
    """
    latestVotes = list(votes_collection.find({}))
    return jsonify (latestVotes)


@app.route('/candidates', methods=['GET'])
def get_candidates():
    candidates = list(candidates_collection.find({})) 
    return jsonify(candidates)

if __name__ == "__main__":
    app.run(debug=True)
