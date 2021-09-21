import React from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Grid, makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import productApi from '../../../api/productApi';
import ProductSkeletonList from '../components/ProductSkeletonList';
import ProductList from '../components/ProductList';
import Pagination from '@material-ui/lab/Pagination';
import ProductSort from '../components/ProductSort';
import ProductFilters from '../components/ProductFilters';
import FilterViewer from '../components/FilterViewer';
import { useHistory, useLocation } from 'react-router';
import queryString from 'query-string';

const useStyles = makeStyles((theme) => ({
    root: {},
    left: {
        width: '250px',
    },
    right: {
        flex: '1 1 0',
    },
    pagination: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        marginTop: '30px',
        paddingBottom: '20px',
    },
}));

ListPage.propTypes = {

};

function ListPage(props) {
    const classes = useStyles();
    const [productList, setProductList] = React.useState([]);
    const history = useHistory();
    const location = useLocation();
    // Cơ bản là history và location giống nhau nhưng ta sài history vì
    // location khi ta push data vào nó sẽ luôn trả về một object mới
    // nhưng với history nó là 1 object luôn không thay đổi 
    // bên trong history có location và th location nó thay đổi nhưng object history là không bao giờ thay đổi.
    const queryParams = React.useMemo(() => {
        const params = queryString.parse(location.search);
        return {
            ...params,
            _page: Number.parseInt(params._page) || 1,
            _limit: Number.parseInt(params._limit) || 12,
            _sort: params._sort || 'salePrice:ASC',
            isPromotion: params.isPromotion === 'true',
            isFreeShip: params.isFreeShip === 'true',
        }
    }, [location.search]);
    const [pagination, setPagination] = React.useState({
        limit: 10,
        total: 10,
        page: 1,
    });
    const [loading, setLoading] = React.useState(true);
    // const [filters, setFilters] = React.useState({
    //     _page: 1,
    //     _limit: 12,
    //     _sort: 'salePrice:ASC',
    // });
    // const [filters, setFilters] = React.useState(() => ({
    //     ...queryParams,
    //     _page: Number.parseInt(queryParams._page) || 1,
    //     _limit: Number.parseInt(queryParams._limit) || 12,
    //     _sort: queryParams._sort || 'salePrice:ASC',
    // }));
    // React.useEffect(() => {
    //     //Todo: Sync filter to URL
    //     history.push({
    //         pathname: history.location.pathname,
    //         search: queryString.stringify(filters),
    //     });
    // }, [history, filters]);
    React.useEffect(() => {
        (async () => {
            try {
                const { data, pagination } = await productApi.getAll(queryParams);
                console.log({ data, pagination });
                setProductList(data);
                setPagination(pagination);
            } catch (error) {
                console.log('Failed to load product list: ', error);
            }
            setLoading(false);
        })();

    }, [queryParams]);
    const handlePageChange = (e, page) => {
        // setFilters(prevFilters => ({
        //     ...prevFilters,
        //     _page: page,
        // }));

        const filters = {
            ...queryParams,
            _page: page,
        };

        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(filters),
        });
    };
    const handleSortChange = (newSortValue) => {
        // setFilters((prevFilters) => ({
        //     ...prevFilters,
        //     _sort: newSortValue,
        // }));


        const filters = {
            ...queryParams,
            _sort: newSortValue,
        };

        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(filters),
        });
    };
    const handleFilterChange = (newFilters) => {
        // setFilters((prevFilters) => ({
        //     ...prevFilters,
        //     ...newFilters,
        // }));

        const filters = {
            ...queryParams,
            ...newFilters,
        };

        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(filters),
        });
    };
    const handleViewFilter = (newFilters) => {
        // setFilters(newFilters);
        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(newFilters),
        });
    };
    return (
        <Box>
            <Container>
                <Grid container spacing={1}>
                    <Grid item className={classes.left}>
                        <Paper elevation={0}>
                            <ProductFilters filters={queryParams} onChange={handleFilterChange} />
                        </Paper>
                    </Grid>
                    <Grid item className={classes.right}>

                        <Paper elevation={0}>
                            <ProductSort currentSort={queryParams._sort} onChange={handleSortChange} />
                            <FilterViewer filters={queryParams} onChange={handleViewFilter} />
                            {
                                loading ? <ProductSkeletonList length={queryParams._limit} /> : <ProductList data={productList} />
                            }
                            <Box className={classes.pagination}>
                                <Pagination
                                    color="primary"
                                    count={Math.ceil(pagination.total / pagination.limit)}
                                    page={pagination.page}
                                    onChange={handlePageChange}
                                />
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default ListPage;