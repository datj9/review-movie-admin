import React, { useRef, useEffect, useState } from "react";
import "./style.scss";
import { signIn } from "../../redux/user/actions";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_ERRORS } from "../../redux/user/action-types";

const SignInPage = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const dispatch = useDispatch();
    const { errors, isSuccess, isLoading } = useSelector((state) => state.user);
    const [emailErrMsg, setEmailErrMsg] = useState("");
    const [passwordErrMsg, setPasswordErrMsg] = useState("");

    const submitFormLogin = async (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        dispatch(signIn({ email, password }, "local"));
    };

    // useEffect(() => {
    //     if (isSuccess) {
    //         this.props.location.replace("/");
    //     }

    //     return () => {
    //         dispatch({ type: CLEAR_ERRORS });
    //     };
    // }, [isSuccess, dispatch]);

    useEffect(() => {
        if (errors.email && errors.email.includes("required")) {
            setEmailErrMsg("Vui lòng nhập email");
        } else if (errors.email && errors.email.includes("invalid")) {
            setEmailErrMsg("Email không hợp lệ");
        } else if (errors.email && errors.email.includes("not found")) {
            setEmailErrMsg("Email không tồn tại");
        } else {
            setEmailErrMsg("");
        }
    }, [errors.email]);

    useEffect(() => {
        if (errors.password && errors.password.includes("required")) {
            setPasswordErrMsg("Vui lòng nhập mật khẩu");
        } else if (errors.password && errors.password.includes("incorrect")) {
            setPasswordErrMsg("Mật khẩu không đúng");
        } else {
            setPasswordErrMsg("");
        }
    }, [errors.password]);

    return (
        <div className='login pt-5 pb-6 px-0 mb-5 has-background-white'>
            <div className='form-container px-4'>
                <div className='title px-4 has-text-centered'>Đăng Nhập vào Tài Khoản Của Bạn</div>
                <form className='mb-3'>
                    <div className='field'>
                        <label className='label'>Email</label>
                        <div className='control'>
                            <input
                                ref={emailRef}
                                className='input is-medium'
                                type='email'
                                placeholder='Địa chỉ email'
                            />
                        </div>
                        {emailErrMsg ? <p className='has-text-danger mt-1'>{emailErrMsg}</p> : null}
                    </div>
                    <div className='field mb-3'>
                        <label className='label'>Mật khẩu</label>
                        <div className='control'>
                            <input
                                ref={passwordRef}
                                className='input is-medium'
                                type='password'
                                placeholder='Mật khẩu'
                            />
                        </div>
                        {passwordErrMsg ? <p className='has-text-danger mt-1'>{passwordErrMsg}</p> : null}
                    </div>
                    <button
                        disabled={isLoading}
                        className={`button is-primary is-fullwidth is-medium ${isLoading ? "is-loading" : ""}`}
                        type='submit'
                        onClick={submitFormLogin}
                    >
                        Đăng Nhập
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignInPage;
