

import { createTheme} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AboutPage from "../../features/about/AboutPage";
import Login from "../../features/account/Login";
import Register from "../../features/account/Register";
import BasketPage from "../../features/basket/BasketPage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import CheckoutPage from "../../features/checkout/CheckoutPage";
import ContactPage from "../../features/contact/ContactPage";
import HomePage from "../../features/home/HomePage";

import NotFound from "../errors/NotFound";
import { useAppDispatch } from "../store/configureStore";
import Header from "./Header";
import LoadingComponent from "./LoadingComponent";

import 'react-toastify/dist/ReactToastify.css';
import { fetchCurrentUser } from "../../features/account/accountSlice";
import { fetchBasketAsync } from "../../features/basket/basketSlice";
import PrivateRoute from "./PrivateRoute";
import Orders from "../../features/order/Orders";

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchBasketAsync());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch])

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp])


  const[darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark':'light';
  
 
  
  const theme = createTheme({
    palette:{
      mode:paletteType,
      background:{
        default:paletteType==='light'?'#eaeaea':'#121212'
      }
    }
  })


 
  function handleThemeChange(){
    setDarkMode(!darkMode);
  }





  if (loading) return <LoadingComponent message='Loading....' />

  return (

    <>
    <ToastContainer position="bottom-right"/>
    <div style={{background:'#eaeaea'}}>
     <Header darkMode={darkMode} handleThemeChange={handleThemeChange}/>
     <div className="container" style={{padding:'30px'}} >
      <Switch>
      <Route  exact path='/' component={HomePage}/>
      <Route exact path='/catalog' component={Catalog}/>
      <Route  path='/catalog/:id' component={ProductDetails}/>
     <Route  path='/about' component={AboutPage}/>
     <Route  path='/contact' component={ContactPage}/>
     <Route  path='/basket' component={BasketPage}/>
     <PrivateRoute path='/checkout' component={CheckoutPage} />
     <PrivateRoute path='/orders' component={Orders} />
     <Route path='/login' component={Login} />
     <Route path='/register' component={Register} />
     <Route component={NotFound} />
      </Switch>
   
     </div>
     </div>
    </>

     
   
    
  );
}

export default App;
