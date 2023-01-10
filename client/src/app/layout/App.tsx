
import { createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import AboutPage from "../../features/about/AboutPage";
import BasketPage from "../../features/basket/BasketPage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import CheckoutPage from "../../features/checkout/CheckoutPage";
import ContactPage from "../../features/contact/ContactPage";
import HomePage from "../../features/home/HomePage";
import agent from "../api/agent";
import { useStoreContext } from "../context/StoreContext";
import NotFound from "../errors/NotFound";
import { Product } from "../models/product";
import { getCookie } from "../util/util";
import Header from "./Header";
import LoadingComponent from "./LoadingComponent";

function App() {
  const {setBasket} = useStoreContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buyerId = getCookie('buyerId');
    if (buyerId) {
      agent.Basket.get()
        .then(basket => setBasket(basket))
        .catch(error => console.log(error))
        .finally(() => setLoading(false))
    } else {
      setLoading(false);
    }
  }, [setBasket])

  const[darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark':'light';
  
  const [products, setProducts] = useState<Product[]>([]);
  
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


  useEffect(() => {
    fetch('http://localhost:5021/api/products')
        .then(response => response.json())
        .then(data => setProducts(data))
    agent.Catalog.list()
        .then(products => setProducts(products))
        .catch(error => console.log(error))
        .finally(() => setLoading(false));
}, [])


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
