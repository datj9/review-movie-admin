import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import "highlight.js/styles/atom-one-dark-reasonable.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import AdminPage from "./pages/AdminPage";
import CreateTutorialPage from "./pages/CreateTutorialPage";
import checkToken from "./utils/checkToken";
import { connect } from "react-redux";
import { setUser } from "./redux/user/actions";
import TutorialPage from "./pages/TutorialPage";
import UpdateTutorialPage from "./pages/UpdateTutorialPage";
import TrackingUser from "./pages/TrackingUser";
import CreateMentor from "./pages/CreateMentor";

class App extends Component {
    authorize = (Page) => {
        const { currentUser } = this.props;
        if (currentUser.userType === "admin") {
            return <Page />;
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
                <Header />
                <Switch>
                    <Route exact path='/' render={() => this.authorize(AdminPage)} />
                    <Route exact path='/sign-up' component={SignUpPage} />
                    <Route exact path='/create-tutorial' render={() => this.authorize(CreateTutorialPage)} />
                    <Route
                        exact
                        path='/update-tutorial/:tutorialId'
                        render={() => this.authorize(UpdateTutorialPage)}
                    />
                    <Route exact path='/create-mentor' component={CreateMentor} />
                    <Route exact path='/tracking-users' render={() => this.authorize(TrackingUser)} />
                    <Route exact path='/tutorials/:tutorialId' component={TutorialPage} />
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
