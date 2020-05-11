import React from "react"
import { RouteProps, Route } from "react-router"

interface IfRouteProps extends RouteProps {
    if: boolean
}

const IfRoute: React.FC<IfRouteProps> = (props) => {
    return props.if ? <Route {...props} /> : <>You are not authorized to see this page</>
}
export default IfRoute
