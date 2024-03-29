import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Product } from "../../app/models/product";
import { useAppSelector, useAppDispatch } from "../../app/store/configureStore";
import { addBasketItemAsync } from "../basket/basketSlice";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {

  const {status} = useAppSelector(state => state.basket);
  const dispatch = useAppDispatch();

  return (
    
    <Card sx={{mb:'0px'}}>
      <CardHeader
        avatar={
        <Avatar sx={{bgcolor:'secondary.main'}}>
          {product.name.charAt(0).toUpperCase()}</Avatar>
          }
          title={product.name}
          titleTypographyProps={{sx:{fontWeight:'bold',color:'primary.main'}}}
      />

      <CardMedia
        
      image={product.pictureUrl}
      title={product.name}
      sx={{height:140,backgroundSize:'contain',bgcolor:'primary.light'}}
          
      />
      <CardContent>
        <Typography gutterBottom variant="h5" color='secondary'>NPR {(product.price/100).toFixed(2)}</Typography>
        <Typography variant="body2" color="text.secondary">
       {product.brand} / {product.type}
        </Typography>
      </CardContent>
      <CardActions>
      <LoadingButton
                         loading={status.includes('pendingAddItem' + product.id)}
                         onClick={() => dispatch(addBasketItemAsync({productId: product.id}))}
                    size="small">
                    Add to cart
                </LoadingButton>
                <Button component={Link} to={`/catalog/${product.id}`} size="small">View</Button>
      </CardActions>
    </Card>
    
    
  );
}


