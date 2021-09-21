import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CodeIcon from '@material-ui/icons/Code';
import { NavLink, Link, useHistory } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Register from '../../features/Auth/components/Register';
import { Badge, IconButton } from '@material-ui/core';
import { Close, ShoppingCart } from '@material-ui/icons';
import Box from '@material-ui/core/Box';
import Login from '../../features/Auth/components/Login';
import { useSelector, useDispatch } from 'react-redux';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import { logout } from '../../features/Auth/userSlice';
import { cartItemsCountSelector } from '../../features/Cart/selectors';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        position: 'relative'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    link: {
        textDecoration: 'none',
        color: '#fff',
    },
    closeButton: {
        position: 'absolute',
        top: theme.spacing(1),
        right: theme.spacing(1),
        color: theme.palette.grey[500],
        zIndex: 2,
    },
}));

const MODE = {
    LOGIN: 'login',
    REGISTER: 'register',

};

export default function Header() {
    const dispatch = useDispatch();
    const loggedInUser = useSelector(state => state.user.current.username);
    const isLoggedIn = !!loggedInUser;
    const cartItemsCount = useSelector(cartItemsCountSelector);
    const history = useHistory();
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState(MODE.LOGIN);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleUserClick = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const handleCloseMenu = () => {
        setAnchorEl(null);
    }

    const handleLogoutClick = () => {
        const action = logout();
        dispatch(action);
        setAnchorEl(null);
    }

    const handleCartClick = () => {
        history.push('/cart');
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>

                    <CodeIcon className={classes.menuButton} />

                    <Typography variant="h6" className={classes.title}>
                        <Link className={classes.link} to="/">EZ SHOP</Link>
                    </Typography>
                    <NavLink className={classes.link} to="/products" activeClassName="active">
                        <Button color="inherit">Products</Button>
                    </NavLink>
                    <NavLink className={classes.link} to="/todos" activeClassName="active">
                        <Button color="inherit">Todos</Button>
                    </NavLink>
                    <NavLink className={classes.link} to="/albums" activeClassName="active">
                        <Button color="inherit">Albums</Button>
                    </NavLink>
                    {
                        !isLoggedIn &&
                        (
                            <Button color="inherit" onClick={handleClickOpen}>Login</Button>
                        )
                    }
                    <IconButton aria-label="show 11 new notifications" color="inherit" onClick={handleCartClick}>
                        <Badge badgeContent={cartItemsCount} color="secondary">
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                    {
                        isLoggedIn && (
                            <IconButton color="inherit" onClick={handleUserClick}>
                                <AccountCircleIcon />
                            </IconButton>
                        )
                    }
                </Toolbar>
            </AppBar>

            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                TransitionComponent={Fade}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                getContentAnchorEl={null}
            >
                <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
                <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
                <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
            </Menu>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                disableBackdropClick={true}
                disableEscapeKeyDown={true}
            >
                <IconButton className={classes.closeButton} onClick={handleClose}>
                    <Close />
                </IconButton>
                <DialogContent>
                    {
                        mode === MODE.REGISTER && (
                            <>
                                <Register closeDialog={handleClose} />
                                <Box textAlign="center">
                                    <Button color="primary" onClick={() => setMode(MODE.LOGIN)}>
                                        Already have an account. Login here
                                    </Button>
                                </Box>
                            </>
                        )

                    }
                    {
                        mode === MODE.LOGIN && (
                            <>
                                <Login closeDialog={handleClose} />
                                <Box textAlign="center">
                                    <Button color="primary" onClick={() => setMode(MODE.REGISTER)}>
                                        Don't have an account. Register here.
                                    </Button>
                                </Box>
                            </>
                        )

                    }

                </DialogContent>

            </Dialog>
        </div>
    );
}
