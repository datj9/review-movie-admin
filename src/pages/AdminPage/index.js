import React, { Component } from "react";
import { Card, CardTitle, CardImg, CardBody, FormInput, Button } from "shards-react";
import { Link } from "react-router-dom";

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
                <div className='d-flex flex-wrap'>
                    <Card>
                        <CardImg src='https://place-hold.it/300x200' />
                        <CardBody>
                            <CardTitle>Lorem Ipsum</CardTitle>
                            <p>Đây là phần mô tả</p>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardImg src='https://place-hold.it/300x200' />
                        <CardBody>
                            <CardTitle>Lorem Ipsum</CardTitle>
                            <p>Đây là phần mô tả</p>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardImg src='https://place-hold.it/300x200' />
                        <CardBody>
                            <CardTitle>Lorem Ipsum</CardTitle>
                            <p>Đây là phần mô tả</p>
                        </CardBody>
                    </Card>
                </div>
            </div>
        );
    }
}

export default AdminPage;
