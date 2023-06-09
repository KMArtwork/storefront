import React from "react";
import { useLocation } from "react-router";
import { Card, CardActions, CardContent, CardHeader, Typography, CardMedia, Box, Button } from "@mui/material";
import { addItemToCart } from "../../store/products";
import { modifyServerSideStock } from "../../store/cart";
import cartSlice from "../../store/cart";
import { useSelector, useDispatch } from "react-redux";


function ProductDetails(props) {

  const cartState = useSelector(storefrontState => storefrontState.cart);
  let { state } = useLocation();
  let { addToCart } = cartSlice.actions;
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    // if product IS NOT in cart, add it to cart
    if (!cartState.items.find(item => item._id === product._id)) {
      dispatch(addItemToCart(product._id))
      .then(dispatch(addToCart(product)));  
    } 
    // otherwise, the product IS in the cart and we need to update the quantity of the item
    else {
      dispatch(modifyServerSideStock(product, 1));
    }
  }


  return(
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
      <Card sx={{width: '45%', height: '100%', alignSelf: 'center'}}>
        <CardHeader title={state.product.name} subheader={state.product.category} />
        <CardMedia
          sx={{height: 400, margin: '1rem'}} 
          image='https://placehold.co/500.png'
        />
        <CardContent sx={{display: 'flex', justifyContent: 'space-between'}}>
          <Typography variant="h6" sx={{color: 'grey'}}>
            {`In Stock: ${state.product.inStock}`}
          </Typography>
          <Typography variant="h6">
            {`$${state.product.price}`}
          </Typography>
        </CardContent>
        <CardActions sx={{justifyContent: 'center'}}>
          {state.product.inStock > 0 ?
            <Button variant="contained" onClick={() => handleAddToCart(state.product)} sx={{width: '100%'}}>
              {`Add To Cart`}
            </Button>                    
          : 
            <Button disabled >Out of Stock</Button>
          }
        </CardActions>
      </Card>
      <Box sx={{width: '45%'}}>
        <p>Reviews: </p> {/* import Rating from Material UI */}
        <p>Related Products: </p> {/* use cards? accordion? */}
      </Box>       
    </div>
   
  )

}

export default ProductDetails;