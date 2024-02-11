'use client';

import { Box, Button, Flex, Grid, Heading } from '@radix-ui/themes';
import React, { useEffect, useState } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Select from 'react-select';

interface Option {
  value: string;
  label: string;
}
interface FormData {
  playerCommanderPairs: { player: Option; commander: Option }[];
  gameDescriptor: Option;
  winner: Option;
}

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
const commanders = [
  { value: 'commander1', label: 'Arcanis, the Omnipotent' },
  { value: 'commander2', label: 'Krenko, Mob Boss' },
  { value: 'commander3', label: 'Niv-Mizzet, Parun' },
  { value: 'commander4', label: 'Nicol Bolas, the Ravager' },
  { value: 'commander5', label: 'Karn, Silver Golem' },
  { value: 'commander6', label: 'Teysa Karlov' },
];
const initialPair = {
  player: { value: '', label: '' },
  commander: { value: '', label: '' },
};

const NewGameForm = () => {
  const router = useRouter();
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      playerCommanderPairs: Array(4).fill(initialPair),
      gameDescriptor: { value: '', label: '' },
      winner: { value: '', label: '' },
    },
  });
  const onSubmit = async (data: FormData) => {
    console.log(data);
    const payload = {
      players: data.playerCommanderPairs.map((pair) => pair.player.value),
      commanders: data.playerCommanderPairs.map((pair) => pair.commander.value),
      gameDescriptor: data.gameDescriptor.value,
      winner: data.winner.value,
    };

    try {
      await axios.post('/api/games', payload);
      router.push('/games');
    } catch (error) {
      console.error('Error submitting game:', error);
    }
  };

  const [pairs, setPairs] = useState(Array(4).fill(initialPair));

  const addPair = () => setPairs((pairs) => [...pairs, initialPair]);
  const removePair = () => setPairs((pairs) => pairs.slice(0, -1));

  // Reset form with updated pairs, gameDescriptor, and winner
  const updateForm = () => {
    reset({
      playerCommanderPairs: pairs,
      gameDescriptor: { value: '', label: '' },
      winner: { value: '', label: '' },
    });
  };
  // Invoke updateForm whenever pairs change to ensure form reflects the state
  useEffect(() => {
    updateForm();
  }, [pairs]);

  return (
    <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
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
        {pairs.map((_, index) => (
          <Grid key={index} columns="3" width="100%" gap="5" mb="6">
            {/* Player field */}
            <Controller
              name={`playerCommanderPairs.${index}.player`}
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={playerOptions}
                  placeholder="Select a Player..."
                />
              )}
            />
            {/* Commander field, currently assuming single commander setup */}
            <Controller
              name={`playerCommanderPairs.${index}.commander`}
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={commanders}
                  placeholder="Select a Commander..."
                />
              )}
            />

            {/* Placeholder for the commander image */}
            <Box>Image {index + 1}</Box>
          </Grid>
        ))}
      </div>

      <Flex gap="5" mb="6" mr="9" justify="center">
        <Button size="3" type="button" onClick={addPair}>
          Add Player
        </Button>
        <Button
          size="3"
          variant="soft"
          type="button"
          onClick={removePair}
          disabled={pairs.length <= 2}>
          Remove Player
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
            <Select options={gameDescriptors} {...field} />
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
          render={({ field }) => <Select options={playerOptions} {...field} />}
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

export default NewGameForm;
