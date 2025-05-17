import {
    Box,
    Table,
    Input,
    Button,
} from "@chakra-ui/react";

// Thead, Tr, Th, Tbody, Td,
import { useStore } from "../store/useStore";
import { TimeCell } from "../components/TimeCell";

export default function TimetableEditor() {
    const stations = useStore((s) => s.stations);
    const timetable = useStore((s) => s.timetable);
    const updateTime = useStore((s) => s.updateTime);

    return (
        <Box overflowX="auto">
            <Table.Root  size="sm">
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeader>列車ID</Table.ColumnHeader>
                        {stations.map((st) => (
                            <Table.ColumnHeader key={st.id}>{st.name}</Table.ColumnHeader>
                        ))}
                        <Table.ColumnHeader></Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {timetable.map((run) => (
                        <Table.Row key={run.id}>
                            <Table.Cell>{run.id}</Table.Cell>
                            {stations.map((st) => (
                                <Table.Cell key={st.id}>
                                    <TimeCell
                                        value={run.times[st.id]}
                                        onChange={(t) => updateTime(run.id, st.id, t)}
                                    />
                                </Table.Cell>
                            ))}
                            <Table.Cell>
                                <Button size="xs" onClick={() => {/* 削除処理 */}}>
                                    削除
                                </Button>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>

        </Box>
    );
}