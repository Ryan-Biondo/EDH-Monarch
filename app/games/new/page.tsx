'use client';

import { Button, Flex, Select, TextField } from '@radix-ui/themes';
import React, { useState } from 'react';

const playerOptions = [
  { value: 'player1', label: 'Player 1' },
  { value: 'player2', label: 'Player 2' },
  { value: 'player3', label: 'Player 3' },
  { value: 'player4', label: 'Player 4' },
];

const NewGamePage = () => {
  const [playerCount, setPlayerCount] = useState(4); // Start with 4 players

  // Function to add a player
  const addPlayer = () => setPlayerCount(playerCount + 1);

  // Function to remove a player
  const removePlayer = () => setPlayerCount(playerCount - 1); // Ensure the button disables at minimum player count to prevent going below 2

  // Generate player inputs based on playerCount
  const playerInputs = Array.from({ length: playerCount }, (_, index) => (
    <form key={index}>
      <Flex className="mb-2" gap="2">
        <Select.Root>
          <Select.Trigger placeholder={`Player ${index + 1}`} />
          <Select.Content>
            {playerOptions.map((option) => (
              <Select.Item key={option.value} value={option.value}>
                {option.label}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>

        <TextField.Root>
          <TextField.Input placeholder={`Commander ${index + 1}`} />
        </TextField.Root>
      </Flex>
    </form>
  ));

  return (
    <div className="max-w-xl">
      {playerInputs}
      <Flex gap="2">
        <Button onClick={addPlayer}>Add Player</Button>
        <Button onClick={removePlayer} disabled={playerCount <= 2}>
          Remove Player
        </Button>
      </Flex>
      {/* Placeholder for Winner and Game Description fields */}
    </div>
  );
};

export default NewGamePage;
