import React, { Component } from "react";
import "./style.css";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Card, CardTitle, CardImg, CardBody, CardFooter, Button } from "shards-react";
import { deleteTutorial } from "../../redux/tutorials/actions";
import CardLoader from "../CardLoader";
import moment from "moment";

class TutorialsList extends Component {
    delTurorial = (id) => {
        this.props.delTurorialReq(id);
    };

    render() {
        const { tutorials, currentUser, isLoading, isSearching, pageSize = 8 } = this.props;

        const Tutorials = () => {
            if (currentUser.userType === "admin" && this.props.match.path.includes("admin")) {
                return tutorials.map((tutorial) => (
                    <div className='card-item-admin text-decoration-none text-dark' key={tutorial.id}>
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
                                    <Button theme='warning'>Chỉnh sửa</Button>
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
                        <img className='mr-3' src={tutorial.thumbnailUrl} alt='' />
                        <div className='d-flex flex-column'>
                            <span className='tutorial-title'>{tutorial.title}</span>
                            <span className='tutorial-description'>{tutorial.description}</span>
                            <span>
                                {Date.now() - new Date(tutorial.createdAt) <= 3 * 24 * 60 * 60 * 1000
                                    ? moment(tutorial.createdAt).fromNow()
                                    : moment(tutorial.createdAt).format("MMMM DD")}
                            </span>
                        </div>
                    </Link>
                ));
            }
        };

        return (
            <div className='d-flex flex-wrap'>
                {isLoading || isSearching ? <CardLoader numberOfCards={pageSize} /> : <Tutorials />}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    tutorials: state.tutorial.tutorials,
    isLoading: state.tutorial.isLoading,
    isSearching: state.tutorial.isSearching,
    currentUser: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
    delTurorialReq: (id) => dispatch(deleteTutorial(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TutorialsList));
