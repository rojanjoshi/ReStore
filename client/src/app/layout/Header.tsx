import { ShoppingCart } from "@mui/icons-material";
import {
  Badge,
  IconButton,
  List,
  ListItem,
} from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";
import SignedInMenu from "./SignedInMenu";

interface Props {
  darkMode: boolean;
  handleThemeChange: () => void;
}

const midlinks = [
  { title: "Catalog", path: "/catalog" },
  { title: "About", path: "/about" },
  { title: "Contact", path: "/contact" },
];

const rightLinks = [
  { title: "Login", path: "/login" },
  { title: "Register", path: "/register" },
];

export default function Header({ darkMode, handleThemeChange }: Props) {
  
  const { user } = useAppSelector(state => state.account);
  const {basket} = useAppSelector(state => state.basket);
  const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0)
 
  return (

    <>
      <nav
        className="navbar navbar-expand-lg navbar-light"
        style={{ backgroundColor: "#fff" }}
      >
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <a className="navbar-brand" href="/" style={{}}>
            <b>Re-Store</b>
          </a>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {midlinks.map(({ title, path }) => (
                <li className="nav-item" key={path}>
                  <a
                    className="nav-link active"
                    aria-current="page"
                    href={path}
                  >
                    {title}
                  </a>
                </li>
              ))}
            </ul>
            <form className="d-flex">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <IconButton component={Link} to='/basket' size="large" sx={{ color: "inherit" }}>
                  <Badge badgeContent={itemCount} color="secondary">
                    <ShoppingCart />
                  </Badge>
                </IconButton>
                {user ? (
                        <SignedInMenu />
                    ) : (
                        <List sx={{ display: 'flex' }}>
                            {rightLinks.map(({ title, path }) => (
                              <ListItem
                                component={NavLink}
                                to={path}
                                key={path}
                                
                              >
                                {title.toUpperCase()}
                              </ListItem>
                            ))}
                        </List>
                    )}
              </ul>
            </form>
          </div>
        </div>
      </nav>


    </>
  );
}
