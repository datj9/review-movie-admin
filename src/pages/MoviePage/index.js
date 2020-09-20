import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { crawlMovies, fetchMoviesList } from "../../redux/movie/actions";

import "./style.scss";

export default function MoviePage() {
    const dispatch = useDispatch();
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [openModal, setOpenModal] = useState(false);

    const { moviesList, total, isLoading, isCrawling, isSuccess, numberOfNewMovies } = useSelector(
        (state) => state.movie
    );

    useEffect(() => {
        dispatch(fetchMoviesList(pageSize, pageIndex));
    }, [dispatch, pageIndex, pageSize]);

    useEffect(() => {
        if (isSuccess) {
            setOpenModal(true);
        }
    }, [isSuccess]);

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
        <div className='movies-page pb-5'>
            <div className='mb-4 px-3'>
                <button
                    onClick={() => dispatch(crawlMovies())}
                    disabled={isCrawling || isLoading}
                    className={`button is-primary ${isCrawling ? "is-loading" : ""}`}
                >
                    Crawl phim
                </button>
            </div>
            <table className='table container is-fluid'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>
                            <abbr title='Tên'>Tên phim</abbr>
                        </th>

                        <th>Diễn viên</th>
                        <th>Đạo diễn</th>
                        <th>Ngày ra mắt</th>
                        <th>Thời lượng</th>
                        <th>Trạng thái</th>
                        <th>Hình ảnh</th>
                        <th></th>
                    </tr>
                </thead>
                {moviesList.length === 0 ? null : (
                    <tbody>
                        {moviesList.map((movie, i) => (
                            <tr key={movie.id}>
                                <th>{(pageIndex - 1) * pageSize + i + 1}</th>
                                <td>{isLoading ? "" : movie.name}</td>
                                <td>
                                    {isLoading
                                        ? ""
                                        : movie.actors
                                              .slice(0, 2)
                                              .map((actor, i) => (
                                                  <span key={actor}>{`${actor}${
                                                      i !== movie.actors.slice(0, 2).length - 1 ? ", " : ""
                                                  }`}</span>
                                              ))}
                                </td>
                                <td>
                                    {isLoading
                                        ? ""
                                        : movie.filmDirectors
                                              .slice(0, 2)
                                              .map((director, i) => (
                                                  <span key={director}>{`${director}${
                                                      i !== movie.filmDirectors.slice(0, 2).length - 1 ? ", " : ""
                                                  }`}</span>
                                              ))}
                                </td>
                                <td>{isLoading ? "" : dayjs(movie.releaseDate).format("DD-MM-YYYY")}</td>
                                <td>{isLoading ? "" : movie.runningTime}</td>
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
                                </td>
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

            <div className={`modal ${openModal ? "is-active" : ""}`}>
                <div className='modal-background'></div>
                <div className='modal-card'>
                    <header className='modal-card-head'>
                        <p className='modal-card-title'>Kết quả</p>
                    </header>
                    <section className='modal-card-body'>
                        <div>Đã lấy về được {numberOfNewMovies} phim</div>
                    </section>
                    <footer className='modal-card-foot'>
                        <button onClick={() => setOpenModal(false)} className='button'>
                            Đóng
                        </button>
                    </footer>
                </div>
            </div>
        </div>
    );
}
