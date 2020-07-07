import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Card, CardTitle, CardImg, CardBody, CardFooter, Button } from "shards-react";
import { fetchTutorials } from "../../redux/tutorials/actions";
import CardLoader from "../CardLoader";

class TutorialsList extends Component {
    componentDidMount() {
        this.props.fetchTutorialsReq();
    }

    render() {
        const { tutorials, currentUser, isLoading } = this.props;

        return (
            <div className='d-flex flex-wrap'>
                {isLoading ? (
                    <CardLoader numberOfCards={8} />
                ) : (
                    tutorials.map((tutorial) => (
                        <Link
                            className='card-item text-decoration-none text-dark'
                            key={tutorial.id}
                            to={`/tutorials/${tutorial.id}`}
                        >
                            <Card>
                                <CardImg src={tutorial.thumbnailUrl} />
                                <CardBody>
                                    <CardTitle>{tutorial.title}</CardTitle>
                                    <p>{tutorial.description}</p>
                                </CardBody>
                                {currentUser.userType === "admin" ? (
                                    <CardFooter className='d-flex justify-content-around'>
                                        <Button theme='danger'>Xóa Bài</Button>
                                        <Button theme='warning'>Chỉnh sủa</Button>
                                    </CardFooter>
                                ) : null}
                            </Card>
                        </Link>
                    ))
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    tutorials: state.tutorial.tutorials,
    currentUser: state.user.currentUser,
    isLoading: state.tutorial.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
    fetchTutorialsReq: () => dispatch(fetchTutorials()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TutorialsList);
