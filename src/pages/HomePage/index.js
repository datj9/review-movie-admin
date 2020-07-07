import React from "react";
import "./style.css";
import { Card, CardTitle, CardImg, CardBody } from "shards-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchTutorials } from "../../redux/tutorials/actions";

class HomePage extends React.Component {
    state = {};

    componentDidMount() {
        this.props.fetchTutorialsReq();
    }

    render() {
        const { tutorials } = this.props;
        return (
            <div className='container py-5'>
                <h1 className='title mb-3 d-block'>Bài hướng dẫn</h1>
                <hr />
                <div className='d-flex flex-wrap'>
                    {tutorials.map((tutorial) => (
                        <Link className='card-item' key={tutorial.id} to={`/tutorials/${tutorial.id}`}>
                            <Card>
                                <CardImg src={tutorial.thumbnailUrl} />
                                <CardBody>
                                    <CardTitle>{tutorial.title}</CardTitle>
                                    <p>{tutorial.description}</p>
                                </CardBody>
                            </Card>
                        </Link>
                    ))}
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
