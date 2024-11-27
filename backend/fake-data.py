import datetime
from pymongo import MongoClient
import random

# Connexion à MongoDB
client = MongoClient("mongodb+srv://aguillemin291:erleiuhOoKl8uYbk@cluster0.vsgyr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client["Scrutin"]  # Base de données 'scrutin'
elections_collection = db["elections"]
users_collection = db["users"]  # Nouvelle collection pour les utilisateurs

# Fonction pour convertir datetime.date en datetime.datetime
def convert_date_to_datetime(data):
    """Convertit les objets datetime.date en datetime.datetime."""
    if isinstance(data, datetime.date):
        return datetime.datetime.combine(data, datetime.time(0, 0, 0))  # Convertir datetime.date en datetime.datetime
    return data

# Fonction pour générer des utilisateurs factices et les insérer dans la collection
def generate_and_insert_users():
    # Liste des utilisateurs avec des dates de naissance et des emails
    users = [
        {"name": "Alice", "birthdate": datetime.date(1956, 4, 6), "email": "alice@example.com"},
        {"name": "Bob", "birthdate": datetime.date(1980, 11, 21), "email": "bob@example.com"},
        {"name": "Charlie", "birthdate": datetime.date(1992, 7, 14), "email": "charlie@example.com"},
        {"name": "David", "birthdate": datetime.date(2001, 2, 3), "email": "david@example.com"},
        {"name": "Eve", "birthdate": datetime.date(1995, 5, 16), "email": "eve@example.com"}
    ]
    
    # Convertir les dates de naissance en datetime
    for user in users:
        user['birthdate'] = convert_date_to_datetime(user['birthdate'])

    # Insérer les utilisateurs dans la collection 'users'
    users_collection.insert_many(users)
    print(f"{len(users)} utilisateurs ont été insérés dans la collection 'users'.")

    # Retourner la liste d'utilisateurs
    return users

# Fonction pour générer des élections factices et les insérer dans la collection
def generate_and_insert_elections(users):
    elections = [
        {"title": "Élection présidentielle 2024", "date": datetime.date(2024, 5, 15), "status": "active", "votes": []},
        {"title": "Élection législative 2024", "date": datetime.date(2024, 6, 10), "status": "upcoming", "votes": []},
        {"title": "Élection municipale 2025", "date": datetime.date(2025, 3, 20), "status": "upcoming", "votes": []}
    ]
    
    # Convertir les dates d'élection en datetime
    for election in elections:
        election['date'] = convert_date_to_datetime(election['date'])

    # Insérer les élections dans la collection 'elections'
    result = elections_collection.insert_many(elections)
    print(f"{len(elections)} élections ont été insérées dans la collection 'elections'.")

    # Récupérer les élections insérées avec leurs _id générés
    elections_with_ids = list(elections_collection.find({"_id": {"$in": [e["_id"] for e in elections]}}))

    # Générer des votes factices pour chaque élection
    generate_votes(users, elections_with_ids)

# Fonction pour générer des votes factices et les ajouter directement dans la collection 'elections'
def generate_votes(users, elections):
    for election in elections:
        if election["status"] == "active":
            for user in users:
                vote = {
                    "user_id": user["email"],  # Utiliser l'email comme identifiant pour l'utilisateur
                    "vote_value": random.choice([1, 2, 3]),  # Exemple de vote : 1, 2 ou 3
                    "timestamp": datetime.datetime.now()
                }
                # Ajouter le vote dans le tableau 'votes' de l'élection
                elections_collection.update_one(
                    {"_id": election["_id"]},
                    {"$push": {"votes": vote}}  # Ajouter le vote dans le tableau 'votes'
                )
    
    print(f"Des votes ont été insérés dans {len(elections)} élections actives !")

# Appeler les fonctions pour insérer les données
if __name__ == "__main__":
    generate_and_insert_users()  # Insérer les utilisateurs
