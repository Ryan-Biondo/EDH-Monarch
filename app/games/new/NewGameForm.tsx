'use client';

import { Box, Button, Flex, Grid, Heading, TextField } from '@radix-ui/themes';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Select from 'react-select';
import { z } from 'zod';

interface Option {
  value: string;
  label: string;
}
interface FormData {
  players: {
    [key: string]: Option;
  };
  commanders: {
    [key: string]: Option;
  };
  gameDescriptor: Option;
  winner: Option;
}

// export const gameFormSchema = z.object({
//   players: z.array(z.string()).nonempty('At least one player is required.'),
//   commanders: z
//     .array(z.string())
//     .nonempty('At least one commander is required.'),
//   gameDescriptor: z.enum([
//     'QuickMatch',
//     'Marathon',
//     'Upset',
//     'CloseCall',
//     'Dominance',
//     'Chaos',
//   ]),
//   winner: z.string(),
// });
// type GameFormData = z.infer<typeof gameFormSchema>;

// interface SelectProps<Option = unknown> {
//   options: Option[];
//   value: Option;
//   onChange: (value: Option) => void;
// }

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

const NewGameForm = () => {
  const router = useRouter();
  const { control, handleSubmit, setValue, getValues, reset } =
    useForm<FormData>();

  const [playerCount, setPlayerCount] = useState(4);
  const addPlayer = () => setPlayerCount((prevCount) => prevCount + 1);
  const removePlayer = () => {
    if (playerCount > 1) {
      setPlayerCount((prevCount) => prevCount - 1);
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    // const result = gameFormSchema.safeParse(data);
    // if (!result.success) {
    //   console.error('Validation failed', result.error);
    //   return;
    // }

    // // Data is validated and can be used
    // const validData = result.data;

    console.log(data);
    const payload = {
      players: Object.values(data.players).map((player) => player.value),
      commanders: Object.values(data.commanders).map(
        (commander) => commander.value
      ),
      gameDescriptor: data.gameDescriptor.value,
      winner: data.winner.value,
    };

    try {
      console.log('Submitting game:', payload);
      await axios.post('/api/games', payload);
      console.log('Game created successfully');
      router.push('/games');
    } catch (error) {
      console.error('Error submitting game:', error);
    }
  });

  return (
    <form className="space-y-3" onSubmit={onSubmit}>
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

        {[...Array(playerCount)].map((_, index) => (
          <Grid key={index} columns="3" width="100%" gap="5" mb="6">
            <Controller
              name={`players.player${index + 1}`}
              control={control}
              render={({ field }) => (
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  placeholder="Add a Player..."
                  isClearable
                  options={playerOptions}
                  {...field}
                />
              )}
            />
            <Controller
              name={`commanders.commander${index + 1}`}
              control={control}
              render={({ field }) => <Select options={commanders} {...field} />}
            />

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
          type="button"
          disabled={playerCount <= 2}>
          Remove Player
        </Button>

        <Button
          size="3"
          onClick={addPlayer}
          type="button"
          disabled={playerCount >= 6}>
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
