import { FormEvent, useState } from 'react'

import {
  Container,
  Card,
  Title,
  Subtitle,
  FormDiv,
  Footer,
  Content,
  Teste
} from './style'

import { Button, TextField } from '@mui/material'

export function Home() {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    console.log(name, password)
  }

  return (
    <Container>
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
