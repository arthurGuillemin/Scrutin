from flask import Flask, jsonify, request
from pymongo import MongoClient
import datetime

client = MongoClient("mongodb+srv://aguillemin291:erleiuhOoKl8uYbk@cluster0.vsgyr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client["Scrutin"]
elections_collection = db["elections"]
users_collection = db["users"]

app = Flask(__name__)


#Routes GET

@app.route('/api/users', methods=['GET'])
def get_users():
    users = list(users_collection.find())
    for user in users:
        user['_id'] = str(user['_id'])
    return jsonify(users)

@app.route('/api/elections/<election_id>', methods=['GET'])
def get_election(election_id):
    election = elections_collection.find_one({"_id": election_id})
    if election:
        election['_id'] = str(election['_id'])
        return jsonify(election)
    return jsonify({"error": "Élection non trouvée"}), 404

@app.route('/api/elections', methods=['GET'])
def get_elections():
    elections = list(elections_collection.find())
    for election in elections:
        election['_id'] = str(election['_id'])
    return jsonify(elections)

@app.route('/api/elections/<election_id>/votes', methods=['GET'])
def get_votes(election_id):
    election = elections_collection.find_one({"_id": election_id})
    if election:
        return jsonify(election['votes'])
    return jsonify({"error": "Élection non trouvée"}), 404




#Routes POST

@app.route('/api/elections/<election_id>/vote', methods=['POST'])
def add_vote(election_id):
    vote_data = request.json
    vote = {
        "user_id": vote_data.get("user_id"),
        "vote_value": vote_data.get("vote_value"),
        "timestamp": datetime.datetime.now()
    }
    result = elections_collection.update_one(
        {"_id": election_id},
        {"$push": {"votes": vote}}
    )
    if result.modified_count > 0:
        return jsonify({"message": "Vote ajouté avec succès"}), 200
    return jsonify({"error": "Élection non trouvée ou vote déjà ajouté"}), 400

@app.route('/api/elections', methods=['POST'])
def add_election():
    election_data = request.json
    election = {
        "title": election_data["title"],
        "date": datetime.datetime.strptime(election_data["date"], "%Y-%m-%d"),
        "status": election_data["status"],
        "votes": []
    }
    result = elections_collection.insert_one(election)
    return jsonify({"message": "Élection ajoutée avec succès", "id": str(result.inserted_id)}), 201

if __name__ == "__main__":
    app.run(debug=True)
