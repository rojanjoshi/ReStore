
import { createTheme} from "@mui/material";
import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import AboutPage from "../../features/about/AboutPage";
import BasketPage from "../../features/basket/BasketPage";
import { setBasket } from "../../features/basket/basketSlice";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import CheckoutPage from "../../features/checkout/CheckoutPage";
import ContactPage from "../../features/contact/ContactPage";
import HomePage from "../../features/home/HomePage";
import agent from "../api/agent";

import NotFound from "../errors/NotFound";
import { useAppDispatch } from "../store/configureStore";
import { getCookie } from "../util/util";
import Header from "./Header";
import LoadingComponent from "./LoadingComponent";

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buyerId = getCookie('buyerId');
    if (buyerId) {
      agent.Basket.get()
        .then(basket => dispatch(setBasket(basket)))
        .catch(error => console.log(error))
        .finally(() => setLoading(false))
    } else {
      setLoading(false);
    }
  }, [setBasket])

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
     <Route  path='/checkout' component={CheckoutPage}/>
     <Route component={NotFound} />
      </Switch>
   
     </div>
     </div>
    </>

     
   
    
  );
}

export default App;
