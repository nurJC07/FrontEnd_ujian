import React, {Component} from 'react';
import {connect} from 'react-redux'
import { Redirect} from 'react-router-dom';
import Cookies from 'universal-cookie';
import { onUserRegister} from '../actions/index';
import '../Support/CSS/style.css'

const cookies = new Cookies();

class Register extends Component {

    onBtnRegisterClick = () => {
    var username = this.refs.username.value;
    var email = this.refs.email.value;
    var password = this.refs.password.value;
    var phone = this.refs.phone.value;
    var confirm = this.refs.confirm.value;

    this.props.onUserRegister({username, email, phone, password, confirm})
    } 
    componentWillReceiveProps(newProps){
      if (newProps.username !== ''){
      cookies.set('Ferguso', newProps.username, { path:'/'})
    }}
    renderError = () => {
      if (this.props.error.length>0){
        return  <p className='alert alert-danger'> {this.props.error}</p>
      }
    }
    renderButton = () => {
      if (this.props.loading){
        return <h2>Loading...</h2>
      }
      return  <input type="button" name="submit" defaultValue="SIGN UP" onClick = {this.onBtnRegisterClick} />
  
    }
    render (){
      if(this.props.username === ""){
        return (
          <div className="login-background">
          <div className="container">
          <h1 className="form-heading">Register Form</h1>
          <div className="login-form">
          <div className="main-div">
          <div className="panel">
          <h2>Lets Join the Club!</h2>
          <p>Please fill the form below</p>
          </div>
          <form id="Login">
          <div className="form-group">
          <input type="text" ref="username" className="form-control" id="inputUsername" placeholder="Username" />
          </div>
          <div className="form-group">                   
          <input type="email" ref="email" className="form-control" id="inputEmail" placeholder="Email Address" />
          </div>
          <div className="form-group">                   
          <input type="number" ref="phone" className="form-control" id="inputPhone" placeholder="Phone Number" />                    
          </div>
          <div className="form-group">                   
          <input type="text" ref="password" className="form-control" id="inputPassword" placeholder="Password" />                    
          </div>
          <div className="form-group">                   
          <input type="text" ref="confirm" className="form-control" id="inputConfirmPassword" placeholder="Confirm Password" />                    
          </div>
          <div className="botto-text"> 
              
          </div>
          <div>
          {this.renderError()}   
          {this.renderButton()}
           </div>
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
          loading: state.auth.loading }
      }
    export default connect(mapStateToProps,  {onUserRegister }) (Register)
