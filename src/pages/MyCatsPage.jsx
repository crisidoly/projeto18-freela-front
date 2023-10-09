import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header.jsx";

export default function MyCatsPage() {
  const navigate = useNavigate();
  const [cats, setCats] = useState([]);
  const [newCat, setNewCat] = useState({ name: "", feature: "", photo: "" });
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(`${import.meta.env.VITE_API_URL}/my-models`, config)
      .then((res) => setCats(res.data))
      .catch((error) => alert(error.response.data));
  }, [userId]);

  const toggleCatState = (catId, isActive) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    
    axios
      .put(
        `${import.meta.env.VITE_API_URL}/cats/${catId}/update-availability`,
        { active: !isActive }, // Inverte o valor do active
        config
      )
      .then((res) => {
        const updatedCats = cats.map((cat) =>
          cat.id === catId ? { ...cat, active: !isActive } : cat
        );
        setCats(updatedCats);
      })
      .catch((error) => {
        console.error("Erro ao atualizar o estado do gato:", error);
        alert(error.response.data);
      });
  };

  const handleCreateCat = () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post(`${import.meta.env.VITE_API_URL}/register-cat`, newCat, config)
      .then((res) => {
        setCats([...cats, res.data]);
        setNewCat({ name: "", feature: "", photo: "" });
      })
      .catch((error) => alert(error.response.data));
  };

  return (
    <>
      <ContainerGeral>
        <Header />
        <CatsAndFormContainer>
          <CatsContainer>
            {cats.map((cat) => (
              <CatContainer
                key={cat.id}
                onClick={() => navigate(`/cats/${cat.id}/update-availability`)}
              >
                <div>
                  <img src={cat.photo} alt="cat-photo" />
                  <h1>{cat.name}</h1>
                </div>
                <h2>{cat.feature}</h2>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCatState(cat.id, cat.active);
                  }}
                >
                  {cat.active ? "Desativar" : "Ativar"}
                </button>
              </CatContainer>
            ))}
          </CatsContainer>
          <Form>
            <h2>New meowdel</h2>
            <input
              type="text"
              placeholder="Name"
              value={newCat.name}
              onChange={(e) => setNewCat({ ...newCat, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Description"
              value={newCat.feature}
              onChange={(e) =>
                setNewCat({ ...newCat, feature: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Photo URL"
              value={newCat.photo}
              onChange={(e) => setNewCat({ ...newCat, photo: e.target.value })}
            />
            <button onClick={handleCreateCat}>Prrrr</button>
          </Form>
        </CatsAndFormContainer>
      </ContainerGeral>
    </>
  );
}

const ContainerGeral = styled.div`
  background-color: pink;
`;

const CatContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  cursor: pointer;
  padding-bottom: 20px;
  margin-right: 10px;
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
  button {
    background-color: #ad00ff;
    width: 100%;
    border: none;
    color: white;
    cursor: pointer;
  }
`;

const CatsAndFormContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Form = styled.form`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  input {
    background-color: transparent;
    border: solid 2px #ad00ff;
    border-radius: 0px;
    width: 100%;
  }
  button {
    background-color: #ad00ff;
    width: 100%;
  }
`;

const CatsContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #010e25;
  display: flex;
`;
