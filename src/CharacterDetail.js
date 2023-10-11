// src/CharacterDetail.js
import React from 'react';
import './App.css'
const CharacterDetail = ({ character }) => {
  return (
    <div className="character-details">
      <img
        src={`https://picsum.photos/150?random=${Math.random()}`}
        alt={character.name}
        height={200}
        
        style={{width:"200px"}}
        className="character-image"
      />
      <p>Name: {character.name}</p>
      <p>Height: {character.height} meters</p>
      <p>Mass: {character.mass} kg</p>
      <p>Date Added: {character.created}</p>
      <p>Number of Films: {character.films.length}</p>
      <p>Birth Year: {character.birth_year}</p>
      {/* Add homeworld details here */}
    </div>
  );
};

export default CharacterDetail;
