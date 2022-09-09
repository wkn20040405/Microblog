import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
//Switch是一个唯一匹配
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
//path ="/:id"这里是参数传递
//Route 将组件和address相联系
function Main(props) {
    //login
    //case1: already logged in => Home
    //case2: hasn't logged in => Login
    const { isLoggedIn, handleLoggedIn } = props;

    const showLogin = () => {
        return isLoggedIn ? (
            <Redirect to="/home" />
        ) : (
            <Login handleLoggedIn={handleLoggedIn} />
            //不光是组件的跳转，还得是路径（路由）的跳转，相当于执行下面的Route-Render操作
        );
    };

    const showHome = () => {
        return isLoggedIn ? <Home /> : <Redirect to="/login" />;
    };
    return (
        <div className="main">
            <Switch>
                <Route path="/" exact render={showLogin} />
                <Route path="/login" render={showLogin} />
                <Route path="/register" component={Register} />
                <Route path="/home" render={showHome} />
            </Switch>
        </div>
    );
}
//Redirect 和Link 区别：redirect没法回退到之前的地址，相当于清空stack，这里是redirect

export default Main;