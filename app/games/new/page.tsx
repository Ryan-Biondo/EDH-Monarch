'use client';

import { Box, Button, Flex, Grid, Heading } from '@radix-ui/themes';
import React, { useState } from 'react';
import GameDescriptorSelect from '../_components/GameDescriptorSelect';
import WinnerSelect from '../_components/WinnerSelect';
import PlayerInputs from '../_components/PlayerInputs';

const playerOptions = [
  { value: 'player1', label: 'Player 1' },
  { value: 'player2', label: 'Player 2' },
  { value: 'player3', label: 'Player 3' },
  { value: 'player4', label: 'Player 4' },
  // Add more player options as needed
];

const NewGamePage = () => {
  const [playerCount, setPlayerCount] = useState(4); // Start with 4 players
  const [gameDescriptor, setGameDescriptor] = useState('');
  const [winner, setWinner] = useState('');

  const addPlayer = () => setPlayerCount((prevCount) => prevCount + 1);
  const removePlayer = () =>
    setPlayerCount((prevCount) => Math.max(2, prevCount - 1));

  // In your NewGamePage component
  return (
    <div>
      <Box>
        <Flex gap="2" my="4" justify="center">
          <Heading as="h2" mb="2" size="4">
            New Game:
          </Heading>
        </Flex>
      </Box>
      <div
        style={{
          height: '420px',
        }}>
        <Heading as="h3" mb="2" size="3">
          Players:
        </Heading>
        <PlayerInputs
          playerCount={playerCount}
          playerOptions={playerOptions}
          onWinnerSelect={setWinner}
        />
      </div>

      <Flex gap="5" mb="6" mr="9" justify="end">
        <Button
          size="3"
          color="crimson"
          variant="soft"
          onClick={removePlayer}
          disabled={playerCount <= 2}>
          Remove Player
        </Button>
        <Button size="3" onClick={addPlayer} disabled={playerCount >= 6}>
          Add Player
        </Button>
      </Flex>

      <Box mb="6">
        <Heading as="h3" mb="2" size="3">
          Game Description:
        </Heading>
        <GameDescriptorSelect onValueChange={setGameDescriptor} />
      </Box>

      <Box mb="6">
        <Heading as="h3" mb="2" size="3">
          Winner:
        </Heading>
        <WinnerSelect
          playerOptions={playerOptions}
          playerCount={playerCount}
          onValueChange={setWinner}
        />
      </Box>

      <Flex gap="4" justify="end">
        <Button size="3" color="crimson" variant="soft">
          Cancel
        </Button>
        <Button size="3">Create</Button>
      </Flex>
    </div>
  );
};
export default NewGamePage;
