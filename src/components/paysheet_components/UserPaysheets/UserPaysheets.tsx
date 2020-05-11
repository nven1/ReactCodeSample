import React, { useEffect, useState } from "react"
import styles from "./UserPaysheets.module.scss"
import Card from "../../common_components/containers/Card/Card"
import Title from "../../common_components/text/Title/Title"
import { PaysheetType } from "../paysheets.mock"
import { monthNames } from "../../../utils/dateHelpers"
import TextButton from "../../common_components/buttons/TextButton/TextButton"
import Button from "../../common_components/buttons/Button/Button"
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
    const [selected, setSelected] = useState<string | undefined>()

    useEffect(() => {
        const years = Array.from(new Set(props.paysheets.map((ps) => ps.year))).sort()

        setYears(years)
        setMonths(sortPaychecks(props.paysheets))
        // eslint-disable-next-line
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

    const handleSetSelected = (month: string) => () => {
        if (selected !== month) {
            setSelected(month)
        } else {
            setSelected(undefined)
        }
    }

    const renderMonths = () => {
        if (months) {
            return Object.keys(months).map((month) => {
                console.log(months[month])
                console.log(month)

                return (
                    <div className={styles.accordion}>
                        <TextButton key={month} size="normal" color="purple" onClick={handleSetSelected(month)}>
                            {month}
                        </TextButton>
                        {month === selected && (
                            <div className={styles.accordionChildrenContainer}>
                                {months[month].map((item: PaysheetType) => {
                                    return (
                                        <div className={styles.accordionChild}>
                                            <TextButton color="purple">{`${month} - ${item.type}`}</TextButton>
                                            <Button color="red" size="small">
                                                Add
                                            </Button>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                )
            })
        }
    }

    return (
        <div className={styles.container}>
            <Card variation="dynamic">
                <Title>My Paysheets</Title>
                <div className={styles.months}>{renderMonths()}</div>
            </Card>
        </div>
    )
}
export default UserPaysheets
