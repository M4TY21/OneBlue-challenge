import { FormEvent, useState } from "react";
import { api } from "../../services/api";

import {
  Container,
  Card,
  Title,
  Subtitle,
  FormDiv,
  Footer,
  Content,
  NavLink,
  FormAlert,
} from "./style";

import { Button, TextField } from "@mui/material";

interface LoginUser {
  ok: boolean;
  login?: string;
  why?: string;
}

export function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<LoginUser>({} as LoginUser);
  const [alert, setAlert] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const response = await api.post("/login", {
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
            ? `Olá ${user.login}, seu login foi realizado com sucesso`
            : "Houve um erro ao fazer o login"}
        </FormAlert>
      )}

      <Card>
        <Title>Login</Title>

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
            Realizar login
          </Button>
        </FormDiv>

        <Footer>
          <Content>Ou se ainda não houver conta, </Content>
          <NavLink to="/">Faça o cadastro</NavLink>
        </Footer>
      </Card>
    </Container>
  );
}
