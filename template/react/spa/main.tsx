import React from 'react'
import ReactDOM from 'react-dom'
import { 
    BrowserRouter as Router,
    Route,
    Switch,
    Link,
} from 'react-router-dom'
import { routeConfig } from './router/index'

import './styles/normalize.less'
import './main.less'

ReactDOM.render(
    <div className="container">
        <Router>
            <div>
                <Link to="/">Home</Link>
                <Link to="/about" className="ml10">About</Link>
            </div>
            <Switch>
                {routeConfig.map((route, key) => {
                    return (
                        <Route
                            key={key}
                            path={route.path}
                            render={(props) => {
                                return (
                                    <route.component
                                        {...props}
                                        children={route.children}
                                    />
                                )
                            }}
                        />
                    )
                })}
            </Switch>
        </Router>
    </div>,
    document.getElementById('root')
)
