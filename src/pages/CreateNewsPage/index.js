import React, { useRef, useState } from "react";
import "./style.scss";
import CustomEditor from "../../components/CustomEditor";
import { useDispatch, useSelector } from "react-redux";
import { createNews, uploadImage } from "../../redux/news/actions";

export default function CreateNewsPage() {
    const { linkUrl } = useSelector((state) => state.news);
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [editorValue, setEditorValue] = useState("");
    const titleRef = useRef();

    const handleEditorValue = (event, editor) => {
        const data = editor.getData();
        setEditorValue(data);
    };
    const handleFileChange = (e) => {
        dispatch(uploadImage(e.target.files[0]));
    };
    const submitCreateNews = () => {
        const title = titleRef.current.value;
        dispatch(createNews({ title, content: editorValue, image: linkUrl, author: currentUser.id }));
    };

    return (
        <div className='create-news-page px-3'>
            <div className='field'>
                <label className='label'>Tựa đề</label>
                <div className='control'>
                    <input ref={titleRef} className='input is-medium' type='text' placeholder='Tựa đề' />
                </div>
                {/* {emailErrMsg ? <p className='has-text-danger mt-1'>{emailErrMsg}</p> : null} */}
            </div>
            <div className='field'>
                <label className='label mb-3'>Hình bìa (chỉ chọn file png, jpg, jpeg)</label>
                <input onChange={handleFileChange} type='file' />
                {linkUrl ? (
                    <div className='mt-3'>
                        <img alt='thumbnail' src={linkUrl} />
                    </div>
                ) : null}
            </div>
            <CustomEditor editorValue={editorValue} handleEditorValue={handleEditorValue} />
            <button onClick={submitCreateNews} className='button is-primary mt-5'>
                Tạo bài viết
            </button>
        </div>
    );
}
