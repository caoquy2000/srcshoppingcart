import React from 'react';
import PropTypes from 'prop-types';
import InputField from '../../../../component/form-controls/InputField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

TodoForm.propTypes = {
    // Báo lên component cha, tui sẽ gọi hàm onSubmit này 
    // mỗi khi user nó submit
    onSubmit: PropTypes.func,
};

function TodoForm(props) {
    // Nên đặt schema trong bên trong hàm component 
    // Vì để sau này dùng đa ngôn ngữ sẽ có hàm để truyền dữ liệu vào
    const schema = yup.object().shape({
        title: yup.string().required('Please enter title'),

    });

    const form = useForm({
        defaultValues: {
            title: '',
        },
        resolver: yupResolver(schema),
    });

    const handleSubmit = (values) => {
        const { onSubmit } = props;
        if (onSubmit) {
            onSubmit(values);
        }
    }

    return (
        <form onSubmit={form.handleSubmit(handleSubmit)}>
            <InputField name="title" label="Todo" form={form} />
        </form>
    );
}

export default TodoForm;