import { Select } from '@radix-ui/themes';

interface WinnerSelectProps {
  playerOptions: { value: string; label: string }[];
  playerCount: number;
  onValueChange: (value: string) => void;
}

const WinnerSelect = ({
  playerOptions,
  playerCount,
  onValueChange,
}: WinnerSelectProps) => (
  <Select.Root onValueChange={onValueChange}>
    <Select.Trigger placeholder="Winner Selection" />
    <Select.Content>
      {playerOptions.slice(0, playerCount).map((option) => (
        <Select.Item key={option.value} value={option.value}>
          {option.label}
        </Select.Item>
      ))}
    </Select.Content>
  </Select.Root>
);

export default WinnerSelect;
