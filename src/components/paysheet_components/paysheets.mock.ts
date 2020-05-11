export interface PaysheetType {
    id: number
    userId: number
    year: number
    month: number
    type: "SALARY" | "BONUS"
}

export const mockPaysheets: Array<PaysheetType> = [
    {
        id: 1,
        userId: 1,
        year: 2020,
        month: 0,
        type: "SALARY",
    },
    {
        id: 2,
        userId: 1,
        year: 2020,
        month: 0,
        type: "BONUS",
    },
    {
        id: 3,
        userId: 1,
        year: 2019,
        month: 1,
        type: "SALARY",
    },
    {
        id: 4,
        userId: 2,
        year: 2020,
        month: 0,
        type: "SALARY",
    },
    {
        id: 5,
        userId: 3,
        year: 2020,
        month: 0,
        type: "SALARY",
    },
    {
        id: 6,
        userId: 1,
        year: 2019,
        month: 5,
        type: "SALARY",
    },
    {
        id: 7,
        userId: 1,
        year: 2020,
        month: 6,
        type: "SALARY",
    },
    {
        id: 8,
        userId: 1,
        year: 2020,
        month: 7,
        type: "SALARY",
    },
]
