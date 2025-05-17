/**
 * ある列車の、各駅における発着時刻を表すマッピング
 * key: Station.id, value: "HH:mm" フォーマットの時刻文字列
 */
export type TimeMap = Record<number, string>;

/** １本分の時刻表（ランニングライン） */
export interface TimetableRun {
    /** ユニーク ID（DB 連番や UUID） */
    id: number;
    /** 列車名称（オプション／表示用） */
    name?: string;
    /** 種別（"普通" | "快速" | "特急" など） */
    type?: string;
    /** 各駅の発着時刻マップ */
    times: TimeMap;
    /** 線の色（ダイヤグラム表示用） */
    color?: string;
}

/** 新規作成・更新用のペイロード型（ID を除外） */
export interface TimetableInput {
    name?: string;
    type?: string;
    times: TimeMap;
    color?: string;
}