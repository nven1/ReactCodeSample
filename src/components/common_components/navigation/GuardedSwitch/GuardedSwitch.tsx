import React from "react"
import { useSelector } from "react-redux"
import { selectIsAdmin, selectMe } from "../../../../reducers/UserReducer"
import { Switch, Route, Redirect } from "react-router"

export interface RedirectProps {
    url: string
    to: string
}

interface GuardedSwitchProps {
    // when landed on base url, redirect to something
    redirectTo?: RedirectProps
}

const GuardedSwitch: React.FC<GuardedSwitchProps> = (props) => {
    const isAdmin = useSelector(selectIsAdmin)
    const me = useSelector(selectMe)

    return (
        <>
            {me && isAdmin !== undefined && (
                <Switch>
                    {props.redirectTo && (
                        <Route exact path={props.redirectTo.url}>
                            <Redirect to={`${props.redirectTo.url}/${props.redirectTo.to}`} />
                        </Route>
                    )}
                    {props.children}
                </Switch>
            )}
        </>
    )
}
export default GuardedSwitch
