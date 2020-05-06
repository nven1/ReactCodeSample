import React, { useEffect, useState } from "react"
import styles from "./UserPaysheets.module.scss"
import Card from "../../common_components/containers/Card/Card"
import Title from "../../common_components/text/Title/Title"
import { PaysheetType } from "../paysheets.mock"
import { monthNames } from "../../../utils/dateHelpers"
import TextButton from "../../common_components/buttons/TextButton/TextButton"
/* import { useParams } from "react-router"
import { useSelector } from "react-redux"
import { selectIsAdmin } from "../../../reducers/UserReducer" */

interface UserPaysheetsProps {
    paysheets: Array<PaysheetType>
    me?: boolean
}

const UserPaysheets: React.FC<UserPaysheetsProps> = (props) => {
    const [years, setYears] = useState<Array<number>>([])
    const [months, setMonths] = useState<any>()

    useEffect(() => {
        const years = Array.from(new Set(props.paysheets.map((ps) => ps.year))).sort()

        setYears(years)
        setMonths(sortPaychecks(props.paysheets))
    }, [props])

    const createGroupName = (paysheet: PaysheetType) => {
        return `${monthNames[paysheet.month]}, ${paysheet.year}`
    }

    const sortPaychecks = (paysheets: Array<PaysheetType>) => {
        return paysheets.reduce((final: any, pay: PaysheetType) => {
            final[createGroupName(pay)] = final[createGroupName(pay)] ?? []
            final[createGroupName(pay)].push(pay)
            return final
        }, {})
    }

    const renderMonths = () => {
        if (months) {
            return Object.keys(months).map((month) => {
                return (
                    <TextButton key={month} color="purple" onClick={() => alert(months[month][0].type)}>
                        {month}
                    </TextButton>
                )
            })
        }
    }

    return (
        <div className={styles.container}>
            <Card variation="dynamic">
                <Title>My Paysheets</Title>
                {renderMonths()}
            </Card>
        </div>
    )
}
export default UserPaysheets
