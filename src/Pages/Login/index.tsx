import { FormEvent, useState } from "react";

import { api } from "../../services/api";
import * as yup from "yup";

import {
  Container,
  RegisterAlert,
  Card,
  Title,
  Subtitle,
  ErrorMensage,
  FormDiv,
  Footer,
  NavLink,
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
  const [formAlert, setFormAlert] = useState<string>("");

  async function formValidate() {
    const schema = yup.object().shape({
      name: yup.string().required("É obrigatório preencher o campo de nome"),
      password: yup
        .string()
        .required("É obrigatório preencher o campo de senha")
        .min(6, "A senha deve conter no mínimo 6 caracteres"),
    });

    try {
      await schema.validate({ name: name, password: password });
      return true;
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        setFormAlert(err.errors[0]);
        return false;
      }
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!(await formValidate())) {
      setName("");
      setPassword("");
      return;
    }

    try {
      const response = await api.post("/login", {
        name: name,
        password: password,
      });

      setUser(response.data);
    } catch (error) {
      setUser({
        ok: false,
      });
    }

    setFormAlert("");
    setAlert(true);
    setName("");
    setPassword("");
  }

  return (
    <Container>
      {alert && (
        <RegisterAlert
          onClose={() => setAlert(false)}
          severity={user.ok ? "success" : "error"}
        >
          {user.ok
            ? `Olá ${user.login}, seu login foi realizado com sucesso`
            : "Houve um erro ao fazer o login, verifique se as credencias estão certas"}
        </RegisterAlert>
      )}

      <Card>
        <Title>Login</Title>

        <Subtitle>Preencha os seguintes campos</Subtitle>

        {formAlert && <ErrorMensage>{formAlert}</ErrorMensage>}

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
          <p>Ou se ainda não houver conta, </p>
          <NavLink to="/">Faça o cadastro</NavLink>
        </Footer>
      </Card>
    </Container>
  );
}
