import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { ShoppingCart } from '../components/componentProducts/ShoppingCart.jsx';
import { Cart } from '../components/componentProducts/Cart.jsx';
import MainPage from './componentStart/MainPage'
import Nav from './componentNav/Nav'
import Sugerencias from './coponentSugerencia/sugerencia.jsx'
import Footer from './componentFooter/footer.jsx'
import Principal from './componentAPI/Principal.jsx';
import Products from './componentMongo/API2.jsx';

import camisa1 from './img/camisa1.jpg'
import camisa2 from './img/camisa2.jpg'
import camisa3 from './img/camisa3.jpg'
import camisa4 from './img/camisa4.jpg'

const camisetas = [
  { id: 1, img: camisa1, name: 'Camisa Milan', price: 70000, },
  { id: 2, img: camisa2, name: 'Camisa Milan', price: 70000, },
  { id: 3, img: camisa3, name: 'Camisa Colombia', price: 65000, },
  { id: 4, img: camisa4, name: 'Camisa Manchester U', price: 70000 }
];

function App() {

  return (
    <>
      <Nav />
      <MainPage camisetas={camisetas} />
      <Provider store={store}>
        <div className="card">
          <div className="product-list">
            <ShoppingCart />
          </div>
          <Cart />
        </div>
      </Provider>
      <Sugerencias />
      <Principal />
      <Products />
      <Footer />
    </>
  )
}

export default App
