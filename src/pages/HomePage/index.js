import React from "react";
import "./style.css";
import { Card, CardTitle, CardImg, CardBody } from "shards-react";
import { connect } from "react-redux";
import { fetchTutorials } from "../../redux/tutorials/actions";

class HomePage extends React.Component {
    state = {};

    componentDidMount() {
        this.props.fetchTutorialsReq();
    }

    render() {
        return (
            <div className='container py-5'>
                <h1 className='title mb-3 d-block'>Bài hướng dẫn</h1>
                <hr />

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

const mapStateToProps = (state) => ({
    tutorials: state.tutorial.tutorials,
});

const mapDispatchToProps = (dispatch) => ({
    fetchTutorialsReq: () => dispatch(fetchTutorials()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
