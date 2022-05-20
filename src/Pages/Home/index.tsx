import { FormEvent, useState } from 'react'

import {
  Container,
  FormAlert,
  Card,
  Title,
  Subtitle,
  FormDiv,
  Footer,
  Content,
  Teste
} from './style'

import { Button, TextField } from '@mui/material'

import * as yup from 'yup'

interface User {
  name: string
  password: string
}

export function Home() {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState<User>({} as User)
  const [alert, setAlert] = useState(false)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    setUser({
      name: name,
      password: password
    })

    console.log(user)

    setAlert(true)
    setName('')
    setPassword('')
  }

  return (
    <Container>
      {alert && (
        <FormAlert onClose={() => setAlert(false)}>
          This is a success alert — check it out!
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
            onChange={event => setName(event.target.value)}
            value={name}
          />

          <TextField
            id="outlined-basic"
            label="Senha"
            variant="outlined"
            color="primary"
            type="password"
            onChange={event => setPassword(event.target.value)}
            value={password}
          />

          <Button variant="contained" color="primary" type="submit">
            Realizar cadastro
          </Button>
        </FormDiv>

        <Footer>
          <Content>Ou se já estiver cadastrado, </Content>
          <Teste to="/login">Faça login</Teste>
        </Footer>
      </Card>
    </Container>
  )
}
