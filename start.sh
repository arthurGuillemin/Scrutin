
echo "Démarrage du serveur Flask..."
cd backend
flask --app server run &

echo "Démarrage de l'application React..."
cd ../scrutin
npm run dev
