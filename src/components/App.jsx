
import React, { useEffect, useState } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

const API_URL = "http://localhost:3001/toys";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  // Get all toys when the app first loads
  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setToys(data))
      .catch((error) => console.error(error));
  }, []);

  function handleClick() {
    setShowForm((current) => !current);
  }

  // Add a newly created toy to the page
  function handleAddToy(newToy) {
    setToys((currentToys) => [...currentToys, newToy]);
  }

  // Remove a donated toy from the page
  function handleDeleteToy(id) {
    setToys((currentToys) =>
      currentToys.filter((toy) => toy.id !== id)
    );
  }

  // Update a toy without changing its position
  function handleUpdateToy(updatedToy) {
    setToys((currentToys) =>
      currentToys.map((toy) =>
        toy.id === updatedToy.id ? updatedToy : toy
      )
    );
  }

  return (
    <>
      <Header />

      {showForm ? <ToyForm onAddToy={handleAddToy} /> : null}

      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>

      <ToyContainer
        toys={toys}
        onDeleteToy={handleDeleteToy}
        onUpdateToy={handleUpdateToy}
      />
    </>
  );
}

export default App;
