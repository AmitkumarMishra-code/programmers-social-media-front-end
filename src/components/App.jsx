import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Login from "./Login"

export default function App(){
    return (
        <Router>
            <Switch>
                <Route exact path = '/login'>
                    <Login/>
                </Route>
            </Switch>
        </Router>
    )
}