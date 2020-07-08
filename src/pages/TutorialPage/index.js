import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchOneTutorial, clearTutorial } from "../../redux/tutorials/actions";
import { Button } from "shards-react";
import parse from "html-react-parser";
import moment from "moment";
import ContentLoader from "react-content-loader";

class TutorialPage extends Component {
    componentDidMount() {
        const { tutorialId } = this.props.match.params;
        this.props.getTutorialReq(tutorialId);
    }

    componentWillUnmount() {
        this.props.clearTutorialReq();
    }

    render() {
        const { tutorial, currentUser, isLoading } = this.props;

        const Loader = () => {
            return (
                <ContentLoader style={{ width: "100%" }} viewBox='0 0 300 250'>
                    <rect x='0' y='0' rx='5' ry='5' width='200' height='12' />
                    <rect x='0' y='20' rx='4' ry='4' width='30' height='8' />
                    <rect x='200' y='20' rx='3' ry='3' width='70' height='8' />
                    <rect x='0' y='32' rx='4' ry='4' width='30' height='8' />
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
            if ((savedTutorials && savedTutorials.includes(tutorial.id)) || Object.keys(tutorial).length === 0) {
                return null;
            }
            return <Button>Lưu Bài</Button>;
        };

        return (
            <div className='container mt-5'>
                {isLoading ? (
                    <Loader />
                ) : (
                    <>
                        <h3 className='mb-3'>{tutorial.title}</h3>
                        <div className='mb-3 d-flex justify-content-between'>
                            <div className='d-flex flex-column flex-start'>
                                <span>Lượt xem: {tutorial.views}</span>
                                <span>Đăng tải vào: {moment(tutorial.createdAt).format("DD-MM-YYYY")}</span>
                            </div>
                            <SaveTutorialButton />
                        </div>
                        <div className='mt-5'>{parse(tutorial.content || "")}</div>
                    </>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    tutorial: state.tutorial.tutorial,
    currentUser: state.user.currentUser,
    isLoading: state.tutorial.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
    getTutorialReq: (id) => dispatch(fetchOneTutorial(id)),
    clearTutorialReq: () => dispatch(clearTutorial()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TutorialPage);
