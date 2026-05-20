import './App.css';
import CadastroProdutosPage from './pages/cadastroprodutos/cadastroprodutospage';
import QuemSomos from './pages/quemSomos/quemSomos';
import CadastroFrutaPage from './pages/cadastrofruta/cadastrofrutapage';
import Homepage from './pages/home/homepage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/header/header';

function App() {
  return (
   <> 

    <BrowserRouter>
    <Header />
      <Routes>
        <Route element={<Homepage />} path="/" />
        <Route element={<QuemSomos />} path="/quemsomos" />
        <Route element={<CadastroProdutosPage />} path="/cadastroprodutos" />
        <Route element={<CadastroFrutaPage />} path="/cadastrofruta" />
      </Routes>
    </BrowserRouter>
   </>      
  )
}

export default App;