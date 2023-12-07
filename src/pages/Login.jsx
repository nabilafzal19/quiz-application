import React, { useState } from 'react'
import axios from 'axios'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
const googleClientId = import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID;
const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleGoogleLogin = async responseData => {
        const result = await axios.post('http://localhost:5011/login', { credential: responseData.credential })
        if (result.data.status) navigate('/questions')
        console.log(result.data)
    }
    const signupHandler = () => {
        navigate('/signup')
    }
    const submitHandler = (e) => {
        e.preventDefault();
        console.log(email)
        console.log(password)
        const configuration = {
            method: "post",
            url: "http://localhost:5011/login",
            data: {
                email,
                password,
            },
        }
        axios(configuration)
            .then((result) => {
                console.log(result);

                if (result.status) {

                    navigate('/questions')
                }
            })
            .catch((error) => { console.log(error); })
    }

    const resetHandler = () => {
        navigate('/forgot-password')
    }
    return (
        <>
            <div className='form-parent'>
                <div className="form-container">
                    <p className="title">Welcome back</p>
                    <form className="form" onSubmit={submitHandler}>
                        <input type="email" className="input" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} />
                        <input type="password" className="input" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
                        <p className="page-link">
                            <span className="page-link-label" onClick={resetHandler}>Forgot Password?</span>
                        </p>
                        <button className="form-btn" type="submit">Log in</button>
                    </form>
                    <p className="sign-up-label">
                        Don't have an account?<span className="sign-up-link" onClick={signupHandler}>Sign up</span>
                    </p>
                    <div className="buttons-container">

                        <div className="google-login-button">
                            <GoogleOAuthProvider clientId={googleClientId}>
                                <GoogleLogin
                                    onSuccess={handleGoogleLogin}
                                />

                            </GoogleOAuthProvider>
                        </div>


                    </div>

                </div>
            </div>


        </>
    )
}

export default Login