import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    const getAllRepositories = async () => {
      const result = await api.get("/repositories");
      console.log(result);
      setRepositories(result.data);
    };
    getAllRepositories();
  }, []);

  async function handleAddRepository() {
    const repository = await api.post("/repositories", {
      url: "https://github.com/Rocketseat/umbriel",
      title: `Desafio ReactJS - ${repositories.length}`,
      techs: ["Node", "Express", "TypeScript"],
    });
    setRepositories([...repositories, repository.data]);
  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`);
    const newRepositories = [...repositories];
    const repositoryIndex = repositories.findIndex(
      (repository) => repository.id === id
    );
    newRepositories.splice(repositoryIndex, 1);
    setRepositories(newRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories &&
          repositories.map((repository) => (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
