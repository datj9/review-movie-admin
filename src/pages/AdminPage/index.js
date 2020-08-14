import React, { useEffect, useState } from "react";
import "./style.css";
import { FormInput, Button } from "shards-react";
import { Link } from "react-router-dom";
import TutorialsList from "../../components/TutorialsList";
import { clearAllTutorials, fetchTutorials } from "../../redux/tutorials/actions";
import { useDispatch, useSelector } from "react-redux";

export default function AdminPage() {
    const [pageIndex, setPageIndex] = useState(0);
    const dispatch = useDispatch();
    const isFetchingMore = useSelector((state) => state.tutorial.isFetchingMore);
    const total = useSelector((state) => state.tutorial.total);
    const tutorials = useSelector((state) => state.tutorial.tutorials);

    const fetchMoreTutorials = () => {
        dispatch(fetchTutorials(pageIndex + 1));
    };

    useEffect(() => {
        dispatch(fetchTutorials());

        return () => {
            dispatch(clearAllTutorials());
        };
    }, [dispatch]);

    useEffect(() => {
        if (tutorials.length > pageIndex * 9) {
            setPageIndex((p) => ++p);
        }
    }, [tutorials.length, pageIndex]);

    return (
        <div className='container py-5'>
            <div className='title text-dark font-weight-bold mb-3'>Các bài hướng dẫn</div>
            <hr />
            <FormInput placeholder='Tìm kiếm bài hướng dẫn theo tiêu đề' className='mb-3' />
            <Link to='/admin/tutorials/create-tutorial'>
                <Button className='mb-3'>Tạo Bài Hướng Dẫn</Button>
            </Link>
            <TutorialsList />
            {total > pageIndex * 9 ? (
                <div className='text-center'>
                    <Button disabled={isFetchingMore} onClick={fetchMoreTutorials}>
                        {isFetchingMore ? "..." : "More Tutorials"}
                    </Button>
                </div>
            ) : null}
        </div>
    );
}
