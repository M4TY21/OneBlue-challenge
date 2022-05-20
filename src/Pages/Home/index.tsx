import {
  Container,
  Card,
  Title,
  Label,
  FormInput,
  Button,
  Footer,
  Content,
  Linked
} from './style'

export function Home() {
  return (
    <Container>
      <Card>
        <Title>Cadastro</Title>

        <Label>Nome do usuario:</Label>
        <FormInput type="text" />
        <Label>Senha:</Label>
        <FormInput type="password" />

        <Button>Realizar Cadastro</Button>

        <Footer>
          <Content>Ou se já estiver cadastrado, </Content>
          <Linked href="#">Faça login</Linked>
        </Footer>
      </Card>
    </Container>
  )
}
