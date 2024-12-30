import { PieChart, Pie, Cell, Tooltip } from "recharts";
import "../assets/css/Results.css";

const Results = () => {
  const data = [
    { name: "Oui", value: 55 },
    { name: "Non", value: 35 },
    { name: "Je ne sais pas", value: 10 },
  ];

  const COLORS = ["#028958", "#4BC7A5", "#A5E3CE"];

  return (
    <div className="results-container">
      <h1>Voici les résultats de votre scrutin :</h1>
      <h2>Nom du scrutin</h2>
      <p>
        Visualisez les résultats de votre scrutin et découvrez ce que vos participants ont partagé.
      </p>

      <div className="results-content">
        <div className="chart-container">
          <PieChart width={400} height={400}>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        <div className="info-container">
          <p>
            <strong>Type de scrutin :</strong> Vote de Condorcet
          </p>
          <p>
            <strong>Nombre de participants :</strong> 100
          </p>
          <p>
            <strong>Question posée :</strong> Voulez-vous adopter ce changement ?
          </p>
          <ul className="legend">
            {data.map((entry, index) => (
              <li key={index} style={{ color: COLORS[index] }}>
                {entry.value}% {entry.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Results;
