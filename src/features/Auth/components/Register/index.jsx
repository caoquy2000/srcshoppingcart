import React from 'react';
import PropTypes from 'prop-types';
import RegisterForm from '../RegisterForm/index';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { register } from '../../userSlice';
import { useSnackbar } from 'notistack';
import { Slide } from '@material-ui/core';

Register.propTypes = {
    closeDialog: PropTypes.func,
};

function Register(props) {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const handleSubmit = async (values) => {
        try {
            //auto set username = email
            values.username = values.email;
            const action = register(values);
            const resultAction = await dispatch(action);
            const user = unwrapResult(resultAction);

            //close dialog
            const { closeDialog } = props;

            if (closeDialog) {
                closeDialog();
            }

            //notifi when register successfull
            enqueueSnackbar('Register success!!', {
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
                TransitionComponent: Slide,
                variant: 'success',
            });
        } catch (error) {
            console.log('Failed to register: ', error);
            enqueueSnackbar(error.message, {
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                },
                TransitionComponent: Slide,
                variant: 'error',
            });
        }
    };
    return (
        <div>
            <RegisterForm onSubmit={handleSubmit} />
        </div>
    );
}

export default Register;