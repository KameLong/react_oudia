
import axios from "axios";
import {Station, StationInput} from "../models/station";

const BASE = "/api/stations";

/** 全駅取得 */
export async function fetchStations(): Promise<Station[]> {
    const res = await axios.get<Station[]>(BASE);
    return res.data;
}

/** 駅を作成 */
export async function createStation(input: StationInput): Promise<Station> {
    const res = await axios.post<Station>(BASE, input);
    return res.data;
}

/** 駅を更新 */
export async function updateStation(id: number, input: StationInput): Promise<Station> {
    const res = await axios.put<Station>(`${BASE}/${id}`, input);
    return res.data;
}

/** 駅を削除 */
export async function deleteStation(id: number): Promise<void> {
    await axios.delete(`${BASE}/${id}`);
}