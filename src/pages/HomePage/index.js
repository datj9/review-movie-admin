import React from "react";
import "./style.css";
import { Dropdown, DropdownToggle, DropdownMenu, FormCheckbox, DropdownItem, Button } from "shards-react";
import { connect } from "react-redux";
import { clearAllTutorials, fetchTutorials, searchTutorials } from "../../redux/tutorials/actions";
import TutorialsList from "../../components/TutorialsList";

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { open: false, technologies: { ReactJS: false, JavaScript: false } };
    }

    toggle = () => {
        this.setState({ open: !this.state.open });
    };
    handleTechChange = (e, tech) => {
        const technologies = this.state.technologies;
        technologies[tech] = !technologies[tech];
        this.setState({ technologies });
    };
    handleSearch = () => {
        const techsObj = this.state.technologies;
        const searchTechnogies = Object.keys(techsObj).filter((tech) => techsObj[tech]);
        this.props.searchTutorialsReq(searchTechnogies);
        this.toggle();
    };

    componentDidMount() {
        this.props.fetchTutorialsReq();
    }

    componentWillUnmount() {
        this.props.clearAllTutorialsInStore();
    }

    render() {
        const { technologies } = this.state;
        const { isSearching } = this.props;

        return (
            <div className='container homepage pb-3'>
                <div className='breadcrumb-container'>
                    <span className='title text-dark font-weight-bold mb-3'>Bài hướng dẫn</span>
                    <Dropdown toggle={this.toggle} open={this.state.open} className='d-table'>
                        <DropdownToggle disabled={isSearching} onClick={this.toggle}>
                            {isSearching ? "Đang tìm kiếm" : "Tìm kiếm theo"}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem disabled>Ngôn ngữ</DropdownItem>

                            <FormCheckbox
                                className='ml-4'
                                checked={technologies.JavaScript}
                                onChange={(e) => this.handleTechChange(e, "JavaScript")}
                            >
                                JavaScript
                            </FormCheckbox>

                            <DropdownItem divider />
                            <DropdownItem disabled>Công nghệ</DropdownItem>
                            <FormCheckbox
                                className='ml-4'
                                checked={technologies.ReactJS}
                                onChange={(e) => this.handleTechChange(e, "ReactJS")}
                            >
                                ReactJS
                            </FormCheckbox>
                            <DropdownItem divider />
                            <Button onClick={this.handleSearch} className='ml-4' theme='info'>
                                Tìm kiếm
                            </Button>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <hr />
                <TutorialsList />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    tutorials: state.tutorial.tutorials,
    isSearching: state.tutorial.isSearching,
});

const mapDispatchToProps = (dispatch) => ({
    fetchTutorialsReq: () => dispatch(fetchTutorials()),
    searchTutorialsReq: (technologies) => dispatch(searchTutorials(technologies)),
    clearAllTutorialsInStore: () => dispatch(clearAllTutorials()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
