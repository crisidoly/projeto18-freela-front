import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import CatImage from "../assets/login.jpg";

export default function SignInPage() {
  return (
    <>
      <SignInContainer>
        <Info>
          <Left></Left>
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
  margin: 0;
  padding: 0;
`;

const Info = styled.div`
  height: 800px;
  width: 1200px;
  border-radius: 70px;
  border: solid 10px #ad00ff;
  display: flex;
`;

const Left = styled.div`
  height: 100%;
  width: 50%;
  display: flex;
  background-color: white;
  border-radius: 60px 0 0 60px;
`;

const Right = styled.div`
  height: 100%;
  width: 50%;
  border-radius: 12px;
  background-color: black;
  background: center/cover url(${(props) => props.bgImg.src}) no-repeat;

  @media screen and (max-width: 600px) {
    width: 100%;
    height: 100%;
  }
`;
