import React, {useState, useEffect}from 'react' 
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Card, CardMedia, CardContent, Typography, Alert} from '@mui/material'
import { getProducts } from '../../actions/productAction'
import Spinner from '../Spinner'


const ProductListComponent = ({category, filters, sort}) => {
    const [ displayProducts, setDisplayProducts ] = useState([])
    const [currentFilters, setCurrentFilters ] = useState({})
    const [currentCategory, setCurrentCategory] = useState([])

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    let { loading, error, products } = productList

    useEffect(() => { 
        if(currentCategory !== category){
            setCurrentCategory(category)
            dispatch(getProducts(category))
        }
    }, [category, currentCategory, dispatch])
 
    useEffect(() => {
        if(products && !Object.values(filters).every(x => x === '') && filters !== currentFilters){
            setCurrentFilters(filters)
            setDisplayProducts(products.filter((product) => {
                for (const [key, value] of Object.entries(filters)){
                    if(value !== ''){
                        return product[key].includes(value)
                    }           
                }
            }))
        } else if (products && Object.keys(currentFilters).length === 0){
            setDisplayProducts(products)
        }
    }, [products, filters, currentFilters])

    useEffect(() =>  {
        if(sort === 'newest'){
            setDisplayProducts((prev) => 
                [...prev].sort((a, b) => a.createdAt - b.createdAt)
            )
        } else if(sort === 'asc'){
            setDisplayProducts((prev) => 
                [...prev].sort((a, b) => a.price - b.price)
            )
        }else{
            setDisplayProducts((prev) =>
                [...prev].sort((a, b) => b.price - a.price)
            )
        }
    }, [sort])

// filteredProducts ? show filtered products : show all products
    return (
        <>
        {loading && <Spinner /> } 
        {displayProducts && displayProducts.length > 0 ? (
            <Grid className="products-container" container spacing={{ xs: 2, md: 3 }} sx={{minHeight: '70vh'}}>
                { error && <Alert severity="error">{error}</Alert>}
                {displayProducts.map((product, index) => {
                    return  <Grid className="product-item" item sx={{ width:'100%' }} xs={12} sm={6} md={3} key={index}>
                        <Link to={`/products/${product._id}`}>
                        <Card sx={{ width:'100%'}}>
                            <CardMedia
                                component="img"
                                height="300"
                                image={product.image}
                                alt={product.title}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="p" sx={{ color: 'text.primary', fontSize: 22, fontWeight: 'medium' }} className="product-title">{product.title}</Typography>
                                <Typography gutterBottom variant="p" sx={{ display: 'block', color: 'text.primary', fontSize: 18, fontWeight: 'medium' }}>${product.price}</Typography>
                            </CardContent>                       
                        </Card>
                        </Link>
                    </Grid>
                })}
            </Grid>
        ) : <Alert severity="warning" sx={{display: 'block', minHeight: '70vh'}}>No Products Found...</Alert>
            }        
      
        </>
    )
}

export default ProductListComponent
