import React, { Component } from "react";
import { FormInput, Button } from "shards-react";
import { Link } from "react-router-dom";
import TutorialsList from "../../components/TutorialsList";

class AdminPage extends Component {
    render() {
        return (
            <div className='container py-5'>
                <h1 className='title mb-3 d-block'>Các bài hướng dẫn</h1>
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

export default AdminPage;
