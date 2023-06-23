import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import { Badge, Button, Select } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { setLanguage, setTheme } from '../../redux/webSlice';
import { logout } from '../../redux/userSlice';
import { API_URL } from '../../../config';

const pages = [
    { en: 'airplane ticket', fa: ' بلیط هواپیما', to: '/airplanetickets' },
    { en: 'train ticket', fa: 'بلیط قطار', to: '/traintickets' },
    { en: 'hotel reservation', fa: 'رزرو هتل', to: '/hotelreservations' },
];

const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'fa', label: 'فارسی' },
];

const themes = ['#32a852', '#b8b451', '#b964cc', '#1976d2'];

function ResponsiveAppBar() {
    const { language, theme } = useSelector((state) => state.webReducer);
    const { user } = useSelector((state) => state.userReducer);
    const [settings, setSettings] = React.useState([
        { name: 'Profile', to: '/accountinfo' },
        { name: 'reservations', to: '/reservations' },
    ]);

    React.useEffect(() => {
        if (user?.id) {
            setSettings([
                { name: 'Profile', to: '/accountinfo' },
                { name: 'reservations', to: '/reservations' },
                { name: 'logout', to: '/login' },
            ]);
        } else {
            setSettings([
                { name: 'Profile', to: '/accountinfo' },
                { name: 'reservations', to: '/reservations' },
                { name: 'login', to: '/login' },
            ]);
        }
    }, [user]);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const requestLogOut = async () => {
        const url = `${API_URL}/logout`;
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'omit', // Send cookies in cross-origin requests
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        if (data.message === 'success') {
            dispatch(logout());
            navigate('/login');
        }
    };

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = (link) => {
        link && navigate(link);
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = (link) => {
        if (link === '/login' && user?.id) {
            requestLogOut();
        }
        link && navigate(link);
        setAnchorElUser(null);
    };

    const handleChange = (event) => {
        dispatch(setLanguage(event.target.value));
    };

    const changeTheme = (event) => {
        dispatch(setTheme(event.target.value));
    };

    return (
        <AppBar position="fixed" sx={{ background: `${theme}` }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AirplaneTicketIcon
                        sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
                    />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        tickets
                    </Typography>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'flex', md: 'none' },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem
                                    key={page[language]}
                                    onClick={() => handleCloseNavMenu(page.to)}
                                >
                                    {page[language]}
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <AirplaneTicketIcon
                        sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
                    />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        tickets
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' },
                        }}
                    >
                        {pages.map((page) => (
                            <Button
                                key={page[language]}
                                onClick={() => handleCloseNavMenu(page.to)}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page[language]}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        {user.itemsBag?.length > 0 && (
                            <IconButton
                                onClick={() => navigate('/reservations')}
                            >
                                <Badge
                                    badgeContent={user?.itemsBag?.length}
                                    color="secondary"
                                >
                                    <ShoppingCartIcon />
                                </Badge>
                            </IconButton>
                        )}
                        <Select
                            value={theme}
                            onChange={changeTheme}
                            variant="standard"
                            size="small"
                            sx={{
                                mr: 1,
                                background: `${theme}`,
                            }}
                        >
                            {themes.map((option, index) => (
                                <MenuItem
                                    value={option}
                                    key={index}
                                    sx={{
                                        background: `${option}`,
                                        mt: 0.5,
                                    }}
                                ></MenuItem>
                            ))}
                        </Select>
                        <Select
                            value={language}
                            onChange={handleChange}
                            variant="standard"
                            size="small"
                            sx={{
                                mr: 1,
                            }}
                        >
                            {languageOptions.map((option) => (
                                <MenuItem
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>

                        <Tooltip title="Open settings">
                            <IconButton
                                onClick={handleOpenUserMenu}
                                sx={{ p: 0 }}
                            >
                                <Avatar
                                    alt="Remy Sharp"
                                    src={user?.avatar ?? ''}
                                />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={() => handleCloseUserMenu(null)}
                        >
                            {settings.map((setting) => (
                                <MenuItem
                                    key={setting.name}
                                    onClick={() =>
                                        handleCloseUserMenu(setting.to)
                                    }
                                >
                                    <Typography textAlign="center">
                                        {setting.name}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;
