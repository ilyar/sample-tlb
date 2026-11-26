import type { Cell } from '@ton/core';

/** Share */
export type Share = {
    /** share_v1#01 schema:Schema payload:Payload = Share; */
    kind: "Share";
    /** Schema */
    schema: Schema;
    /** Payload */
    payload: Payload;
};

/** Schema */
export type Schema = {
    /** text$01 data:^SnakeString = Schema; */
    kind: "Schema";
    /** ^SnakeString */
    data: string;
};

/** Payload */
export type Payload = {
    /** none$00 = Payload; */
    kind: "Payload_none";
} | {
    /** boc$01 value:Boc = Payload; */
    kind: "Payload_boc";
    /** Boc */
    value: Boc;
} | {
    /** data$10 value:Data = Payload; */
    kind: "Payload_data";
    /** Data */
    value: Data;
};

/** Boc */
export type Boc = {
    /** cell$01 data:^Cell = Boc; */
    kind: "Boc_cell";
    /** ^Cell */
    data: Cell;
} | {
    /** hex$10 data:^SnakeString = Boc; */
    kind: "Boc_hex";
    /** ^SnakeString */
    data: string;
};

/** Data */
export type Data = {
    /** json$01 data:^SnakeString = Data; */
    kind: "Data";
    /** ^SnakeString */
    data: string;
};
