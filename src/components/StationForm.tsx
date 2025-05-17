// src/components/StationForm.tsx
import React, { useEffect, useState } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
} from '@chakra-ui/modal'


import { useStore } from "../store/useStore";
import type { StationInput } from "../models/station";
import {FormControl, FormLabel} from "@chakra-ui/form-control";
import {Button, Input} from "@chakra-ui/react";
import {NumberInput, NumberInputField} from "@chakra-ui/number-input";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: StationInput) => void;
};

export default function StationForm({ isOpen, onClose, onSubmit }: Props) {
    const editId = useStore((s) => s.editId);
    const stations = useStore((s) => s.stations);

    const [name, setName] = useState("");
    const [order, setOrder] = useState(1);

    // モーダルオープン時に初期値をセット
    useEffect(() => {
        if (!isOpen) return;

        if (editId != null) {
            // 編集モード：対象駅データを探してセット
            const st = stations.find((s) => s.id === editId);
            setName(st?.name || "");
            setOrder(st?.order ?? 1);
        } else {
            // 新規モード：order は最後尾＋1 をデフォルト
            const maxOrder = stations.length
                ? Math.max(...stations.map((s) => s.order))
                : 0;
            setName("");
            setOrder(maxOrder + 1);
        }
    }, [isOpen, editId, stations]);

    const handleSubmit = () => {
        onSubmit({ name: name.trim(), order });
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{editId == null ? "駅を追加" : "駅を編集"}</ModalHeader>
                <ModalBody>
                    <FormControl mb={4} isRequired>
                        <FormLabel>駅名</FormLabel>
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="例：東京"
                        />
                    </FormControl>
                    <FormControl mb={4} isRequired>
                        <FormLabel>表示順（order）</FormLabel>
                        <NumberInput
                            value={order}
                            min={1}
                            onChange={(_, val) => setOrder(val)}
                        >
                            <NumberInputField />
                        </NumberInput>
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button variant="ghost" mr={3} onClick={onClose}>
                        キャンセル
                    </Button>
                    <Button
                        colorScheme="teal"
                        onClick={handleSubmit}
                        // isDisabled={!name.trim()}
                    >
                        {editId == null ? "追加" : "更新"}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}