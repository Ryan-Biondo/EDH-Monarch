import { Box, Flex, Grid, Select, TextField } from '@radix-ui/themes';

interface PlayerOption {
  value: string;
  label: string;
}

interface PlayerInputsProps {
  playerCount: number;
  playerOptions: PlayerOption[];
  onWinnerSelect: (value: string) => void;
}

const PlayerInputs = ({
  playerCount,
  playerOptions,
  onWinnerSelect,
}: PlayerInputsProps) => {
  return (
    <>
      {Array.from({ length: playerCount }, (_, index) => (
        <Grid key={index} columns="3" width="100%" gap="5" mb="6">
          <Select.Root onValueChange={onWinnerSelect}>
            <Select.Trigger placeholder={`Player ${index + 1} Selection`} />
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

          {/* Placeholder for the commander image */}
          <Box>Image {index + 1}</Box>
        </Grid>
      ))}
    </>
  );
};

export default PlayerInputs;
