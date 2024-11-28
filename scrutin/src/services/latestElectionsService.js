async function fetchLatestElections() {
    const response = await fetch('http://localhost:5000/api/elections/recent')
    if (!response.ok) {
        console.error("Erreur lors de la recuperation des scrutin récents");
        
    }else{
        const data = response.json();
        return data;
    }
}


export default fetchLatestElections();