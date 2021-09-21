import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { Controller } from 'react-hook-form';

InputField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,

    label: PropTypes.string,
    disable: PropTypes.bool,
};

function InputField(props) {
    const { form, name, label, disable } = props;
    // Xác định khi nào có lỗi để show error ở textfield
    // formState để xác định khi nào người dùng toutch vào field
    // Bởi vì khi form vừa được render lên người dùng chưa nhập gì
    // vẫn là null nhưng chưa show lỗi -> chỉ show lỗi khi control này 
    // đã toutch rồi và có error 
    const { formState: { errors }, formState } = form;
    // Lấy hasError nó có lỗi khi và chỉ khi cái field này được touch và 
    // errors có lỗi
    const hasError = errors[name] && formState.touchedFields[name];

    return (
        <Controller
            name={name}
            control={form.control}
            render={(
                { field }
            ) => (
                <TextField
                    {...field}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    label={label}
                    disabled={disable}
                    error={hasError}
                    helperText={errors[name]?.message}
                />
            )}

        />
    );
}

export default InputField;