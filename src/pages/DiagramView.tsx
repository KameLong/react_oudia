import { Box, Text } from "@chakra-ui/react";
import { useStore } from "../store/useStore";

export default function DiagramView() {
    const stations = useStore((s) => s.stations);
    const timetable = useStore((s) => s.timetable);

    // Canvas／SVG で描画する例
    return (
        <Box
            position="relative"
            w="100%"
            h="600px"
            border="1px"
            borderColor="gray.200"
            overflow="auto"
        >
            <svg width={2000} height={stations.length * 50 + 50}>
                {/* 時刻軸（上部） */}
                {[...Array(25)].map((_, i) => (
                    <Text
                        key={i}
                        // x={i * 80 + 50}
                        // y={15}
                        fontSize="12"
                    >{`${i}:00`}</Text>
                ))}

                {/* 駅名（左） */}
                {stations.map((st, idx) => (
                    <Text key={st.id}
                          // x={10} y={50 + idx * 50}
                          fontSize="12">
                        {st.name}
                    </Text>
                ))}

                {/* ランニングライン */}
                {timetable.map((run, ridx) =>
                    stations.map((st, sidx, arr) => {
                        const t = run.times[st.id];
                        if (!t) return null;
                        const [hh, mm] = t.split(":").map(Number);
                        const x = 50 + hh * 80 + (mm / 60) * 80;
                        const y = 50 + sidx * 50;
                        // 次の駅まで線を引く
                        const next = arr[sidx + 1];
                        if (!next) return null;
                        const tn = run.times[next.id];
                        if (!tn) return null;
                        const [h2, m2] = tn.split(":").map(Number);
                        const x2 = 50 + h2 * 80 + (m2 / 60) * 80;
                        const y2 = 50 + (sidx + 1) * 50;
                        return (
                            <line
                                key={`${run.id}-${st.id}`}
                                x1={x}
                                y1={y}
                                x2={x2}
                                y2={y2}
                                stroke="steelblue"
                                strokeWidth={2}
                            />
                        );
                    })
                )}
            </svg>
        </Box>
    );
}