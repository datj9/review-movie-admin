import React from "react";
import "./style.css";
import { connect } from "react-redux";
import { fetchTutorials } from "../../redux/tutorials/actions";
import TutorialsList from "../../components/TutorialsList";

class SavedTutorialsPage extends React.Component {
    state = {};

    componentDidMount() {
        this.props.fetchTutorialsReq();
    }

    render() {
        return (
            <div className='container py-5'>
                <h1 className='title mb-3 d-block'>Bài hướng dẫn đã lưu</h1>
                <hr />
                <TutorialsList />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    tutorials: state.tutorial.tutorials,
});

const mapDispatchToProps = (dispatch) => ({
    fetchTutorialsReq: () => dispatch(fetchTutorials()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SavedTutorialsPage);
