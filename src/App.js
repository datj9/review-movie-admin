import React, { Component } from "react";
import "./sass/mystyles.scss";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import SignInPage from "./pages/SignInPage";
import checkToken from "./utils/checkToken";
import { connect } from "react-redux";
import { setUser } from "./redux/user/actions";
import MoviePage from "./pages/MoviePage";

class App extends Component {
    authorize = (Page) => {
        const { currentUser } = this.props;
        if (currentUser.userType === "admin") {
            return (
                <>
                    <Header />
                    <Page />
                </>
            );
        }
        return <SignInPage />;
    };

    componentDidMount() {
        const { isValid, user } = checkToken();
        if (isValid) {
            this.props.setUser(user);
        }
    }
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/' render={() => this.authorize(MoviePage)} />
                </Switch>
            </Router>
        );
    }
}

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
    isAuthenticated: state.user.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
    setUser: (user) => dispatch(setUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
