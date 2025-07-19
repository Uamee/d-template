import Header from "../../components/examples/organisms/Header";

export default function Home() {
  return (
    <>
      <Header />
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h1>Bem-vindo à Home!</h1>
        <p>Você está logado com sucesso.</p>
      </div>
    </>
  );
}