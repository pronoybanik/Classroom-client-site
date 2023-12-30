import React from 'react';

const generateAndLog = () => {
  // Generate a random 6-digit number
  const randomNumber = Math.floor(Math.random() * 900000) + 100000;

  // Generate a random capital letter word
  const randomWord = generateRandomWord();

  // Combine the number and word
  const combinedString = `${randomNumber}${randomWord}`;

  // Log the combined string
  console.log(combinedString);
};

// Helper function to generate a random capital letter word
const generateRandomWord = () => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let word = '';
  for (let i = 0; i < 5; i++) {
    word += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  }
  return word;
};

const GenerateAndLog  = () => {
  return (
    <div>
      <button onClick={generateAndLog}>Generate and Log</button>
    </div>
  );
};

export default GenerateAndLog ;
