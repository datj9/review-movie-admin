import React, { useEffect, useState } from "react";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchNewsList } from "../../redux/news/actions";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import dayjs from "dayjs";

export default function NewsListPage() {
    const dispatch = useDispatch();
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [openModal, setOpenModal] = useState(false);
    const [currentNews, setCurrentNews] = useState({});
    const { newsList, total, isLoading } = useSelector((state) => state.news);

    const handleOpenContent = (news) => {
        setOpenModal(true);
        setCurrentNews(news);
    };

    useEffect(() => {
        dispatch(fetchNewsList(pageSize, pageIndex));
    }, [dispatch, pageIndex, pageSize]);

    const Pagination = () => {
        const list = [];

        for (let i = 0; i < Math.ceil(total / pageSize); i++) {
            list.push(
                <li key={i} onClick={() => setPageIndex(i + 1)}>
                    <span
                        className={`pagination-link ${pageIndex !== i + 1 ? "" : "is-current"}`}
                        aria-label='Page 1'
                        aria-current='page'
                    >
                        {i + 1}
                    </span>
                </li>
            );
        }

        return list;
    };

    return (
        <div className='news-page pb-5'>
            <div className='mb-4 px-3'>
                <Link to='create-news'>
                    <button className='button is-primary'>Tạo tin tức</button>
                </Link>
            </div>
            <table className='table container is-fluid'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>
                            <abbr title='Tựa đề'>Tựa đề</abbr>
                        </th>

                        <th>Tác giả</th>
                        <th>Nội dung</th>
                        <th>Tạo vào</th>
                        <th></th>
                    </tr>
                </thead>
                {newsList.length === 0 ? null : (
                    <tbody>
                        {newsList.map((news, i) => (
                            <tr key={news.id}>
                                <th>{(pageIndex - 1) * pageSize + i + 1}</th>
                                <td>{isLoading ? "" : news.title}</td>
                                <td>{isLoading ? "" : news.author.name}</td>
                                <td>{isLoading ? "" : parse(news.content.slice(0, 50))}</td>
                                <td>{isLoading ? "" : dayjs(news.createdAt).format("HH:mm DD-MM-YYYY")}</td>
                                <td>
                                    {isLoading ? (
                                        ""
                                    ) : (
                                        <div className='buttons'>
                                            <button
                                                onClick={() => handleOpenContent(news)}
                                                className='button is-primary'
                                            >
                                                Xem nội dung
                                            </button>
                                            <button className='button'>
                                                {news.isPublic ? "Hủy public" : "Public"}
                                            </button>
                                            <Link className='button' to={`/update-news/${news.id}`}>
                                                Cập nhật
                                            </Link>
                                        </div>
                                    )}
                                </td>
                                <div className={`modal ${openModal ? "is-active" : ""}`}>
                                    <div className='modal-background'></div>
                                    <div className='modal-card'>
                                        <header className='modal-card-head'>
                                            <p className='modal-card-title'>Nội dung</p>
                                        </header>
                                        <section className='modal-card-body modal-body-news-content'>
                                            <div>{parse(currentNews.content || "")}</div>
                                        </section>
                                        <footer className='modal-card-foot'>
                                            <button onClick={() => setOpenModal(false)} className='button'>
                                                Đóng
                                            </button>
                                        </footer>
                                    </div>
                                </div>
                                {/* <td>{isLoading ? "" : movie.runningTime}</td>
                                <td>{movie.status === 0 || movie.status === 2 ? "Sắp chiếu" : "Đang chiếu"}</td>
                                <td>{isLoading ? "" : <img alt={movie.name} src={movie.image} />}</td>
                                <td>
                                    <button
                                        className={`button ${
                                            movie.status === 0 || movie.status === 1 ? "" : "is-success"
                                        }`}
                                    >
                                        {movie.status === 0 || movie.status === 1 ? "Công Khai" : "Đã Công Khai"}
                                    </button>
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                )}
            </table>
            <div className='pagination px-3' role='navigation' aria-label='pagination'>
                <button
                    onClick={() => setPageIndex(pageIndex - 1)}
                    className='pagination-previous'
                    title='This is the first page'
                    disabled={pageIndex === 1}
                >
                    Trang Trước
                </button>
                <button
                    onClick={() => setPageIndex(pageIndex + 1)}
                    className='pagination-next'
                    disabled={pageIndex === Math.ceil(total / pageSize)}
                >
                    Trang Sau
                </button>
                <ul className='pagination-list'>
                    <Pagination />
                </ul>
            </div>
        </div>
    );
}
