import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function ResetPassword() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const navigate = useNavigate()
    const submitHandler = async (e) => {
        e.preventDefault()
        if (confirmPassword === password) {
            console.log('password match!')
            const result = await axios.patch('http://localhost:5011/reset-password', { email, password })
            if (result.status === 200) {
                console.log('password change was successful!')
                navigate('/')
            }


        }
    }
    return (
        <>
            <div className='form-parent'>

                <div className="form-container-reset">

                    <h2>Forgot Password</h2>

                    <form className="form" onSubmit={submitHandler}>
                        <div className="form-group">
                            <input type="text" id="email" name="email" placeholder="Enter your email" required="" onChange={(e) => setEmail(e.target.value)} value={email} />
                            <input type="password" id="password" name="password" placeholder="Enter password" required="" onChange={(e) => setPassword(e.target.value)} value={password} />
                            <input type="password" id="confirmPassword" name="password" placeholder="Confirm password" required="" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />
                        </div>

                        <button className="form-submit-btn" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ResetPassword