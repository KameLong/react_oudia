// components/TimeCell.tsx
import { Input } from "@chakra-ui/react";

export function TimeCell({
                             value,
                             onChange,
                         }: {
    value: string; // "08:15" など
    onChange: (val: string) => void;
}) {
    return (
        <Input
            size="xs"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            pattern="\d{2}:\d{2}"
        />
    );
}