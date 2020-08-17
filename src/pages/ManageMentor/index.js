import React, { useEffect, useState } from "react";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { deleteMentor, getMentorsList, updateActiveOfMentor } from "../../redux/user/actions";
import { Badge, Button } from "shards-react";
import moment from "moment";
import { Link } from "react-router-dom";

export default function ManageMentor() {
    const [idIsDeleting, setIdIsDeleting] = useState("");
    const [idIsActivating, setIdIsActivating] = useState("");
    const dispatch = useDispatch();
    const mentorsList = useSelector((state) => state.user.mentorsList);
    const isLoading = useSelector((state) => state.user.isLoading);
    const isDeleting = useSelector((state) => state.user.isDeleting);
    const isActivating = useSelector((state) => state.user.isActivating);

    const handleDeleteMentor = (id) => {
        dispatch(deleteMentor(id));
        setIdIsDeleting(id);
    };
    const handleActiveOfMentor = (mentor) => {
        dispatch(updateActiveOfMentor(mentor.id, !mentor.isActive));
        setIdIsActivating(mentor.id);
    };
    const ActiveButton = ({ mentor }) => {
        let buttonTitle;

        if (isActivating && idIsActivating === mentor.id && mentor.isActive) {
            buttonTitle = "Đang Hủy Active";
        } else if (isActivating && idIsActivating === mentor.id && !mentor.isActive) {
            buttonTitle = "Đang Active";
        } else if (mentor.isActive) {
            buttonTitle = "Hủy Active";
        } else {
            buttonTitle = "Active";
        }
        return (
            <Button
                disabled={isActivating}
                theme='warning'
                className='mr-1'
                onClick={() => handleActiveOfMentor(mentor)}
            >
                {buttonTitle}
            </Button>
        );
    };

    useEffect(() => {
        dispatch(getMentorsList());
    }, [dispatch]);

    return (
        <div className='manage-mentor-page'>
            <Link className='ml-3' to='create-mentor'>
                <Button>Tạo Mentor</Button>
            </Link>

            <hr />
            {isLoading ? (
                <div className='text-center'>Đang Tải...</div>
            ) : (
                <table className='table container-fluid'>
                    <thead className='thead-light'>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>Tên</th>
                            <th scope='col'>Ngày sinh</th>
                            <th scope='col'>Số điện thoại</th>
                            <th scope='col'>Công việc hiện tại</th>
                            <th scope='col'>Kinh nghiệm</th>
                            <th scope='col'>Khả năng mentor</th>
                            <th scope='col'>Trạng thái</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {mentorsList.map((mentor, i) => (
                            <tr key={mentor.id}>
                                <th scope='row'>{i + 1}</th>
                                <td>{mentor.user.name}</td>
                                <td>
                                    {mentor.user.dateOfBirth
                                        ? moment(mentor.user.dateOfBirth).format("DD/MM/YYYY")
                                        : ""}
                                </td>
                                <td>{mentor.user.phoneNumber ? mentor.user.phoneNumber : ""}</td>
                                <td>{mentor.currentJob}</td>
                                <td>{mentor.numberOfYearsExperience} năm</td>
                                <td>
                                    {mentor.specialities.map((speciality) => (
                                        <Badge key={speciality} theme='dark mr-1'>
                                            {speciality}
                                        </Badge>
                                    ))}
                                </td>
                                <td>{mentor.isActive ? "Đã Active" : "Chưa Active"}</td>
                                <td className='d-flex'>
                                    <ActiveButton mentor={mentor} />

                                    <Button
                                        disabled={isDeleting && idIsDeleting === mentor.id}
                                        onClick={() => handleDeleteMentor(mentor.id)}
                                        theme='danger'
                                        className='ml-1'
                                    >
                                        {isDeleting && idIsDeleting === mentor.id ? "Đang Xóa" : "Xóa"}
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
