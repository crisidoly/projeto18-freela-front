import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <HeaderContainer>
            <NavLink to="/my-models">My Cats</NavLink>
            <NavLink to="/">Home</NavLink>
        </HeaderContainer>
    );
}

const HeaderContainer = styled.div`
    width: 100%;
    background-color: pink;
    height: 100px;
    top: 0;
    position: fixed;
    background-color: #AD00FF;
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

const NavLink = styled(Link)`
    text-decoration: none;
    color: white;
    font-size: 18px;
    margin: 0 10px;
`;
