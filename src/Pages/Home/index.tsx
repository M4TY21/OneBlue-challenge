import { FormEvent, useState } from "react";

import * as yup from "yup";
import { api } from "../../services/api";

import {
  Container,
  RegisterAlert,
  Card,
  ErrorMensage,
  Title,
  Subtitle,
  FormDiv,
  Footer,
  NavLink,
} from "./style";

import { Button, TextField } from "@mui/material";

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
      const response = await api.post("/user/cadaster", {
        name: name,
        password: password,
      });

      setUser(response.data);
    } catch (error) {
      setUser({
        ok: false,
      });
    }

    setAlert(true);
    setFormAlert("");
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
            ? `Olá ${user.user?.name}, seu cadastro foi realizado com sucesso`
            : "Esse usuário já existe"}
        </RegisterAlert>
      )}

      <Card>
        <Title>Cadastro</Title>

        <Subtitle>Preencha os seguintes campos</Subtitle>

        {formAlert && <ErrorMensage>{formAlert}</ErrorMensage>}

        <FormDiv onSubmit={handleSubmit}>
          <TextField
            id="outlined-basic"
            label="Nome de Usuario"
            name="name"
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
            name="password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
          />

          <Button variant="contained" color="primary" type="submit">
            Realizar cadastro
          </Button>
        </FormDiv>

        <Footer>
          <p>Ou se já estiver cadastrado, </p>
          <NavLink to="/login">Faça login</NavLink>
        </Footer>
      </Card>
    </Container>
  );
}
