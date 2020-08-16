import React from "react";
import { useSelector } from "react-redux";
import { Button, Container, FormGroup, FormInput, FormSelect } from "shards-react";
import "./style.css";

export default function CreateMentor() {
    // const errors = useSelector((state) => state.errors);

    return (
        <div className='create-mentor'>
            <Container>
                <div className='mb-5 h3'>Tạo Mentor</div>
                <FormGroup className='d-flex justify-content-between'>
                    <FormInput placeholder='Nhập thông tin user' className='w-50' />
                    <FormSelect className='w-25'>
                        <option>Tìm kiếm theo</option>
                        <option>Email</option>
                        <option>Họ Tên</option>
                    </FormSelect>
                    <Button>Tìm kiếm</Button>
                </FormGroup>
                {/* {errors.title && errors.title.includes("required") ? (
                    <div className='text-danger mb-3'>Vui lòng nhập tiêu đề</div>
                ) : null} */}
                <FormSelect className='w-50'>
                    <option>Danh sách user</option>
                </FormSelect>
            </Container>
        </div>
    );
}
