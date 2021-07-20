import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Feed from "./Feed"
import Login from "./Login"
import SignUp from "./SignUp"

export default function App(){
    return (
        <Router>
            <Switch>
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