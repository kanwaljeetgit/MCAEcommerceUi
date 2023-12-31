import React from 'react'
import logo from '../logo/logo.png'
import "./Header.css"
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Header() {
    const cart = useSelector(state => state.cart.cart);
    const navigate = useNavigate();
    const navigateToCart = () =>{
        navigate("/cart");
    };
    return (
        <>
            <div className="header">
                {/* Header logo */}
                <div onClick={()=>navigate("/home")} title='Home Page' className='tooltip'>
                    <img style={{
                        width: 60,
                        height: 50,
                        margin: 10,
                        cursor:'pointer'
                    }}
                      className='logoImg' src={logo} alt='test' />
                </div>
                {/* Search Bar */}
                <div className='headerInputContainer'>
                    <input className='headerInput' type='text' placeholder='Search Products' />
                    <SearchOutlinedIcon style={{
                        color: 'white',
                        margin: 15,
                    }} />
                </div>

                <div>
                    <div className='headerText'>Kanwaljeet</div>
                    <div className='headerText'>Accounts & Lists</div>
                </div>

                <div>
                    <div className='headerText'>Return</div>
                    <div className='headerText'>& Orders</div>
                </div>

                <div onClick={navigateToCart} style={{ position: 'relative' ,cursor:"pointer" }}>
                    <ShoppingCartIcon style={{ color: 'white' }} />
                    <span style={{
                        position: 'absolute',
                        left: 14,
                        right: 14,
                        backgroundColor: 'white',
                        width: 14,
                        height: 14,
                        borderRadius: 7,
                        textAlign: 'center',
                        fontSize: 12,
                        fontWeight: 400
                    }}>{cart.length}</span>
                </div>

                <div>
                    <div className='headerText'>India</div>
                    <div className='headerText'>123456789</div>
                </div>
            </div>

            {/* Header Bottom */}
            <div className='headerBottom'>
                <MenuIcon style={{
                    color: 'white'
                }}/>
                <div>Life Style</div>
                <div>Electronics</div>
                <div>Mobile</div>
                <div>Laptop</div>
                <div>Books</div>
            </div>
        </>
    )
}

export default Header