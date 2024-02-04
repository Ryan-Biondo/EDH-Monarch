import { Select } from '@radix-ui/themes';

interface GameDescriptorSelectProps {
  onValueChange: (value: string) => void;
}

const gameDescriptors = [
  { value: 'QuickMatch', label: 'Quick Match' },
  { value: 'Marathon', label: 'Marathon' },
  { value: 'Upset', label: 'Upset' },
  { value: 'CloseCall', label: 'Close Call' },
  { value: 'Dominance', label: 'Dominance' },
  { value: 'Chaos', label: 'Chaos' },
  // Add more descriptors as per your enum
];

const GameDescriptorSelect = ({ onValueChange }: GameDescriptorSelectProps) => (
  <Select.Root onValueChange={onValueChange}>
    <Select.Trigger placeholder="Game Descriptor Selection" />
    <Select.Content>
      {gameDescriptors.map((descriptor) => (
        <Select.Item key={descriptor.value} value={descriptor.value}>
          {descriptor.label}
        </Select.Item>
      ))}
    </Select.Content>
  </Select.Root>
);

export default GameDescriptorSelect;
