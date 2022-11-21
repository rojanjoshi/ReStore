
import { createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import AboutPage from "../../features/about/AboutPage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import ContactPage from "../../features/contact/ContactPage";
import HomePage from "../../features/home/HomePage";
import agent from "../api/agent";
import NotFound from "../errors/NotFound";
import { Product } from "../models/product";
import Header from "./Header";
import LoadingComponent from "./LoadingComponent";

function App() {
  const[darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark':'light';

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
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
     <div className="container" >
      <Switch>
      <Route  exact path='/' component={HomePage}/>
      <Route exact path='/catalog' component={Catalog}/>
      <Route  path='/catalog/:id' component={ProductDetails}/>
     <Route  path='/about' component={AboutPage}/>
     <Route  path='/contact' component={ContactPage}/>
     <Route component={NotFound} />
      </Switch>
   
     </div>
     </div>
    </>
  //  <ThemeProvider theme={theme}>
  //     <CssBaseline/>
  //    <Header darkMode={darkMode} handleThemeChange={handleThemeChange}/>
  //    <Container>
  //     <Route  exact path='/' component={HomePage}/>
  //     <Route exact path='/catalog' component={Catalog}/>
  //     <Route  path='/catalog/:id' component={ProductDetails}/>
  //     <Route  path='/about' component={AboutPage}/>
  //     <Route  path='/contact' component={ContactPage}/>
     
  //    </Container>
  //    </ThemeProvider>
     
   
    
  );
}

export default App;
