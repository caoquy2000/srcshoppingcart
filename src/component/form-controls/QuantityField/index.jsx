import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Box, Typography } from '@material-ui/core';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

QuantityField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,

    label: PropTypes.string,
    disable: PropTypes.bool,
};

function QuantityField(props) {
    const { form, name, label, disable } = props;
    // Xác định khi nào có lỗi để show error ở textfield
    // formState để xác định khi nào người dùng toutch vào field
    // Bởi vì khi form vừa được render lên người dùng chưa nhập gì
    // vẫn là null nhưng chưa show lỗi -> chỉ show lỗi khi control này 
    // đã toutch rồi và có error 
    const { formState: { errors }, formState, setValue } = form;
    // Lấy hasError nó có lỗi khi và chỉ khi cái field này được touch và 
    // errors có lỗi
    const hasError = errors[name] && formState.touchedFields[name];


    return (
        <FormControl error={hasError} margin="normal" fullWidth variant="outlined">
            {/* <InputLabel htmlFor={name}>{label}</InputLabel> */}
            <Typography>{label}</Typography>
            <Controller
                name={name}
                control={form.control}
                render={
                    ({ field }) => (
                        <Box>
                            <IconButton onClick={() => setValue(field.name, Number.parseInt(field.value) - 1)} >
                                <RemoveCircleOutlineIcon />
                            </IconButton>
                            <OutlinedInput
                                {...field}

                                id={name}
                                type="number"

                                disabled={disable}

                            />
                            <IconButton onClick={() => setValue(field.name, Number.parseInt(field.value) + 1)} >
                                <AddCircleOutlineIcon />
                            </IconButton>
                        </Box>

                    )
                }
            />
            <FormHelperText >{errors[name]?.message}</FormHelperText>
        </FormControl>


    );
}
export default QuantityField;