import React from 'react';
import productApi from '../../../api/productApi';

export default function useProductDetail(productId) {
    const [product, setProduct] = React.useState({});
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const result = await productApi.get(productId);
                setProduct(result);
            } catch (error) {
                console.log('Failed to fetch product ', error);
            }
            setLoading(false);
        })()
    }, [productId]);

    return { product, loading };
}