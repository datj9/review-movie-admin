import React, { useState } from "react";
import "./style.scss";
import CustomEditor from "../../components/CustomEditor";
import { useDispatch, useSelector } from "react-redux";
import { createNews, uploadImage } from "../../redux/news/actions";

export default function CreateNewsPage() {
    const { linkUrl } = useSelector((state) => state.news);
    const dispatch = useDispatch();
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    const handleEditorValue = (event, editor) => {
        const data = editor.getData();
        setContent(data);
    };
    const handleFileChange = (e) => {
        dispatch(uploadImage(e.target.files[0]));
    };
    const submitCreateNews = () => {
        dispatch(createNews({ title, content, image: linkUrl }));
    };

    return (
        <div className='create-news-page px-3'>
            <div className='field'>
                <label className='label'>Tựa đề</label>
                <div className='control'>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className='input is-medium'
                        type='text'
                        placeholder='Tựa đề'
                    />
                </div>
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
            <CustomEditor editorValue={content} handleEditorValue={handleEditorValue} />
            <button onClick={submitCreateNews} className='button is-primary mt-5'>
                Tạo bài viết
            </button>
        </div>
    );
}
