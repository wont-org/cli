import React from 'react'
import ReactDOM from 'react-dom'
import { 
    HashRouter as Router,
    Route,
    Switch,
    Link,
} from 'react-router-dom'
import { routeConfig } from './router/index'

import './styles/normalize.less'
import style from './main.module.less'

ReactDOM.render(
    <div className={style.container}>
        <Router>
            <div className={style.mb10}>
                <Link to="/home">Home</Link>
                <Link to="/about" className={style.ml10}>About</Link>
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
