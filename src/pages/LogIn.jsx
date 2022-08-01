import React from 'react';

const LogIn = () => {
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
                                    <p>jack@gmail.com</p>
                                </div>
                                <div className='pass-icon'>
                                    <i className="fa-solid fa-key im"></i>
                                    <p>jack1234</p>
                                </div>
                            </div>
                        </div>
                        <div className='email-input'>
                            <p>Email:</p>
                            <input type="text" />
                        </div>
                        <div className='pass-input'>
                            <p>Password:</p>
                            <input type="password" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LogIn;