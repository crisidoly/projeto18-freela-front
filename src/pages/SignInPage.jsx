import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import CatImage from "../assets/login.jpg";
import { useState } from "react";
import axios from "axios";

export default function SignInPage() {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  const navigate = useNavigate();

  function signIn(e) {
    e.preventDefault();
    const enter = { email, password };

    axios.post(`${import.meta.env.VITE_API_URL}/signin`, enter)
      .then(res => {
        localStorage.setItem("token", (res.data.token));
        localStorage.setItem("userId", (res.data.userId))
        navigate("/");
      })
      .catch(erro => alert(erro.response.data));
  }

  return (
    <>
      <SignInContainer>
        <Info>
          <Left>
            <Form onSubmit={signIn}>
              <input placeholder="E-mail" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
              <input placeholder="Password" type="password" autoComplete="new-password" value={password} onChange={e => setPassword(e.target.value)} required />
              <button type="submit"><ion-icon name="log-in-outline"></ion-icon> ENTRAR</button>
              <Link to={"/signup"} >
              Don't have an account? Register NOW!
              </Link>
            </Form>
          </Left>
          <Right bgImg={CatImage}></Right>
        </Info>
      </SignInContainer>
    </>
  );
}

const SignInContainer = styled.section`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #010e25;
`;

const Info = styled.div`
  height: 600px;
  width: 1000px;
  border-radius: 70px;
  border: solid 10px #ad00ff;
  display: flex;
`;

const Left = styled.div`
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: column;
  border-radius: 60px 0 0 60px;
  justify-content: space-around;
`;

const Right = styled.div`
  height: 100%;
  width: 50%;
  border-radius: 0 58px 58px 0;
  display: flex;
  background-image: url(${props => props.bgImg});
  background-size: cover; 
  background-position: center; 
`;

const Form = styled.form`

  input {
    background-color: transparent;
    border: solid 2px #ad00ff; 
    border-radius: 0px;
    width: 80%;
  }
  
  button {  
    background-color: #ad00ff;
  }
`;
