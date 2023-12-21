import React, { useState } from 'react'
import axios from 'axios'

function ForgetPassword() {
    const [email, setEmail] = useState('')
    const submitHandler = async (e) => {
        e.preventDefault()
        const result = await axios.post('http://localhost:5011/forgot-password', { email })
        if (result.status === 200) {
            console.log('mail sent for password reset!')
            navigate('/reset-password')
        }


    }
    return (
        <div className='form-parent'>

            <div className="form-container-reset">

                <h2>Forgot Password</h2>

                <form className="form" onSubmit={submitHandler}>
                    <div className="form-group">
                        <input type="text" id="email" name="email" placeholder="Enter your email" required="" onChange={(e) => setEmail(e.target.value)} value={email} />
                    </div>

                    <button className="form-submit-btn" type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default ForgetPassword