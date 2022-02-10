import React, {useState} from 'react';
import styled from 'styled-components/macro';
import { InputText, Button } from './globalStyledComponents';
import {useDispatch} from 'react-redux'
import axios from 'axios'

const Container = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(6px);
    height: 100vh;
    width: 100vw;
    z-index: 10;
`
const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    width: 100%;
    background-color: dodgerblue;
    color: white;
    margin-bottom: 1rem;
`

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 25vh;
    /* background-color: #121212; */
`
const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    align-items: center;
`

const InputTextEdit = styled(InputText)`
    margin-bottom: 1rem;
`

function Register(props) {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const [state, setState] = useState({
        username: "",
        password: "",
        email: ""
    });

    const handleState = (e) =>{
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    const RegisterRequest = (e) =>{
        e.preventDefault();
        axios({
            method: "POST",
            url: `${import.meta.env.VITE_APP_API_URL}/user/register`,
            data: {username: state.username, password: state.password, email: state.email},
            withCredentials: true
        }).then((data) => {
            if(data.data.errors){
                console.log(data.data.errors);
                setErrors(data.data.errors);
            }else{
                console.log(data.data);
            }
        });
    }
    return (
        <Container>
            <FormContainer>
                <HeaderContainer>
                    <h1>Register</h1>
                    {errors && errors.map((error, i) => <p style={{color: "black", fontWeight: "bold"}} key={i}>{error}</p>)}
                </HeaderContainer>
                <InputTextEdit type="text" name="username" value={state.username} onChange={handleState} />
                <InputTextEdit type="password" name="password" value={state.password} onChange={handleState} />
                <InputTextEdit type="email" name="email" value={state.email} onChange={handleState} />
                <ButtonContainer>
                <Button onClick={RegisterRequest} pad="1rem" bold>Register</Button>
                <Button type="button" pad="1rem" bold bg="crimson" bgh="red" onClick={()=> props.toggle()}>CANCLE</Button>

                </ButtonContainer>
            </FormContainer>
        </Container>
    )
}

export default Register;
