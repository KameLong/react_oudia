import {
    Box,
    Button,
    Table,
    useDisclosure,
} from "@chakra-ui/react";
import StationForm from "../components/StationForm";
import { useStore } from "../store/useStore";
import {TimeCell} from "../components/TimeCell";
import {IconButton} from "@chakra-ui/react";
import React from "react";

function EditIcon() {
    return null;
}

function DeleteIcon() {
    return null;
}

export default function StationList() {
    const stations = useStore((s) => s.stations);
    const add = useStore((s) => s.addStation);
    const update = useStore((s) => s.updateStation);
    const remove = useStore((s) => s.removeStation);
    const { open, onOpen, onClose } = useDisclosure();

    const editId= useStore((s) => s.editId);
    const setEditId = useStore((s) => s.setEditId);


    return (
        <Box>
            <Button
                // leftIcon={<AddIcon />}
                colorScheme="teal" onClick={() => { setEditId(null); onOpen(); }}
                >
                駅を追加
            </Button>




            <Table.Root  mt="4">
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeader>ID</Table.ColumnHeader>
                        <Table.ColumnHeader>駅名</Table.ColumnHeader>
                        <Table.ColumnHeader>操作</Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {stations.map((st) => (
                        <Table.Row key={st.id}>
                            <Table.Cell>{st.id}</Table.Cell>
                            <Table.Cell>{st.name}</Table.Cell>
                            <Table.Cell>
                                <IconButton
                                    aria-label="編集"
                                    size="sm"
                                    mr="2"
                                    onClick={() => { setEditId(st.id); onOpen(); }}
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton
                                    aria-label="削除"
                                    size="sm"
                                    onClick={() => remove(st.id)}
                                ><DeleteIcon />
                                </IconButton>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
            {/* モーダルフォーム */}
            <StationForm
                isOpen={open}
                onClose={onClose}
                onSubmit={(data:any) => {
                    if (editId == null) add(data);
                    else update({ id: editId, ...data });
                    onClose();
                }}
            />


        </Box>
    );
}