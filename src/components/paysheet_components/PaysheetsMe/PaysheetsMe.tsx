import React, { useEffect } from "react"
import styles from "./PaysheetsMe.module.scss"
import { useDispatch, useSelector } from "react-redux"
import PaysheetsDataAccess from "../../../data_access/PaysheetsDataAccess"
import { selectMyPaysheets } from "../../../reducers/PaysheetsReducer"
import UserPaysheets from "../UserPaysheets/UserPaysheets"

interface PaysheetsMeProps {}

const PaysheetsMe: React.FC<PaysheetsMeProps> = (props) => {
    const dispatch = useDispatch()

    const paysheets = useSelector(selectMyPaysheets)

    useEffect(() => {
        PaysheetsDataAccess.getMyPaysheets(dispatch)()

        // eslint-disable-next-line
    }, [])

    return (
        <div className={styles.container}>
            <UserPaysheets paysheets={paysheets} me />
        </div>
    )
}
export default PaysheetsMe
