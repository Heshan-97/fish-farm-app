import { AppBar, Toolbar, styled } from "@mui/material";
import { NavLink } from 'react-router-dom';



const Header = styled(AppBar)`
background:rgb(0, 82, 107);
padding: 18px;
`
const Tab = styled(NavLink)`
font-size: 25px;
margin-right: 75px;
color: white;
text-decoration: inherit;
font-color: white; 
&:hover {
    color: Black;}
    &.active {
        color: red;
      }   
`

const NavBar = () => {
    return (
        <Header position="static">
            <Toolbar>
                <Tab style={{fontWeight: 'bold', fontSize: '35px'}} to="/" >Havbruksloggen</Tab>
                <Tab to="/all">Fish Farms</Tab>
                <Tab to="/workers">Workers</Tab>
                <Tab to="/boats">Boats</Tab>
            </Toolbar>
        </Header>
    )
}
export default NavBar; 