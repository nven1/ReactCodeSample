import React, { useEffect, useState } from "react"
import styles from "./UserPaysheets.module.scss"
import Card from "../../common_components/containers/Card/Card"
import { monthNames } from "../../../utils/dateHelpers"
import TextButton from "../../common_components/buttons/TextButton/TextButton"
import Button from "../../common_components/buttons/Button/Button"
import { useParams, useHistory } from "react-router"
import { goTo } from "../../../utils/navHelpers"
import Endpoints from "../../../environments/endpoints"
import Subtitle from "../../common_components/text/Subtitle/Subtitle"
import { PaysheetType } from "../../../reducers/PaysheetsReducer"
import moment from "moment"
import PaysheetsDataAccess from "../../../data_access/PaysheetsDataAccess"
import { useDispatch } from "react-redux"

interface UserPaysheetsProps {
    paysheets: Array<PaysheetType>
    title?: string
    me?: boolean
}

const lastMonthTime = moment().subtract(1, "month")
const lastMonth = moment(lastMonthTime).month()
const lastYear = moment(lastMonthTime).year()
const lastMonthName = `${monthNames[lastMonth]}, ${lastYear}`

const UserPaysheets: React.FC<UserPaysheetsProps> = (props) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { id } = useParams()

    const [months, setMonths] = useState<any>()
    const [containsLastMonth, setContainsLastMonth] = useState<boolean>()
    const [selected, setSelected] = useState<string | undefined>()

    useEffect(() => {
        setMonths(sortPaychecks(props.paysheets))

        if (selected) {
            setSelected(undefined)
        }

        // eslint-disable-next-line
    }, [props])

    useEffect(() => {
        if (months) {
            const containsLastMonthCheck = !!Object.keys(months).filter((month) => {
                if (month === lastMonthName) {
                    return months[month].filter((paysheet: PaysheetType) => paysheet.type === "PAYCHECK")
                }
                return false
            }).length

            setContainsLastMonth(containsLastMonthCheck)
        }

        // eslint-disable-next-line
    }, [months])

    const handleCLose = () => {
        history.push(goTo(Endpoints.appEndpoints.paysheets, "manage"))
    }

    const createGroupName = (paysheet: PaysheetType) => {
        return `${monthNames[paysheet.month]}, ${paysheet.year}`
    }

    const sortPaychecks = (paysheets: Array<PaysheetType>) => {
        return paysheets.reduce((final: any, pay: PaysheetType) => {
            const groupName = createGroupName(pay)
            if (!final[groupName]) {
                final[groupName] = []
            }
            final[groupName].push(pay)
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

    const handleOpenPdf = (paysheetId: number) => () => {
        PaysheetsDataAccess.downloadPDF(dispatch)(paysheetId)
    }

    const handleAdd = (monthName: string) => () => {
        const monthData = months[monthName]
        if (monthData === undefined) {
            console.log("ayy")

            const emptyData: PaysheetType = {
                id: 0,
                month: lastMonth,
                year: lastYear,
                type: "PAYCHECK",
                userId: Number(id),
            }
            history.push(goTo(Endpoints.appEndpoints.paysheets, "add", id ?? ""), [emptyData] as Array<PaysheetType>)
        } else {
            history.push(goTo(Endpoints.appEndpoints.paysheets, "add", id ?? ""), monthData as Array<PaysheetType>)
        }
    }

    const renderMonthList = () => {
        if (months) {
            const existingMonths = Object.keys(months).map((month, index) => {
                return (
                    <React.Fragment key={index}>
                        {renderMonthTitle(month)}
                        {renderMonthChildren(month)}
                    </React.Fragment>
                )
            })
            if (props.me) {
                return existingMonths
            }
            return containsLastMonth ? existingMonths : [renderMonthTitle(lastMonthName, true), ...existingMonths]
        }
    }

    const renderMonthTitle = (monthName: string, empty?: boolean) => {
        return (
            <div key={monthName} className={styles.monthTitle}>
                <TextButton size="normal" color={empty ? "red" : "purple"} onClick={handleSetSelected(monthName)}>
                    {monthName}
                </TextButton>
                {!props.me && (
                    <Button color={empty ? "red" : "purple"} size="small" onClick={handleAdd(monthName)}>
                        Add
                    </Button>
                )}
            </div>
        )
    }

    const renderMonthChildren = (month: string) => {
        if (month === selected) {
            return (
                <div className={styles.accordionChildrenContainer}>
                    {months[month].map((item: PaysheetType) => {
                        return renderMonthPaysheet(item, month)
                    })}
                </div>
            )
        }
    }

    const renderMonthPaysheet = (paysheet: PaysheetType, monthName: string) => {
        return (
            <div key={paysheet.id} className={styles.accordionChild}>
                <TextButton
                    color="purple"
                    onClick={handleOpenPdf(paysheet.id)}
                >{`${monthName} - ${paysheet.type}`}</TextButton>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <Card>
                <Subtitle onClose={props.me ? undefined : handleCLose}>
                    {props.me ? "My Paysheets" : props.title ?? "Paysheets"}
                </Subtitle>
                <div className={styles.months}>{renderMonthList()}</div>
            </Card>
        </div>
    )
}
export default UserPaysheets
