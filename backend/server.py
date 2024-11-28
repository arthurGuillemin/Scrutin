from flask import Flask, jsonify, request
from pymongo import MongoClient
from bson import ObjectId
import datetime

client = MongoClient("mongodb://localhost:27017/")
db = client["condo"]
elections_collection = db["elections"]
users_collection = db["users"]

app = Flask(__name__)


#   Gestion des utilisateurs      #


# Récupérer la liste des utilisateurs
@app.route('/api/users', methods=['GET'])
def get_users():
    users = list(users_collection.find())
    for user in users:
        user['_id'] = str(user['_id'])
    return jsonify(users)

# Ajouter un nouvel utilisateur
@app.route('/api/users', methods=['POST'])
def add_user():
    user_data = request.json
    if not user_data.get("name") or not user_data.get("email"):
        return jsonify({"error": "Les champs 'name' et 'email' sont obligatoires"}), 400
    result = users_collection.insert_one(user_data)
    return jsonify({"message": "Utilisateur ajouté avec succès", "id": str(result.inserted_id)}), 201

# Récupérer les détails d’un utilisateur spécifique
@app.route('/api/users/<user_id>', methods=['GET'])
def get_user(user_id):
    try:
        user = users_collection.find_one({"_id": ObjectId(user_id)})
        if user:
            user['_id'] = str(user['_id'])
            return jsonify(user)
        return jsonify({"error": "Utilisateur non trouvé"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Mettre à jour les informations d’un utilisateur
@app.route('/api/users/<user_id>', methods=['PUT'])
def update_user(user_id):
    user_data = request.json
    result = users_collection.update_one({"_id": ObjectId(user_id)}, {"$set": user_data})
    if result.matched_count > 0:
        return jsonify({"message": "Utilisateur mis à jour avec succès"})
    return jsonify({"error": "Utilisateur non trouvé"}), 404

# Supprimer un utilisateur
@app.route('/api/users/<user_id>', methods=['DELETE'])
def delete_user(user_id):
    result = users_collection.delete_one({"_id": ObjectId(user_id)})
    if result.deleted_count > 0:
        return jsonify({"message": "Utilisateur supprimé avec succès"})
    return jsonify({"error": "Utilisateur non trouvé"}), 404



#      Gestion des Scrutins     #



# Récupérer la liste de tous les scrutins
@app.route('/api/elections', methods=['GET'])
def get_elections():
    elections = list(elections_collection.find())
    for election in elections:
        election['_id'] = str(election['_id'])
    return jsonify(elections)

# Ajouter un nouveau scrutin
@app.route('/api/elections', methods=['POST'])
def add_election():
    election_data = request.json
    if not all(key in election_data for key in ("title", "status", "creation_date", "ending_date")):
        return jsonify({"error": "Les données de l'élection sont incomplètes"}), 400
    election_data["creation_date"] = datetime.datetime.strptime(election_data["creation_date"], "%Y-%m-%d")
    election_data["ending_date"] = datetime.datetime.strptime(election_data["ending_date"], "%Y-%m-%d")
    election_data["votes"] = []
    result = elections_collection.insert_one(election_data)
    return jsonify({"message": "Élection ajoutée avec succès", "id": str(result.inserted_id)}), 201

# Récupérer les détails d’un scrutin spécifique
@app.route('/api/elections/<election_id>', methods=['GET'])
def get_election(election_id):
    try:
        election = elections_collection.find_one({"_id": ObjectId(election_id)})
        if election:
            election['_id'] = str(election['_id'])
            return jsonify(election)
        return jsonify({"error": "Scrutin non trouvé"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Mettre à jour les informations d’un scrutin
@app.route('/api/elections/<election_id>', methods=['PUT'])
def update_election(election_id):
    election_data = request.json
    result = elections_collection.update_one({"_id": ObjectId(election_id)}, {"$set": election_data})
    if result.matched_count > 0:
        return jsonify({"message": "Scrutin mis à jour avec succès"})
    return jsonify({"error": "Scrutin non trouvé"}), 404

# Supprimer un scrutin
@app.route('/api/elections/<election_id>', methods=['DELETE'])
def delete_election(election_id):
    result = elections_collection.delete_one({"_id": ObjectId(election_id)})
    if result.deleted_count > 0:
        return jsonify({"message": "Scrutin supprimé avec succès"})
    return jsonify({"error": "Scrutin non trouvé"}), 404



#        Gestion des votes        #


# Récupérer tous les votes d'un scrutin
@app.route('/api/elections/<election_id>/votes', methods=['GET'])
def get_votes(election_id):
    try:
        election = elections_collection.find_one({"_id": ObjectId(election_id)})
        if election:
            return jsonify(election.get('votes', []))
        return jsonify({"error": "Scrutin non trouvé"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Ajouter un vote pour un scrutin
@app.route('/api/elections/<election_id>/votes', methods=['POST'])
def add_vote(election_id):
    vote_data = request.json
    try:
        result = elections_collection.update_one(
            {"_id": ObjectId(election_id)},
            {"$push": {"votes": vote_data}}
        )
        if result.matched_count > 0:
            return jsonify({"message": "Vote ajouté avec succès"})
        return jsonify({"error": "Scrutin non trouvé"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Récupérer les détails d’un vote 
@app.route('/api/elections/<election_id>/votes/<vote_id>', methods=['GET'])
def get_vote(election_id, vote_id):
    try:
        election = elections_collection.find_one({"_id": ObjectId(election_id)})
        if election:
            vote = next((v for v in election.get('votes', []) if v.get('_id') == vote_id), None)
            if vote:
                return jsonify(vote)
            return jsonify({"error": "Vote non trouvé"}), 404
        return jsonify({"error": "Scrutin non trouvé"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Supprimer un vote 
@app.route('/api/elections/<election_id>/votes/<vote_id>', methods=['DELETE'])
def delete_vote(election_id, vote_id):
    try:
        result = elections_collection.update_one(
            {"_id": ObjectId(election_id)},
            {"$pull": {"votes": {"_id": vote_id}}}
        )
        if result.matched_count > 0:
            return jsonify({"message": "Vote supprimé avec succès"})
        return jsonify({"error": "Scrutin non trouvé ou vote introuvable"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 400

















if __name__ == "__main__":
    app.run(debug=True)
