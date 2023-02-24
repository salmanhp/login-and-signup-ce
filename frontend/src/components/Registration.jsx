import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { Link, goBack } from "react-chrome-extension-router";


const Registration = () => {
    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });
    const [successMsg, setSuccessMsg] = useState(null);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const newUser = {
            name: formValues.name,
            email: formValues.email,
            password: formValues.password,
            password2: formValues.password2
        };

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser)
        };

        fetch('http://localhost:5000/api/users/register', requestOptions)
            .then(res => res.json())
            .then(data => data && setSuccessMsg(true))
            .catch(err => console.log(err))

    }

    const paperStyle = { padding: '20px', height: '80vh', width: '400px', margin: '40px auto' }
    return (
        <Box>

            <Paper elevation={10} style={paperStyle}>

                <Typography align='center' sx={{ margin: '20px 0px' }} variant='h4'>Registration</Typography>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', rowGap: '15px' }}>
                    <Box>
                        <TextField
                            name='name'
                            type='text'
                            label="Name"
                            variant="standard"
                            fullWidth
                            onChange={handleChange}
                        />
                    </Box>

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
                    <Box>
                        <TextField
                            name='password2'
                            type='password'
                            label="Confirm Password"
                            variant="standard"
                            fullWidth
                            onChange={handleChange}
                        />
                    </Box>

                    <br />

                    <Button type='submit' style={{ textTransform: 'none' }} variant='contained' fullWidth>Registration</Button>
                    <Typography align='center'>Already have an account? <Link color='primary' style={{ textDecoration: 'none' }} onClick={goBack}>Login</Link></Typography>
                </form>
                {successMsg && <Typography variant='h6' align='center' color="green">Registration Successfully!!</Typography>}

            </Paper>
        </Box>
    )
}


export default Registration;





