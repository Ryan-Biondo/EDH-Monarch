'use client';

import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Select,
  TextField,
} from '@radix-ui/themes';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

const playerOptions = [
  { value: 'player1', label: 'Player 1' },
  { value: 'player2', label: 'Player 2' },
  { value: 'player3', label: 'Player 3' },
  { value: 'player4', label: 'Player 4' },
  { value: 'player5', label: 'Player 5' },
  { value: 'player6', label: 'Player 6' },
];
const gameDescriptors = [
  { value: 'QuickMatch', label: 'Quick Match' },
  { value: 'Marathon', label: 'Marathon' },
  { value: 'Upset', label: 'Upset' },
  { value: 'CloseCall', label: 'Close Call' },
  { value: 'Dominance', label: 'Dominance' },
  { value: 'Chaos', label: 'Chaos' },
];

const NewGamePage = () => {
  const { register, control, handleSubmit } = useForm();

  const [playerCount, setPlayerCount] = useState(4);
  const [gameDescriptor, setGameDescriptor] = useState('');
  const [winner, setWinner] = useState('');

  const addPlayer = () => setPlayerCount((prevCount) => prevCount + 1);
  const removePlayer = () =>
    setPlayerCount((prevCount) => Math.max(2, prevCount - 1));

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
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

        {Array.from({ length: playerCount }, (_, index) => (
          <Grid key={index} columns="3" width="100%" gap="5" mb="6">
            <Controller
              name={`player [${index}]`}
              control={control}
              render={({ field }) => (
                <Select.Root onValueChange={setWinner}>
                  <Select.Trigger
                    placeholder={`Player ${index + 1} Selection`}
                  />
                  <Select.Content>
                    {playerOptions.map((option) => (
                      <Select.Item
                        {...field}
                        key={option.value}
                        value={option.value}>
                        {option.label}
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Root>
              )}
            />

            <TextField.Root>
              <TextField.Input
                placeholder={`Commander ${index + 1}`}
                {...register('Commander')}
              />
            </TextField.Root>

            {/* Placeholder for the commander image */}
            <Box>Image {index + 1}</Box>
          </Grid>
        ))}
      </div>

      <Flex gap="5" mb="6" mr="9" justify="center">
        <Button
          size="3"
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

        <Controller
          name="gameDescriptor"
          control={control}
          render={({ field }) => (
            <Select.Root onValueChange={setGameDescriptor}>
              <Select.Trigger placeholder="Game Descriptor Selection" />
              <Select.Content>
                {gameDescriptors.map((descriptor) => (
                  <Select.Item
                    {...field}
                    key={descriptor.value}
                    value={descriptor.value}>
                    {descriptor.label}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          )}
        />
      </Box>

      <Box mb="6">
        <Heading as="h3" mb="2" size="3">
          Winner:
        </Heading>
        <Controller
          name="winner"
          control={control}
          render={({ field }) => (
            <Select.Root onValueChange={setWinner}>
              <Select.Trigger placeholder="Winner Selection" />
              <Select.Content>
                {playerOptions.slice(0, playerCount).map((option) => (
                  <Select.Item
                    {...field}
                    key={option.value}
                    value={option.value}>
                    {option.label}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          )}
        />
      </Box>

      <Flex gap="4" justify="end">
        <Button size="3" color="gray" variant="soft">
          Cancel
        </Button>
        <Button type="submit" size="3">
          Create
        </Button>
      </Flex>
    </form>
  );
};

export default NewGamePage;
