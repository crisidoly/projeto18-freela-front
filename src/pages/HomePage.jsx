import styled from "styled-components";
import Header from "../components/Header.jsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function HomePage() {
  const navigate = useNavigate();
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token"); 
    if (!token) {
      navigate("/signin");
      return;
    }

    axios
      .get(`${import.meta.env.VITE_API_URL}/available-cats`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setCats(res.data))
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          navigate("/signin"); 
        } else {
          alert(error.response.data);
        }
      });
  }, [navigate]);


  return (
    <>
      <HomeContainer>
        <Header />
        <CatsContainer> 
          {cats.map((cat) => (
            <CatContainer
              key={cat.id} 
              onClick={() => navigate(`/available-cats/${cat.id}`)}>
              <div>
                <img src={cat.photo} alt="cat-photo" /> 
                <h1>{cat.name}</h1> 
              </div>
              <h2>{cat.feature}</h2> 
            </CatContainer>
          ))}
          
        </CatsContainer> 
      </HomeContainer>
    </>
  );
}

const HomeContainer = styled.section`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #010e25;
  display: flex;
`;

const CatsContainer = styled.div`
  display: flex;
  justify-content: left;
  margin-left: auto;
  margin-right: auto;
  flex-wrap: wrap;
  gap: 20px;
  width: calc(100% - 300px);
`;

const CatContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  cursor: pointer;
  padding-bottom: 20px;
  border-radius: 10px;
  background-color: white;
  width: 300px;
  img {
    width: 300px;
    height: 300px;
    border-radius:8px 8px 0 0 ;
  }
  > div {
    display: flex;
    position: relative;
    h1 {
      position: absolute;
      margin-top: 10px;
      margin-left: 10px;
      color: white;
      font-size: 34px;
    }
  }
  h2 {
    margin-left: 10px;
  }
`;
