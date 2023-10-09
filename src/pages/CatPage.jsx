import axios from "axios";
import { useEffect, useState } from "react"; // Importe useState
import { useParams, useNavigate } from "react-router-dom"; // Importe useParams e useNavigate
import styled from "styled-components";
import Header from "../components/Header.jsx";

export default function CatPage() {
  const { id } = useParams();
  const navigate = useNavigate(); // Obtenha a função de navegação

  // Defina um estado para armazenar os detalhes do gato
  const [catDetails, setCatDetails] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(`${import.meta.env.VITE_API_URL}/available-cats/${id}`, config)
      .then((res) => {
        // Atualize o estado com os detalhes do gato recebidos da API
        setCatDetails(res.data);
      })
      .catch((error) => alert(error.response.data));
  }, [id]);

  return (
    <>
      <Container>
        <Header />
        {catDetails && ( 
        <>
          <CatContainer>
           
            <img src={catDetails.photo} alt="cat-photo" />
            <h1>{catDetails.name}</h1>
            
            <h1>{catDetails.feature}</h1>
            <h2>Tutor name:{catDetails.ownername}</h2>
            <h2>Tutor phone: {catDetails.ownerphone}</h2>
          </CatContainer>
          </>
        )}
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 150px;
  padding-bottom: 100px;
  background-color: #010e25;
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
    border-radius: 8px 8px 0 0;
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
const OwnerContainer = styled.div`
`