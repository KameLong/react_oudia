/** 駅データの基本型 */
export interface Station {
    /** ユニーク ID（DB 連番や UUID） */
    id: number;
    /** 駅名 */
    name: string;
    /** 路線上での並び順（描画時の Y 座標算出に） */
    order: number;
    /** 始点からの距離 (km) などがあれば… */
    distanceKm?: number;
    /** 駅コード（オプション） */
    code?: string;
}

/** 駅作成・更新 API に渡すペイロード型 */
export interface StationInput {
    name: string;
    order: number;
    distanceKm?: number;
    code?: string;
}