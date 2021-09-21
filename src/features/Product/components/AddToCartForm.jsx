import React from 'react';
import PropTypes from 'prop-types';
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import InputField from '../../../component/form-controls/InputField';
import { Button } from '@material-ui/core';
import QuantityField from '../../../component/form-controls/QuantityField';

AddToCartForm.propTypes = {
    onSubmit: PropTypes.func,
};

function AddToCartForm({ onSubmit = null }) {
    const schema = yup.object().shape({
        quantity: yup
            .number()
            .min(1, 'Please enter at least 1')
            .required('Please enter quantity')
            .typeError('Please enter a number'),

    });

    const form = useForm({
        defaultValues: {
            quantity: 1,
        },
        resolver: yupResolver(schema),
    });

    const handleSubmit = async (values) => {

        if (onSubmit) {
            await onSubmit(values);
        }
        // form.reset();
        // Trong này phải dùng async await vì isSubmitting sẽ được tính bằng
        //thời gian chạy các lệnh trong hàm này. Nếu ko có async await thì 
        //code trong hàm này sẽ chạy rất nhanh.
    }
    return (
        <form onSubmit={form.handleSubmit(handleSubmit)}>

            <QuantityField name="quantity" label="Quantity" form={form} />


            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
            >
                Buy
            </Button>
        </form>
    );
}

export default AddToCartForm;