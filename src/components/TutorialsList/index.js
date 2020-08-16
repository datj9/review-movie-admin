import React, { Component } from "react";
import "./style.css";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import {
    Card,
    CardTitle,
    CardImg,
    CardBody,
    CardFooter,
    Button,
    Badge,
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter,
} from "shards-react";
import { deleteTutorial } from "../../redux/tutorials/actions";
import CardLoader from "../CardLoader";
import moment from "moment";

class TutorialsList extends Component {
    state = { openModalConfirmDelete: false, activeId: "", activeTitle: "" };

    toggleOpenModalConfirmDelete = ({ id, title }) => {
        this.setState({
            openModalConfirmDelete: !this.state.openModalConfirmDelete,
            activeId: id ? id : undefined,
            activeTitle: title ? title : undefined,
        });
    };

    delTurorial = (id) => {
        this.props.delTurorialReq(id);
    };

    render() {
        const { openModalConfirmDelete, activeId, activeTitle } = this.state;
        const { tutorials, currentUser, isLoading, isSearching, pageSize = 8 } = this.props;

        const Tutorials = () => {
            let tutorialsList = [];
            if (currentUser.userType === "admin") {
                tutorialsList = tutorials.map((tutorial) => (
                    <div className='card-item-admin text-decoration-none text-dark' key={tutorial.id}>
                        <Card>
                            <CardImg src={tutorial.thumbnailUrl} />
                            <CardBody>
                                <CardTitle>
                                    {tutorial.title.length <= 30 ? tutorial.title : tutorial.title.slice(0, 30)}
                                </CardTitle>
                                <p>
                                    {tutorial.description <= 30
                                        ? tutorial.description
                                        : tutorial.description.slice(0, 30)}
                                </p>
                            </CardBody>
                            <CardFooter className='d-flex justify-content-around'>
                                <Button
                                    className='mr-2'
                                    onClick={() => this.toggleOpenModalConfirmDelete(tutorial)}
                                    theme='danger'
                                >
                                    Xóa Bài
                                </Button>

                                <Link to={`/update-tutorial/${tutorial.id}`}>
                                    <Button className='ml-2' theme='warning'>
                                        Chỉnh sửa
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    </div>
                ));
                return (
                    <>
                        {tutorialsList}
                        <Modal open={openModalConfirmDelete} toggle={this.toggleOpenModalConfirmDelete}>
                            <ModalHeader>Xác nhận xóa bài</ModalHeader>
                            <ModalBody>
                                <div>Bạn có chắc là muốn xóa bài này?</div>
                                <div>Tựa đề: {activeTitle}</div>
                            </ModalBody>
                            <ModalFooter>
                                <Button onClick={this.toggleOpenModalConfirmDelete} theme='secondary'>
                                    Hủy
                                </Button>
                                <Button onClick={() => this.delTurorial(activeId)} theme='danger'>
                                    Xóa
                                </Button>
                            </ModalFooter>
                        </Modal>
                    </>
                );
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
                            <span className='mt-2'>
                                {Date.now() - new Date(tutorial.createdAt) <= 3 * 24 * 60 * 60 * 1000
                                    ? moment(tutorial.createdAt).fromNow()
                                    : moment(tutorial.createdAt).format("MMMM DD")}
                            </span>
                            <div>
                                {tutorial.tags.map((tag) => (
                                    <Badge key={tag} className='mr-2' pill theme='secondary'>
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
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
