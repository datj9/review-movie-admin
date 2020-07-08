import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { fetchOneTutorial, clearTutorial } from "../../redux/tutorials/actions";
import { Button } from "shards-react";
import parse from "html-react-parser";
import moment from "moment";
import ContentLoader from "react-content-loader";
import { Link } from "react-router-dom";
import { saveTutorial, clearErrors } from "../../redux/user/actions";

class TutorialPage extends Component {
    handleSaveTutorial = () => {
        this.props.savedTutorialReq(this.props.tutorial.id);
    };

    componentDidMount() {
        const { tutorialId } = this.props.match.params;
        this.props.getTutorialReq(tutorialId);
        document.body.scrollTop = 0;
    }

    componentWillUnmount() {
        this.props.clearTutorialReq();
        this.props.clearUserStore();
    }

    render() {
        const { tutorial, currentUser, isLoading, isSaving, isAuthenticated, message } = this.props;

        const Loader = () => {
            return (
                <ContentLoader style={{ width: "100%" }} viewBox='0 0 300 250'>
                    <rect x='0' y='0' rx='5' ry='5' width='200' height='12' />
                    <rect x='0' y='20' rx='4' ry='4' width='30' height='8' />
                    <rect x='270' y='20' rx='3' ry='3' width='30' height='15' />
                    <rect x='0' y='32' rx='4' ry='4' width='50' height='8' />
                    <rect x='0' y='45' rx='3' ry='3' width='200' height='6' />
                    <rect x='0' y='55' rx='3' ry='3' width='200' height='6' />
                    <rect x='0' y='65' rx='3' ry='3' width='200' height='6' />
                    <rect x='0' y='75' rx='3' ry='3' width='200' height='6' />
                    <rect x='0' y='85' rx='3' ry='3' width='200' height='6' />
                    <rect x='0' y='95' rx='3' ry='3' width='200' height='6' />
                    <rect x='0' y='105' rx='3' ry='3' width='200' height='6' />
                </ContentLoader>
            );
        };

        const SaveTutorialButton = () => {
            const { savedTutorials } = currentUser;

            if (savedTutorials && savedTutorials.includes(tutorial.id) && !message.includes("success")) {
                return null;
            } else if (isAuthenticated && !message.includes("success")) {
                return (
                    <Button disabled={isSaving} onClick={this.handleSaveTutorial}>
                        {isSaving ? "Đang Lưu Bài.." : " Lưu Bài"}
                    </Button>
                );
            } else if (isAuthenticated && message.includes("success")) {
                return (
                    <Button disabled theme='success'>
                        Đã Lưu Thành Công
                    </Button>
                );
            } else {
                return (
                    <Link to={`/sign-in?tutorialId=${tutorial.id}`}>
                        <Button>Lưu Bài</Button>
                    </Link>
                );
            }
        };

        return (
            <div className='container mt-5'>
                {isLoading ? (
                    <Loader />
                ) : (
                    <Fragment>
                        <h3 className='mb-3'>{tutorial.title}</h3>
                        <div className='mb-3 d-flex justify-content-between'>
                            <div className='d-flex flex-column flex-start'>
                                <span>Lượt xem: {tutorial.views}</span>
                                <span>Đăng tải vào: {moment(tutorial.createdAt).format("DD-MM-YYYY")}</span>
                            </div>
                            <SaveTutorialButton />
                        </div>
                        <div className='mt-5'>{parse(tutorial.content || "")}</div>
                    </Fragment>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    tutorial: state.tutorial.tutorial,
    currentUser: state.user.currentUser,
    isAuthenticated: state.user.isAuthenticated,
    isLoading: state.tutorial.isLoading,
    isSaving: state.user.isLoading,
    message: state.user.message,
});

const mapDispatchToProps = (dispatch) => ({
    getTutorialReq: (tutorialId) => dispatch(fetchOneTutorial(tutorialId)),
    clearTutorialReq: () => dispatch(clearTutorial()),
    savedTutorialReq: (tutorialId) => dispatch(saveTutorial(tutorialId)),
    clearUserStore: () => dispatch(clearErrors()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TutorialPage);
