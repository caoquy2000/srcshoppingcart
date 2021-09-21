import React from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Paper, Grid, makeStyles, LinearProgress } from '@material-ui/core';
import ProductThumbnail from '../components/ProductThumbnail';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import useProductDetail from '../hooks/useProductDetail';
import ProductInfo from '../components/ProductInfo';
import AddToCartForm from '../components/AddToCartForm';
import ProductMenu from '../components/ProductMenu';
import ProductDescription from '../components/ProductDescription';
import ProductAdditional from '../components/ProductAdditional';
import ProductReview from '../components/ProductReview';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../Cart/cartSlice';

const useStyles = makeStyles((theme) => ({
    root: {},
    left: {
        width: '400px',
        padding: theme.spacing(1.5),
        borderRight: `1px solid ${theme.palette.grey[300]}`,
    },
    right: {
        flex: '1 1 0',
        padding: theme.spacing(1.5),
    },
    loading: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
    },
}));

DetailPage.propTypes = {

};

function DetailPage(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { params: { productId }, url } = useRouteMatch();
    const { product, loading } = useProductDetail(productId);
    if (loading) {
        return <Box className={classes.loading}>
            <LinearProgress />
        </Box>
    }

    const handleAddToCartSubmit = (values) => {
        const action = addToCart({
            id: product.id,
            product,
            quantity: values.quantity,
        });
        console.log(action);
        dispatch(action);
    }

    return (
        <Box className={classes.root}>
            <Container>
                <Paper elevation={0}>
                    <Grid container>
                        <Grid item className={classes.left}>
                            <ProductThumbnail product={product} />
                        </Grid>
                        <Grid item className={classes.right}>
                            <ProductInfo product={product} />
                            <AddToCartForm onSubmit={handleAddToCartSubmit} />
                        </Grid>
                    </Grid>
                </Paper>
                <ProductMenu />
                <Switch>
                    <Route exact path={url}>
                        <ProductDescription product={product} />
                    </Route>
                    <Route exact path={`${url}/additional`}>
                        <ProductAdditional />
                    </Route>
                    <Route exact path={`${url}/reviews`}>
                        <ProductReview />
                    </Route>
                </Switch>
            </Container>
        </Box>
    );
}

export default DetailPage;