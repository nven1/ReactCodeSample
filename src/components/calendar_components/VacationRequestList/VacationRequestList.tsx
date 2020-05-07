import React from "react"
import styles from "./VacationRequestList.module.scss"
import Card from "../../common_components/containers/Card/Card"
import Title from "../../common_components/text/Title/Title"
import { useHistory } from "react-router"
import { goTo } from "../../../utils/navHelpers"
import Endpoints from "../../../environments/endpoints"
import Button from "../../common_components/buttons/Button/Button"
import { VacationRequestReviewType } from "../../../types/CalendarTypes"
import Item from "../../common_components/text/Item/Item"

interface VacationRequestListProps {
    requests: Array<VacationRequestReviewType>
}

const VacationRequestList: React.FC<VacationRequestListProps> = (props) => {
    const history = useHistory()

    const handleClick = (id: number) => () => {
        history.push(goTo(Endpoints.appEndpoints.calendar, "manage", id.toString()))
    }

    const list = props.requests.map((request) => {
        return (
            <Item label={request.title} bold>
                <Button color="purple" size="small" onClick={handleClick(request.id)}>
                    Review
                </Button>
            </Item>
        )
    })

    return (
        <div className={styles.container}>
            <Card>
                <Title>Requests</Title>
                <div className={styles.content}>{list}</div>
            </Card>
        </div>
    )
}
export default VacationRequestList
