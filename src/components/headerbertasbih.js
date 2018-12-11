// import React from 'react';
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
import { connect } from 'react-redux';
import { onUserLogOut , keepLogin} from '../actions';
import Cookies from 'universal-cookie'
import axios from 'axios'
 
const cookies = new Cookies();


class HeaderBertasbih extends Component {
state = {jumlah :0}

componentDidMount = () => {
  this.getCart()
}


getCart = () => {
  axios.get('http://localhost:3001/cart', {
    params : {
      username : this.props.username
    }
  }).then((res) => {
    console.log(res.data.length)
    this.setState({jumlah : res.data.length})
  })
}
renderCart = () => {
  return(
    
      <Button href='/cart'>
               
               {this.state.jumlah}
             </Button>
     
  )
}

      onLogOutSelect = () => {
        this.props.onUserLogOut();
        cookies.remove('Ferguso');
      }

      onUserBrowserSelect = () => {
        if (this.props.username === ''){
          return(
         <NavItem>
        <Link to ='/Login'><NavLink> Browse Produk </NavLink></Link>
        </NavItem>
          )
        }
          return(
          <NavItem>
          <NavLink href='/ProdukList'> Browse Produk </NavLink>
          </NavItem>
    )}
    
    render (){
        // if (this.props.headerText == true){
            if(this.props.username === ""){
        return ( 
        <div>
            <Navbar color="light" light expand="md">
            <NavbarBrand href="/">{this.props.navBrand}</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
            <NavItem>
            {/* <Link to ='/ProdukList'><NavLink> Browse Produk </NavLink></Link> */}
            {this.onUserBrowserSelect()}
            </NavItem>
            <NavItem>
            <Link to ='/Register'><NavLink> Register </NavLink></Link>
            </NavItem>
            <NavItem>
            <Link to="/login"><NavLink>login </NavLink></Link>
            </NavItem>
            </Nav>
            </Collapse>
            </Navbar>
        </div>
        );
      }
         return( 
            <div> 
            <Navbar color="light" light expand="md">
            <NavbarBrand href="/">{this.props.navBrand}</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>   
            <Nav className="ml-auto" navbar> 
            {this.onUserBrowserSelect()}
            <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
            Hello, {this.props.username}
            </DropdownToggle>
            <DropdownMenu right>
            <DropdownItem>
            <Link to ="/ManageProduk">Manage Produk</Link>
            </DropdownItem>
            <DropdownItem>
            <Link to ="/Cart">Cart</Link>
            </DropdownItem>
            <DropdownItem>
            <Link to ="/History">History</Link>
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick= {this.onLogOutSelect}>
            Logout
            </DropdownItem>
            </DropdownMenu>
            {this.renderCart()}
            </UncontrolledDropdown>
            </Nav>
            </Collapse>
            </Navbar>
          </div>
        );
                  
    }
}
const mapStateToProps = (state) => {
  // return { username: state.username } awalnya hanya username kemudian diganti dengan auth sebagai objek.
  return { username: state.auth.username }
}
// export default HeaderBertasbih;

export default connect(mapStateToProps,{ onUserLogOut, keepLogin})(HeaderBertasbih);



// export default HeaderBertasbih;