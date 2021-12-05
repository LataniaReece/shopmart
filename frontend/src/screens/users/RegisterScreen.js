import React, { useEffect, useState }from 'react'
import { Link } from 'react-router-dom'
import { Typography, FormControl, TextField, Button, Box, Alert } from '@mui/material'

const RegisterScreen = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage ] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage('Passwords do not match')
            return
        }else{
            setMessage('')
        }
        console.log(username, password)
    }

    return (
        <Box className="auth-form">
            <form className="form-container" onSubmit={handleSubmit}>
            <Typography textAlign="center" variant="h4">Sign Up</Typography>
            {message && <Alert severity="error">{message}</Alert>}
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
