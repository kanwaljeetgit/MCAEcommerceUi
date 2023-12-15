import { Provider } from 'react-redux';
import './App.css';
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import store from './store';
import Home from './screens/Home';
import Cart from './screens/Cart'
import OrderScreen from './screens/OrderScreen';
import LogIn from './components/LogIn';

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<OrderScreen />} />
        </Routes>
      </Provider>
    </Router>
  );
}

export default App;
