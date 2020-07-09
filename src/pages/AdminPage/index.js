import React, { Component } from "react";
import "./style.css";
import { FormInput, Button } from "shards-react";
import { Link } from "react-router-dom";
import TutorialsList from "../../components/TutorialsList";
import { fetchTutorials } from "../../redux/tutorials/actions";
import { connect } from "react-redux";

class AdminPage extends Component {
    componentDidMount() {
        this.props.fetchTutorialsReq();
    }

    render() {
        return (
            <div className='container py-5'>
                <div className='title text-dark font-weight-bold mb-3'>Các bài hướng dẫn</div>
                <hr />
                <FormInput placeholder='Tìm kiếm bài hướng dẫn theo tiêu đề' className='mb-3' />
                <Link to='/admin/tutorials/create-tutorial'>
                    <Button className='mb-3'>Tạo Bài Hướng Dẫn</Button>
                </Link>
                <TutorialsList />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchTutorialsReq: () => dispatch(fetchTutorials()),
});

export default connect(null, mapDispatchToProps)(AdminPage);
