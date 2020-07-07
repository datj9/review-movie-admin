import React, { Component } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import UploadAdapter from "../../adapter/UploadAdapter";
import parse from "html-react-parser";
import { FormInput, Button } from "shards-react";
import { connect } from "react-redux";
import { uploadImage, createTutorial } from "../../redux/tutorials/actions";

class CreateTutorialPage extends Component {
    state = { editorValue: "", title: "", description: "" };

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

    createTutorial = () => {
        this.props.createTutorialReq({
            thumbnailUrl: this.props.linkUrl,
            title: this.state.title,
            description: this.state.description,
            content: this.state.editorValue,
        });
    };

    render() {
        const { editorValue } = this.state;
        const { linkUrl, isUploading, isLoading } = this.props;

        const ThumbnailImage = () => {
            if (linkUrl) {
                return (
                    <div className='w-50 mb-3'>
                        <img src={linkUrl} alt='' className='w-100 h-auto' />
                    </div>
                );
            }
            return null;
        };

        return (
            <div className='container my-5'>
                <FormInput placeholder='Tiêu đề' className='mb-3' onChange={this.handleTitle} />
                <FormInput placeholder='Mô tả' className='mb-3' onChange={this.handleDescription} />
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
                <ThumbnailImage />

                <CKEditor
                    editor={ClassicEditor}
                    data={editorValue}
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
                <Button disabled={isLoading} className='mt-5' onClick={this.createTutorial}>
                    {isLoading ? "Đang lưu..." : "Lưu bài viết"}
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
});
const mapDispatchToProps = (dispatch) => ({
    uploadImageReq: (file) => dispatch(uploadImage(file)),
    createTutorialReq: (tutorial) => dispatch(createTutorial(tutorial)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateTutorialPage);
