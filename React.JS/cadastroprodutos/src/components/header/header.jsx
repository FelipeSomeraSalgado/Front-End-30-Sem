import './header.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <nav className='navbar'>
        <Link to ='/'>Home</Link>
        <Link to ='/quemsomos'>Quem Somos</Link>
        <Link to ='/cadastroprodutos'>Frutas</Link>
        <Link to ='/cadastrofruta'>Produtos</Link>
    </nav>
        
  )
}

export default Header;  