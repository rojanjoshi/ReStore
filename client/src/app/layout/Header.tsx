

import {  ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";


interface Props{
    darkMode:boolean;
    handleThemeChange:()=>void;
}

const midlinks = [
    {title:'Catalog',path:'/catalog'},
    {title:'About',path:'/about'},
    {title:'Contact',path:'/contact'}
  ]

  
  const rightlinks = [
    {title:'Login',path:'/login'},
    {title:'Register',path:'/register'}
    
  ]


export default function Header({darkMode, handleThemeChange}:Props){
    return(

        <>
            <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor:"#fff"}}>
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <a className="navbar-brand" href="/" style={{}}><b>Re-Store</b></a>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">

        {midlinks.map(({title,path})=>(
            <li className="nav-item" key={path}>
                <a className="nav-link active" aria-current="page" href={path}>{title}</a>
            </li>
        ))}
      </ul>
      <form className="d-flex">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <IconButton size='large' sx={{color:'inherit'}}>
                    <Badge badgeContent={4} color='secondary'><ShoppingCart/></Badge>
                </IconButton>
{rightlinks.map(({title,path})=>(
    <li className="nav-item" key={path}>
        <a className="nav-link active" aria-current="page" href={path}>{title}</a>
    </li>
))}
</ul>
      </form>
    </div>
  </div>
</nav>
      
        


        {/* <AppBar position='static' sx={{mb:4}}>
            <Toolbar>
                <Typography variant='h6' component={NavLink} to='/' sx={{color:'inherit', textDecoration:'none'}}>
                    RE-STORE
                </Typography>
                <Switch checked={darkMode} onChange={handleThemeChange}/>
                <List sx={{display:'flex'}}>
                    {midlinks.map(({title,path})=>(
                        <ListItem
                            component={NavLink}
                            to={path}
                            key={path}
                            sx={{color:'inherit',typography:'h6'}}
                        >
                            {title.toUpperCase()}
                        </ListItem>
                    ))}
                </List>

                <IconButton size='large' sx={{color:'inherit'}}>
                    <Badge badgeContent={4} color='secondary'><ShoppingCart/></Badge>
                </IconButton>

                <List sx={{display:'flex'}}>
                    {rightlinks.map(({title,path})=>(
                        <ListItem
                            component={NavLink}
                            to={path}
                            key={path}
                            sx={{color:'inherit',typography:'h6'}}
                        >
                            {title.toUpperCase()}
                        </ListItem>
                    ))}
                </List>
            </Toolbar>
        </AppBar> */}
        </>
    )
}