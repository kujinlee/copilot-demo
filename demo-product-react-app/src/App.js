import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import ProductDetail from './components/ProductDetail';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={ProductList} />
          <Route path="/products/new" component={ProductForm} />
          <Route path="/products/:id/edit" component={ProductForm} />
          <Route path="/products/:id" component={ProductDetail} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;