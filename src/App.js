import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Modal, Button } from 'react-bootstrap';
import CharacterDetail from './CharacterDetail';
import './App.css'
const App = () => {
  const [characters, setCharacters] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const charactersPerPage = 6; // Number of characters to display per page

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get(`https://swapi.dev/api/people/?page=${currentPage}`);
        setCharacters(response.data.results);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };

    fetchCharacters();
  }, [currentPage]);

  const openModal = (character) => {
    setSelectedCharacter(character);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // Handle pagination
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  return (
    // <h1>Hello</h1>
    <div className="app-container">
      <h1 className="app-title">Star Wars Characters</h1>
      <div className="character-list">
        {console.log(characters)}
        {characters?.map((character) => (
          <Card
            key={character?.name}
            className="character-card"
            onClick={() => openModal(character)}
          >
            <Card.Img
              src={`https://picsum.photos/200?random=${Math.random()}`}
              alt={character?.name}
            />
            <Card.Body>
              <Card.Title>{character?.name}</Card.Title>
              <Card.Text>Species: Human</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
      <div className="pagination">
        <Button
          variant="primary"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="page-number">{currentPage}</span>
        <Button
          variant="primary"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </Button>
      </div>
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title className="modal-title">
            {selectedCharacter?.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CharacterDetail character={selectedCharacter} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default App;
