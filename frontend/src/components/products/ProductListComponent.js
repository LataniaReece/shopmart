import React, {useEffect}from 'react' 
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Card, CardMedia, CardContent, CardActions, Typography, Button} from '@mui/material'
import { getProducts } from '../../actions/productAction'
import Spinner from '../Spinner'


const ProductListComponent = ({category, filters, sort}) => {

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    let { loading, error, products } = productList

    useEffect(() => {
        dispatch(getProducts(category))
    }, [])


    return (
        <Grid className="products-container" container spacing={{ xs: 2, md: 3 }}>
            {loading ? <Spinner /> : (
                products.map((product, index) => {
                    return  <Grid item sx={{ width:'100%' }} xs={12} sm={6} md={3} key={index}>
                     <Card sx={{ width:'100%'}}>
                        <CardMedia
                            component="img"
                            height="300"
                            image={product.image}
                            alt={product.title}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="p" sx={{ color: 'text.primary', fontSize: 22, fontWeight: 'medium' }} className="product-title">{product.title}</Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Share</Button>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                    </Grid>
                })
            )}
        </Grid>
    )
}

export default ProductListComponent
