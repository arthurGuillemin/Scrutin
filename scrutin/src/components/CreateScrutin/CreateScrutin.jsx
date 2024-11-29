import React, { useState } from "react";
import "./CreateScrutin.css";

function CreateScrutin() {
  const [title, setTitle] = useState("");
  const [scrutinType, setScrutinType] = useState("");
  const [description, setDescription] = useState("");
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState(["", ""]);

  const addAnswer = () => {
    setAnswers([...answers, ""]);
  };

  const handleAnswerChange = (index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      title,
      scrutinType,
      description,
      question,
      answers,
    });
    alert("Scrutin enregistré !");
  };

  return (
    <div className="create-scrutin-container">
      <h1>Créer votre scrutin</h1>
      <p>
        Donnez vie à vos idées en quelques étapes simples ! Remplissez les
        informations ci-dessous pour démarrer votre scrutin.
      </p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Titre du scrutin"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <select
          value={scrutinType}
          onChange={(e) => setScrutinType(e.target.value)}
          required
        >
          <option value="" disabled>
            Type de scrutin
          </option>
          <option value="Condorcet">Vote de Condorcet</option>
          <option value="Majoritaire">Vote Majoritaire</option>
          <option value="Prioritaire">Vote Prioritaire</option>
        </select>

        <textarea
          placeholder="Description du scrutin"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={200}
        ></textarea>
        <p>{description.length}/200</p>

        <input
          type="text"
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />

        {answers.map((answer, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Réponse ${index + 1}`}
            value={answer}
            onChange={(e) => handleAnswerChange(index, e.target.value)}
            required
          />
        ))}

        <button
          type="button"
          onClick={addAnswer}
          className="add-answer-button"
        >
          + Ajouter une réponse
        </button>

        <button type="submit" className="submit-button">
          Enregistrer le scrutin
        </button>
      </form>
    </div>
  );
}

export default CreateScrutin;
