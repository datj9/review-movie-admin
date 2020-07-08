import React, { Component } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import UploadAdapter from "../../adapter/UploadAdapter";
import parse from "html-react-parser";
import { FormInput, Button, Alert } from "shards-react";
import { connect } from "react-redux";
import { uploadImage, fetchOneTutorial, updateTutorial, clearErrorsAndLink } from "../../redux/tutorials/actions";
import { withRouter } from "react-router-dom";

class UpdateTutorialPage extends Component {
    constructor(props) {
        super(props);
        this.state = { editorValue: "", title: "", description: "", gotTutorial: false };
    }

    handleEditorValue = (event, editor) => {
        const data = editor.getData();
        this.setState({ editorValue: data });
    };

    handleThumbnailUrl = (e) => {
        this.props.uploadImageReq(e.target.files[0]);
    };

    handleTitle = (e) => {
        this.setState({ title: e.target.value });
    };

    handleDescription = (e) => {
        this.setState({ description: e.target.value });
    };

    updateTutorial = () => {
        console.log(this.titleRef);
        this.props.updateTutorialReq(this.props.tutorial.id, {
            thumbnailUrl: this.props.linkUrl || this.props.tutorial.thumbnailUrl,
            title: this.state.title,
            description: this.state.description,
            content: this.state.editorValue,
        });
    };

    static getDerivedStateFromProps(props, state) {
        console.log(state);
        if (props.tutorial.title && !state.gotTutorial) {
            return {
                title: props.tutorial.title,
                description: props.tutorial.description,
                gotTutorial: true,
            };
        }
        return null;
    }

    componentDidMount() {
        this.props.fetchTutorialReq(this.props.match.params.tutorialId);
    }

    componentWillUnmount() {
        this.props.clearErrAndLink();
    }

    render() {
        const { editorValue, title, description } = this.state;
        const { linkUrl, isUploading, isLoading, tutorial, message, errors } = this.props;

        const ThumbnailImage = () => {
            if (linkUrl || tutorial.thumbnailUrl) {
                return (
                    <div className='w-50 mb-3'>
                        <img src={linkUrl || tutorial.thumbnailUrl} alt='' className='w-100 h-auto' />
                    </div>
                );
            }
            return null;
        };

        return (
            <div className='container my-5'>
                <div className='mb-5 h3'>Cập nhật bài hướng dẫn</div>
                <FormInput value={title} placeholder='Tiêu đề' className='mb-3' onChange={this.handleTitle} />
                {errors.title && errors.title.includes("required") ? (
                    <div className='text-danger mb-3'>Vui lòng nhập tiêu đề</div>
                ) : null}
                <FormInput value={description} placeholder='Mô tả' className='mb-3' onChange={this.handleDescription} />
                {errors.description && errors.description.includes("required") ? (
                    <div className='text-danger mb-3'>Vui lòng nhập mô tả</div>
                ) : null}
                <div className='custom-file mb-3'>
                    <input
                        type='file'
                        className='custom-file-input'
                        id='customFile'
                        onChange={this.handleThumbnailUrl}
                    />
                    <label className='custom-file-label' htmlFor='customFile'>
                        {isUploading ? "Đang đăng tải" : "Chọn hình thumbnail"}
                    </label>
                </div>
                {errors.thumbnailUrl && errors.thumbnailUrl.includes("required") ? (
                    <div className='text-danger mb-3'>Vui lòng đăng tải hình thumbnail</div>
                ) : null}
                <ThumbnailImage />

                <CKEditor
                    editor={ClassicEditor}
                    data={tutorial.content}
                    onInit={(editor) => {
                        editor.ui.view.editable.element.style.height = "200px";
                        editor.plugins.get("FileRepository").createUploadAdapter = function (loader) {
                            return new UploadAdapter(loader);
                        };
                    }}
                    onChange={this.handleEditorValue}
                    onBlur={(event, editor) => {
                        console.log("Blur.", editor);
                    }}
                    onFocus={(event, editor) => {
                        console.log("Focus.", editor);
                    }}
                />
                {errors.content && errors.content.includes("required") ? (
                    <div className='text-danger'>Vui lòng nhập nội dung</div>
                ) : null}
                {message.includes("success") ? (
                    <Alert className='mt-3' theme='success'>
                        Đã cập nhật thành công
                    </Alert>
                ) : null}
                <Button disabled={isLoading} className='mt-5' onClick={this.updateTutorial}>
                    {isLoading ? "Đang lưu..." : "Cập nhật bài viết"}
                </Button>
                <div className='mt-5'>
                    <span className='h4'>Xem trước ở bên dưới</span>
                    {parse(editorValue)}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    linkUrl: state.tutorial.linkUrl,
    isUploading: state.tutorial.isUploading,
    isLoading: state.tutorial.isLoading,
    tutorial: state.tutorial.tutorial,
    message: state.tutorial.message,
    errors: state.tutorial.errors,
});
const mapDispatchToProps = (dispatch) => ({
    uploadImageReq: (file) => dispatch(uploadImage(file)),
    fetchTutorialReq: (id) => dispatch(fetchOneTutorial(id)),
    updateTutorialReq: (id, tutorial) => dispatch(updateTutorial(id, tutorial)),
    clearErrAndLink: () => dispatch(clearErrorsAndLink()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UpdateTutorialPage));
