import { FormEvent, useState } from "react";

import { api } from "../../services/api";

import {
  Container,
  FormAlert,
  Card,
  Title,
  Subtitle,
  FormDiv,
  Footer,
  Content,
  NavLink,
} from "./style";

import { Button, TextField } from "@mui/material";

import * as yup from "yup";

interface User {
  ok: boolean;
  user?: {
    name: string;
  };
  why?: string;
}

export function Home() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<User>({} as User);
  const [alert, setAlert] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const response = await api.post("/user/cadaster", {
      name: name,
      password: password,
    });

    setUser(response.data);
    console.log(response.data);

    setAlert(true);
    setName("");
    setPassword("");
  }

  return (
    <Container>
      {alert && (
        <FormAlert
          onClose={() => setAlert(false)}
          severity={user.ok ? "success" : "error"}
        >
          {user.ok
            ? `Olá ${user.user?.name}, seu cadastro foi realizado com sucesso`
            : "Houve um erro ao fazer o login"}
        </FormAlert>
      )}

      <Card>
        <Title>Cadastro</Title>

        <Subtitle>Preencha os seguintes campos</Subtitle>

        <FormDiv onSubmit={handleSubmit}>
          <TextField
            id="outlined-basic"
            label="Nome de Usuario"
            variant="outlined"
            color="primary"
            onChange={(event) => setName(event.target.value)}
            value={name}
          />

          <TextField
            id="outlined-basic"
            label="Senha"
            variant="outlined"
            color="primary"
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
          />

          <Button variant="contained" color="primary" type="submit">
            Realizar cadastro
          </Button>
        </FormDiv>

        <Footer>
          <Content>Ou se já estiver cadastrado, </Content>
          <NavLink to="/login">Faça login</NavLink>
        </Footer>
      </Card>
    </Container>
  );
}
