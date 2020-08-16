import React, { useEffect } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { getTrackings } from "../../redux/trackings/actions";
import moment from "moment";

const TrackingUser = () => {
    const dispatch = useDispatch();
    const trackings = useSelector((state) => state.tracking.trackings);
    const isLoading = useSelector((state) => state.tracking.isLoading);

    useEffect(() => {
        dispatch(getTrackings());
    }, [dispatch]);

    return (
        <div className='container tracking-page'>
            {isLoading ? (
                <div className='text-center'>Đang tải...</div>
            ) : (
                <table className='table'>
                    <thead>
                        <tr>
                            <th scope='col'>STT</th>
                            <th scope='col'>IP</th>
                            <th scope='col'>Thành phố</th>
                            <th scope='col'>Bài hướng dẫn</th>
                            <th scope='col'>Lượt xem</th>
                            <th scope='col'>Lần cuối xem</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trackings.map((tracking, i) => (
                            <tr key={tracking.id}>
                                <th scope='row'>{i + 1}</th>
                                <td>{tracking.ip}</td>
                                <td>{tracking.city}</td>
                                <td>{tracking.tutorial.title}</td>
                                <td>{tracking.views}</td>
                                <td>{moment(tracking.lastTimeSeen).format("MMMM Do YYYY, h:mm:ss a")}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default TrackingUser;
