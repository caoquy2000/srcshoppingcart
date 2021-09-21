import logo from './logo.svg';
// import './App.css';
import TodoFeature from './features/Todo/index';
import AlbumFeature from './features/Album';
import { Route, Link } from 'react-router-dom';
import { useEffect } from 'react';
import productApi from './api/productApi';
import CounterFeature from './features/Counter';
import Header from './component/Header';
import { Button } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import Slide from '@material-ui/core/Slide';
import ProductFeature from './features/Product/Product';
import CartFeature from './features/Cart/Cart';



function App() {
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    const params = {
      _limit: 10,
    };
    const fecthProduct = async () => {
      const productList = productApi.getAll(params);
      console.log(productList);
    };

    fecthProduct();
  }, []);
  const showNoti = () => {
    enqueueSnackbar('Register success!', {
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },
      TransitionComponent: Slide,
      variant: 'success'
    })
  }
  return (
    <div className="App">
      {/* <TodoFeature /> */}
      {/* <AlbumFeature /> */}
      <Header />
      {/* <Button onClick={showNoti}>Show noti</Button> */}
      {/* <Route path="/" component={CounterFeature} /> */}
      <Route path="/todos" component={TodoFeature} />
      <Route path="/albums" component={AlbumFeature} />
      <Route path="/products" component={ProductFeature} />
      <Route path="/cart" component={CartFeature} />

    </div>
  );
}

export default App;
