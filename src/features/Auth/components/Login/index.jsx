import React from 'react';
import PropTypes from 'prop-types';
import LoginForm from '../Login Form';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { login } from '../../userSlice';
import { useSnackbar } from 'notistack';
import { Slide } from '@material-ui/core';

Login.propTypes = {
    closeDialog: PropTypes.func,
};

function Login(props) {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const handleSubmit = async (values) => {
        try {
            //auto set username = email
            values.username = values.email;
            const action = login(values);
            const resultAction = await dispatch(action);
            const user = unwrapResult(resultAction);

            //close dialog
            const { closeDialog } = props;

            if (closeDialog) {
                closeDialog();
            }


        } catch (error) {
            console.log('Failed to login: ', error);
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
            <LoginForm onSubmit={handleSubmit} />
        </div>
    );
}

export default Login;