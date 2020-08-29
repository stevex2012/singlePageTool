//路由管理页面
import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    hashHistory
} from "react-router-dom";
import Index from './pages/Index';//首页
import Create from './pages/Create';//创建页面
import Preview from './pages/Preview';//创建页面
function AppRouter() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Index />
                </Route>
                <Route path="/create/:id">
                    <Create />
                </Route>
                <Route path="/preview">
                    <Preview/>
                </Route>
            </Switch>
        </Router>
    )
}

export default AppRouter;