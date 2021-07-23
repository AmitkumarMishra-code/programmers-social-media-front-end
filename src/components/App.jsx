import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from "react-router-dom"
import Feed from "./Feed"
import Login from "./Login"
import SignUp from "./SignUp"
import interceptors from "../interceptors"

export default function App(){
const history = useHistory()
interceptors(history)
    return (
        <Router>
            <Switch>
                <Route exact path = '/'>
                    <Redirect to = '/login' />
                </Route>
                <Route exact path = '/login'>
                    <Login/>
                </Route>
                <Route exact path = '/signup'>
                    <SignUp />
                </Route>
                <Route exact path = '/feed'>
                    <Feed/>
                </Route>
            </Switch>
        </Router>
    )
}