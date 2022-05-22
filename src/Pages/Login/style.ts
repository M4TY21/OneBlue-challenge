import styled from "styled-components";

import { Link } from "react-router-dom";
import { Alert } from "@mui/material";

export const Container = styled.main`
  display: flex;
  background-color: #27272a;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const RegisterAlert = styled(Alert)`
  margin-bottom: 3rem;
`;

export const Card = styled.div`
  width: 28rem;
  min-height: 19rem;
  background-color: #fafafa;
  border: 1px solid #fafafa;
  border-radius: 0.5rem;
  align-items: center;
  align-self: center;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h1`
  font-size: 1.7rem;
  font-family: "Poppins", sans-serif;
  font-weight: bold;
  margin-top: 1rem;
`;

export const Subtitle = styled.p`
  font-size: 1rem;
  font-family: "Poppins", sans-serif;
`;

export const ErrorMensage = styled.p`
  font-size: 1rem;
  font-family: "Poppins", sans-serif;
  margin-top: 0.2rem;
  color: red;
`;

export const FormDiv = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "Poppins", sans-serif;
  gap: 0.5rem;
  margin-bottom: 0.8rem;
  margin-top: 0.6rem;
`;

export const Footer = styled.footer`
  font-family: "Poppins", sans-serif;
  display: flex;
  flex-direction: row;
  margin-bottom: 0.5rem;
`;

export const NavLink = styled(Link)`
  text-decoration: none;
  color: #1565c0;
  margin-left: 0.2rem;
`;
