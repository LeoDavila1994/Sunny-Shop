import React from 'react';
import { useForm } from 'react-hook-form';
import axios from "axios";
import { useNavigate } from 'react-router';

const LogIn = () => {


    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();

    const submit = data => {
        axios.post("https://ecommerce-api-react.herokuapp.com/api/v1/users/login", data)
            .then(res => {
                navigate("/")
                localStorage.setItem("token", res.data.data.token)
            })
            .catch(error => {
                if(error.response.status === 404){
                    alert("Credenciales Invalidas")
                }
                console.log(error.response);
            });

        reset({
            email:"",
            password:""
        })
    }


    return (
        <section>
            <div className='container-login'>
                <div className='card-login'>
                    <div className='detail-regards'>
                        <p>Welcome! Enter your email and password to continue:</p>
                        <div className='info-log-data'>
                            <div className='test-data'>
                                <p>Test data</p>
                            </div>
                            <div className='data-to-login'>
                                <div className='email-icon'>
                                    <i className="fa-solid fa-envelope im"></i>
                                    <p>mason@gmail.com</p>
                                </div>
                                <div className='pass-icon'>
                                    <i className="fa-solid fa-key im"></i>
                                    <p>mason1234</p>
                                </div>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit(submit)} className="login-form">
                            <div className='email-input'>
                                <p>Email:</p>
                                <input type="email" {...register("email")}/>
                            </div>
                            <div className='pass-input'>
                                <p>Password:</p>
                                <input type="password" {...register("password")}/>
                            </div>
                            <button className='btn-form'>Log In</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LogIn;