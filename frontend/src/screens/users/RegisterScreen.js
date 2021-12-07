import React, { useEffect, useState }from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Typography, FormControl, TextField, Button, Box, Alert } from '@mui/material'
import { register } from '../../actions/userActions'

const RegisterScreen = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage ] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo } = userLogin

    const userRegister = useSelector(state => state.userRegister)
    const { error, success } = userRegister

    
    useEffect(() =>{
        // if(success){
        //     dispatch({
        //         type: SET_GLOBAL_ALERT,
        //         payload: {
        //             alert: 'Welcome back!',
        //             alertType: 'success'
        //         }
        //     })
        //     history.push(redirect)
        // }
        // if(userInfo){
        //     return history.push(redirect)
        // }
        if(success){
            navigate('/')
        }
        if(userInfo){
            return navigate('/')
        }
    }, [success, navigate, dispatch, userInfo])

    const handleSubmit = (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage('Passwords do not match')
            return
        }else{
            setMessage('')
            dispatch(register(username, email, password))
        }
        console.log(username, password)
    }

    return (
        <Box className="auth-form">
            <form className="form-container" onSubmit={handleSubmit}>
            <Typography textAlign="center" variant="h4">Sign Up</Typography>
            {message && <Alert severity="error">{message}</Alert>}
            {error && <Alert severity="error">{error}</Alert>}
            <div>   
                <FormControl sx={{mt:3, width: '100%'}}>
                    <TextField 
                        name="email" 
                        type="email"
                        label="Email Address" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                        variant="outlined"
                    />
                </FormControl>
                <FormControl sx={{mt:3, width: '100%'}}>
                    <TextField 
                        name="username" 
                        type="text"
                        label="Username" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} 
                        variant="outlined"
                    />
                </FormControl>
                <FormControl sx={{mt:3, width: '100%'}}>
                    <TextField 
                        name="password" 
                        type="password"
                        label="Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                        variant="outlined"
                    />
                </FormControl>
                <FormControl sx={{mt:3, width: '100%'}}>
                    <TextField 
                        name="confirmPassword" 
                        type="password"
                        label="Confirm Password" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        variant="outlined"
                    />
                </FormControl>
            </div>
            <Button 
                variant="contained" 
                sx={{mt:5, width:"100%"}}
                type="submit"
            > 
                Submit
            </Button>
            <Typography component="p" variant="p" color="light" sx={{mt:3}}>Already have an account? <Link to="/login">Sign In Here</Link></Typography>
            </form>        
        </Box>
    )
}

export default RegisterScreen
