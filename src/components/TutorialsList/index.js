import React, { Component } from "react";
import "./style.css";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Card, CardTitle, CardImg, CardBody, CardFooter, Button } from "shards-react";
import { fetchTutorials, deleteTutorial } from "../../redux/tutorials/actions";
import CardLoader from "../CardLoader";

class TutorialsList extends Component {
    delTurorial = (id) => {
        this.props.delTurorialReq(id);
    };

    componentDidMount() {
        this.props.fetchTutorialsReq();
    }

    render() {
        const { tutorials, currentUser, isLoading } = this.props;

        const Tutorials = () => {
            if (currentUser.userType === "admin" && this.props.match.path.includes("admin")) {
                return tutorials.map((tutorial) => (
                    <div className='card-item text-decoration-none text-dark' key={tutorial.id}>
                        <Card>
                            <CardImg src={tutorial.thumbnailUrl} />
                            <CardBody>
                                <CardTitle>{tutorial.title}</CardTitle>
                                <p>{tutorial.description}</p>
                            </CardBody>
                            <CardFooter className='d-flex justify-content-around'>
                                <Button onClick={() => this.delTurorial(tutorial.id)} theme='danger'>
                                    Xóa Bài
                                </Button>
                                <Link to={`${this.props.match.path}/update-tutorial/${tutorial.id}`}>
                                    <Button theme='warning'>Chỉnh sủa</Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    </div>
                ));
            } else {
                return tutorials.map((tutorial) => (
                    <Link
                        to={`/tutorials/${tutorial.id}`}
                        className='card-item text-decoration-none text-dark'
                        key={tutorial.id}
                    >
                        <Card>
                            <CardImg src={tutorial.thumbnailUrl} />
                            <CardBody>
                                <CardTitle>{tutorial.title}</CardTitle>
                                <p>{tutorial.description}</p>
                            </CardBody>
                        </Card>
                    </Link>
                ));
            }
        };

        return <div className='d-flex flex-wrap'>{isLoading ? <CardLoader numberOfCards={8} /> : <Tutorials />}</div>;
    }
}

const mapStateToProps = (state) => ({
    tutorials: state.tutorial.tutorials,
    currentUser: state.user.currentUser,
    isLoading: state.tutorial.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
    fetchTutorialsReq: () => dispatch(fetchTutorials()),
    delTurorialReq: (id) => dispatch(deleteTutorial(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TutorialsList));
