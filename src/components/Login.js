import React, {Component} from 'react';
import { Form, FormGroup, Label, Input, Button, Link} from 'reactstrap';
import {connect} from 'react-redux'
import { Redirect} from 'react-router-dom';
import Cookies from 'universal-cookie';
import { onUserLogin } from '../actions/index';
import '../Support/CSS/style.css'


const cookies = new Cookies();

class Login extends Component {

  componentWillReceiveProps(newProps){
    if (newProps.username !== ''){
    cookies.set('Ferguso', newProps.username, { path:'/'})
  }}
  BtnLoginClick =() =>{
    var username = this.refs.username.refs.tbUsername.value;
    // this.setState({username}) kita ganti dengan action creator
    // this.props.onUserLogin(username)
        // console.log(username)
    var password = this.refs.password.refs.tbPassword.value;
    this.props.onUserLogin({username, password}); 
        // action creator 

  }
  renderError = () => {
    if (this.props.error.length>0){
      return  <p className='alert alert-danger'> {this.props.error}</p>
    }
  }
  

  renderButton = () => {
    if (this.props.loading){
      return <h2>Loading...</h2>
    }
    return <Button color ="success" onClick = {this.BtnLoginClick}> Login</Button>
  
  
  }
    render () {
      if(this.props.username === ""){
        return (
        <div className="login-background">
        <div className="container">
        <center><h1 className="form-heading">Login Form</h1></center>
        <div className="login-form">
        <div className="main-div">
        <div className="panel">
        <h2>Its nice to have you back!</h2>
        <p>Please enter your Username and Password</p>
        </div>
        <form id="Login">
        <FormGroup>
        <Input type="text" ref="username" innerRef="tbUsername" id="tbUsername" placeholder="Username" />
        </FormGroup>
        <FormGroup>
        <Input type="password" name="password" ref="password" innerRef="tbPassword" id="tbPassword" placeholder="Your Password" />
        </FormGroup>
        <div className="forgot">
        <a href="reset.html">Forgot password?</a>
        <p className="registerhere">Don't have any account ?
        <a href="/register" className="registerhere-link"> Register Now </a></p>              
        </div>                     
        {this.renderError()}
        {this.renderButton()}
        </form>
        </div>
        </div>
        </div>
        </div>
        
        
      );
  }
  return <Redirect to="/" />;
}
}

const mapStateToProps = (state) => {
  return{
      username : state.auth.username, 
      error: state.auth.error ,
      loading: state.auth.loading}
      // browser: state.auth.browser }
}
export default connect(mapStateToProps, { onUserLogin })(Login);
// export default LoginBertasbih;