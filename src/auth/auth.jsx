import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function auth() {
    const navigate = useNavigate();
    useEffect(() => {
        const isAuthenticated = localStorage.getItem("token")
        if (!isAuthenticated) navigate('/')
    }, [navigate])
    return
}

export default auth