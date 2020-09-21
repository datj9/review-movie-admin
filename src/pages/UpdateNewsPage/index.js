import React, { useEffect, useRef, useState } from "react";
import "./style.scss";
import CustomEditor from "../../components/CustomEditor";
import { useDispatch, useSelector } from "react-redux";
import { createNews, fetchNews, uploadImage } from "../../redux/news/actions";
import { useParams } from "react-router-dom";

export default function UpdateNewsPage() {
    const { linkUrl } = useSelector((state) => state.news);
    const dispatch = useDispatch();
    const [editorValue, setEditorValue] = useState("");
    const titleRef = useRef();
    const { newsId } = useParams();

    const handleEditorValue = (event, editor) => {
        const data = editor.getData();
        setEditorValue(data);
    };
    const handleFileChange = (e) => {
        dispatch(uploadImage(e.target.files[0]));
    };
    const submitUpdateNews = () => {
        const title = titleRef.current.value;
        dispatch(createNews({ title, content: editorValue, image: linkUrl }));
    };

    useEffect(() => {
        dispatch(fetchNews(newsId));
    }, [dispatch, newsId]);

    return (
        <div className='update-news-page px-3'>
            <div className='field'>
                <label className='label'>Tựa đề</label>
                <div className='control'>
                    <input ref={titleRef} className='input is-medium' type='text' placeholder='Tựa đề' />
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
            <CustomEditor editorValue={editorValue} handleEditorValue={handleEditorValue} />
            <button onClick={submitUpdateNews} className='button is-primary mt-5'>
                Cập nhật bài viết
            </button>
        </div>
    );
}
