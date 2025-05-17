import {create} from "zustand";
import {Station} from "../models/station";
import {TimetableRun} from "../models/timetable";

type State = {
    stations: Station[];
    timetable: TimetableRun[];


    editId: number | null;
    setEditId: (id: number | null) => void;

    addStation: (data: Omit<Station, "id">) => void;
    updateStation: (st: Station) => void;
    removeStation: (id: number) => void;
    updateTime: (runId: number, stationId: number, time: string) => void;
};

export const useStore = create<State>((set) => ({

    stations: [],
    timetable: [],

    editId: null,

    // --- setters for editId ---
    setEditId: (id) => set({ editId: id }),

    addStation: (data) =>
        set((s) => ({
            stations: [...s.stations, { id: Date.now(), ...data }],
        })),
    updateStation: (st) =>
        set((s) => ({
            stations: s.stations.map((x) => (x.id === st.id ? st : x)),
        })),
    removeStation: (id) =>
        set((s) => ({
            stations: s.stations.filter((x) => x.id !== id),
        })),
    updateTime: (runId, stationId, time) =>
        set((s) => ({
            timetable: s.timetable.map((run) =>
                run.id === runId
                    ? {
                        ...run,
                        times: { ...run.times, [stationId]: time },
                    }
                    : run
            ),
        })),
}));