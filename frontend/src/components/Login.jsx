import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import Registration from './Registration';
import { Link } from "react-chrome-extension-router";


const Login = () => {
    const [formValues, setFormValues] = useState({
        email: '',
        password: ''
    });
    const [successMsg, setSuccessMsg] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log("Submited!!!!")

        const userData = {
            email: formValues.email,
            password: formValues.password
        };

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        };

        fetch('http://localhost:5000/api/users/login', requestOptions)
            .then(res => res.json())
            .then(data => setSuccessMsg(data.success))
            .catch(err => {
                err && setSuccessMsg(false)
                console.log(err)
            })

    }
    // console.log(data)

    const paperStyle = { padding: '20px', height: '75vh', width: '400px', margin: '40px auto' }
    return (
        <Box>

            <Paper elevation={10} style={paperStyle}>

                <Typography align='center' sx={{ margin: '20px 0px' }} variant='h4'>Login</Typography>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', rowGap: '15px' }}>
                    <Box>
                        <TextField
                            name='email'
                            type='email'
                            label="Email"
                            variant="standard"
                            fullWidth
                            onChange={handleChange}
                        />
                    </Box>
                    <Box>
                        <TextField
                            name='password'
                            type='password'
                            label="Password"
                            variant="standard"
                            fullWidth
                            onChange={handleChange}
                        />
                    </Box>

                    <br />

                    <Button type='submit' style={{ textTransform: 'none' }} variant='contained' fullWidth>Login</Button>
                    <Typography align='center'>Don't have an account? <Link color='primary' style={{ textDecoration: 'none' }} component={Registration}>Registration</Link></Typography>
                </form>
                {successMsg && <Typography variant='h6' align='center' color="green">Login Successfully!!</Typography>}

            </Paper>
        </Box>
    )
}

export default Login;

