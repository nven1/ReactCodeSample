import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../app/store"

export interface PaysheetType {
    id: number
    userId: number
    year: number
    month: number
    type: "PAYCHECK" | "BONUS"
}

export interface PaysheetsState {
    all: Array<PaysheetType>
    my: Array<PaysheetType>
}

const initialState: PaysheetsState = {
    all: [],
    my: [],
}

export const slice = createSlice({
    name: "paysheets",
    initialState,
    reducers: {
        getAllPaysheetsAction: (state, action: PayloadAction<Array<PaysheetType>>) => {
            state.all = action.payload
        },
        getMyPaysheetsAction: (state, action: PayloadAction<Array<PaysheetType>>) => {
            state.my = action.payload
        },
    },
})

export const { getAllPaysheetsAction, getMyPaysheetsAction } = slice.actions

export const selectAllPaysheets = (state: RootState) => state.paysheets.all
export const selectMyPaysheets = (state: RootState) => state.paysheets.my

export default slice.reducer
