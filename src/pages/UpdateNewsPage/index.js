import React, { useEffect, useState } from "react";
import "./style.scss";
import CustomEditor from "../../components/CustomEditor";
import { useDispatch, useSelector } from "react-redux";
import { updateNews, fetchNews, uploadImage } from "../../redux/news/actions";
import { useParams } from "react-router-dom";

export default function UpdateNewsPage() {
    const { linkUrl, news } = useSelector((state) => state.news);
    const dispatch = useDispatch();
    const { newsId } = useParams();

    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");

    const handleEditorValue = (event, editor) => {
        const data = editor.getData();
        setContent(data);
    };
    const handleFileChange = (e) => {
        dispatch(uploadImage(e.target.files[0]));
    };
    const submitUpdateNews = () => {
        dispatch(updateNews({ title, content, image: linkUrl ? linkUrl : image }));
    };

    useEffect(() => {
        dispatch(fetchNews(newsId));
    }, [dispatch, newsId]);

    useEffect(() => {
        setTitle(news.title);
        setContent(news.content);
        setImage(news.image);
    }, [news.title, news.image, news.content]);

    return (
        <div className='update-news-page px-3'>
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
            <button onClick={submitUpdateNews} className='button is-primary mt-5'>
                Cập nhật bài viết
            </button>
        </div>
    );
}
