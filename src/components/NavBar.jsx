import { AppBar, Toolbar, styled } from "@mui/material";
import { NavLink } from 'react-router-dom';



const Header = styled(AppBar)`
background: hash;
`
const Tab = styled(NavLink)`
font-size: 20px;
margin-right: 20px;
color: black;
text-decoration: none;
font-color: white; 
`

const NavBar = () => {
    return (
        <Header position="static">
            <Toolbar>
                <Tab  to="/">Fish Farm App</Tab>
                <Tab to="/all">Fish Farm List</Tab>
                <Tab to="/workers">Workers</Tab>
                <Tab to="/boats">Boats</Tab>
                
            </Toolbar>
        </Header>
    )
}
export default NavBar; 