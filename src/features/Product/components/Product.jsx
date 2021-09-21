import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { Typography } from '@material-ui/core';
import { STATIC_HOST } from '../../../constants';
import { THUMBNAIL_PLACEHOLDER } from '../../../constants';
import { useHistory } from 'react-router-dom';
import { formatPrice } from '../../../ultis';


Product.propTypes = {
    product: PropTypes.object,
};

function Product({ product }) {
    const thumbnailUrl = product.thumbnail
        ? `${STATIC_HOST}${product.thumbnail?.url}`
        : THUMBNAIL_PLACEHOLDER;
    const history = useHistory();
    const handleClick = () => {
        //Navigate to detail page: /products/:productId
        history.push(`/products/${product.id}`);
    };

    return (
        <div>
            <Box padding={1} onClick={handleClick}>
                <Box padding={1} minHeight="215px">
                    <img src={thumbnailUrl} alt={product.name} width="100%" />
                </Box>

                <Typography variant="body2">
                    {product.name}
                </Typography>
                <Typography variant="body2">
                    <Box component="span" fontSize="16px" fontWeight="bold" mr={1}>
                        {formatPrice(product.salePrice)}
                    </Box>
                    {product.promotionPercent > 0 ? ` -${product.promotionPercent}%` : ''}
                </Typography>
            </Box>
        </div>
    );
}

export default Product;