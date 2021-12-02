import { Container } from 'react-bootstrap';
import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';

const App = () => {
  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>
          <h1>Welcome to ProShop</h1>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
