import React from 'react';
import PropTypes from 'prop-types';
import InputField from '../../../../component/form-controls/InputField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Avatar from '@material-ui/core/Avatar';
import LockOutlined from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import { Button } from '@material-ui/core';
import PasswordField from '../../../../component/form-controls/PasswordField';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(4),
    },
    avatar: {
        margin: '0 auto',
        backgroundColor: theme.palette.secondary.main,

    },
    title: {
        margin: theme.spacing(2, 0, 3, 0),
        textAlign: 'center',
    },
    submit: {
        margin: theme.spacing(3, 0, 2, 0),
    },
    line: {
        marginBottom: theme.spacing(4),
    },
}));

LoginForm.propTypes = {
    // Báo lên component cha, tui sẽ gọi hàm onSubmit này 
    // mỗi khi user nó submit
    onSubmit: PropTypes.func,
};

function LoginForm(props) {
    const classes = useStyles();
    // Nên đặt schema trong bên trong hàm component 
    // Vì để sau này dùng đa ngôn ngữ sẽ có hàm để truyền dữ liệu vào
    const schema = yup.object().shape({

        identifier: yup
            .string()
            .required('Please enter your Email')
            .email('Please enter a valid email address'),
        password: yup
            .string()
            .required('Please enter your password'),

    });

    const form = useForm({
        defaultValues: {
            identifier: '',
            password: '',
        },
        resolver: yupResolver(schema),
    });

    const handleSubmit = async (values) => {
        const { onSubmit } = props;
        if (onSubmit) {
            await onSubmit(values);
        }
        // form.reset();
        // Trong này phải dùng async await vì isSubmitting sẽ được tính bằng
        //thời gian chạy các lệnh trong hàm này. Nếu ko có async await thì 
        //code trong hàm này sẽ chạy rất nhanh.
    }

    const { isSubmitting } = form.formState;

    return (
        <div className={classes.root}>
            {isSubmitting && <LinearProgress className={classes.line} />}
            <Avatar className={classes.avatar}>
                <LockOutlined></LockOutlined>
            </Avatar>
            <Typography className={classes.title} component="h3" variant="h5">
                Sign In
            </Typography>
            <form onSubmit={form.handleSubmit(handleSubmit)}>

                <InputField name="identifier" label="Email" form={form} />
                <PasswordField name="password" label="Password" form={form} />

                <Button
                    disabled={isSubmitting}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Sign In
                </Button>
            </form>
        </div>

    );
}

export default LoginForm;