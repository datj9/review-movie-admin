import React from "react";
import "./style.css";
import { connect } from "react-redux";
import { fetchTutorials } from "../../redux/tutorials/actions";
import TutorialsList from "../../components/TutorialsList";

class HomePage extends React.Component {
    componentDidMount() {
        this.props.fetchTutorialsReq();
    }

    render() {
        return (
            <div className='container py-5'>
                <div className='title text-dark font-weight-bold mb-3'>Bài hướng dẫn</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
