import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

ProductSort.propTypes = {
    currentSort: PropTypes.string.isRequired,
    onChange: PropTypes.func,
};

function ProductSort({ currentSort, onChange }) {

    const handleSortChange = (event, newValue) => {
        if (onChange) onChange(newValue);
    }

    return (
        <Tabs
            value={currentSort}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleSortChange}
            aria-label="disabled tabs example"
        >
            <Tab
                label="Giá thấp tới cao"
                value="salePrice:ASC"
            >

            </Tab>
            <Tab
                label="Giá cao xuống thấp"
                value="salePrice:DESC"
            >

            </Tab>
        </Tabs>
    );
}

export default ProductSort;