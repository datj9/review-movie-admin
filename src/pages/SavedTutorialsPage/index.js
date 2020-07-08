import React from "react";
import "./style.css";
import { connect } from "react-redux";
import { getSavedTutorials } from "../../redux/tutorials/actions";
import TutorialsList from "../../components/TutorialsList";

class SavedTutorialsPage extends React.Component {
    state = {};

    componentDidMount() {
        this.props.getSavedTutorialsReq();
    }

    render() {
        const { loaded, tutorials } = this.props;
        return (
            <div className='container py-5'>
                <h1 className='title mb-3 d-block'>Bài hướng dẫn đã lưu</h1>
                <hr />
                {loaded && tutorials.length === 0 ? (
                    <div className='text-center h4'>Chưa có bài hướng dẫn nào được lưu</div>
                ) : (
                    <TutorialsList pageSize={4} />
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    tutorials: state.tutorial.tutorials,
    loaded: state.tutorial.loaded,
});

const mapDispatchToProps = (dispatch) => ({
    getSavedTutorialsReq: () => dispatch(getSavedTutorials()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SavedTutorialsPage);
