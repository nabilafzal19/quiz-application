import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
const googleClientId = import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID;

function Signup() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const submitHandler = (e) => {
        e.preventDefault();
        console.log(email)
        console.log(password)
        const configuration = {
            method: "post",
            url: "http://localhost:5011/signup",
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
    const handleGoogleSignup = async (responseData) => {
        const result = await axios.post('http://localhost:5011/login', { credential: responseData.credential })
        if (result.data.status) navigate('/questions')
    }
    const loginNavigatorHandler = () => {
        navigate('/')
    }
    return (
        <>
            <div className='form-parent'>
                <div className="form-container">
                    <p className="title">Register</p>
                    <form className="form" onSubmit={submitHandler}>
                        <input type="email" className="input" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} />
                        <input type="password" className="input" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
                        <button className="form-btn" type="submit">Sign Up</button>
                    </form>
                    <p className="sign-up-label">
                        Already have an account?<span className="sign-up-link" onClick={loginNavigatorHandler}>Login</span>
                    </p>
                    <div className="buttons-container">

                        <div className="google-login-button">
                            <GoogleOAuthProvider clientId={googleClientId}>
                                <GoogleLogin
                                    onSuccess={handleGoogleSignup}
                                />

                            </GoogleOAuthProvider>
                        </div>


                    </div>

                </div>
            </div>


        </>
    )
}

export default Signup