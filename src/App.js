import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import {connect} from 'react-redux'
import Cookies from 'universal-cookie'
import {withRouter} from 'react-router-dom'
import {keepLogin, cookieChecked} from './actions'
import Header from './components/Header';
import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register'
import ProdukList from './components/ProdukList';
import ManageProduk from './components/ManageProduk';
import ProdukDetail from './components/ProdukDetail';
import Cart from './components/Cart'
import History from './components/History';


const cookies = new Cookies()

class App extends Component {
  state = {content : 'Ini Content'}
 
  componentDidMount (){
    const username = cookies.get('Ferguso');
    if (username !== undefined) {
      this.props.keepLogin(username)
    }
    else {
      this.props.cookieChecked ()
    }
 }

 btnOnclick = () =>
 { 
   this.setState({content : 'Ini Content Baru'})
 }
  render() {
    if (this.props.cookie) {
      return (
        <div className = {'container-fluid'}>
      <Header navBrand = {"Home"}/>
     <div>
      {/* <CarouselBertasbih></CarouselBertasbih> */}
        <Route exact path ="/" component ={Home}/>
        <Route path="/Login" component={Login}/> 
        <Route path="/Register" component={Register}/>
        <Route path="/ProdukList" component={ProdukList}/>
        <Route path="/ManageProduk" component={ManageProduk}/>
        {/* <Route path="/ProdukDetail/:id" component={ProdukDetail}/> */}
        {/* Jika ingin ke url ? :id dihapus */}
        <Route path="/ProdukDetail" component={ProdukDetail}/>
        <Route path="/Cart" component={Cart}/>
        <Route path="/History" component={History} />
      </div> 
      </div>
      )
    }
    return (<div>
        <center><h1> Loading...</h1></center>
      </div>)
    
  }
}

const mapStateToProps = (state) => {
  return {cookie : state.auth.cookie}
}

export default withRouter(connect(mapStateToProps, {keepLogin, cookieChecked}) (App));

    
    /* var {content, username} = this.state
    return ( */
      
      
      /* <HeaderBertasbih headerText = {"Happy Holiday"}/> */
      /* <HeaderBertasbih headerText = {2018}/> */
      /* untuk headerText bisa daiganti dengan variable apa saja, lalu = mesti dibungkus  */
      /* Jika <headerBertasbih headerText = {2018} mugi ={100}, maka di di component header bertasbih ,<h2> {this.props.headerText}</h2> <h2> {this.props.muji}</h2>*/
      /* <ContentBertasbih/> */
      /* Jika hanya ingin menampilkan isi dari content bertasbih */
      /* <ContentBertasbih contentHeader = {content}> */
      /* <p> Kapan Piknik Lagi </p>
        <p> Ayo Liburan Lagi </p> */
      /* </ContentBertasbih> */
      /* <Button color="danger" onClick = {this.btnOnclick}>danger</Button> */
      
     /* <Form style = {{margin:"0 auto"}} className = "col-3">  
        <FormGroup>
          <Label for="exampleUsername">Username</Label>
          <Input type="text" name="username" ref = "username" innerRef= "tbUserName" id="exampleUsername" placeholder="Masukan Username Anda" />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input type="password" name="password" id="examplePassword" placeholder="Masukan Password Anda" />
        </FormGroup>
        
        <Button color ="success" onClick = {this.BtnLoginClick}> Login</Button>
      </Form> */
    
      /* <input type ="button" style ={{backgroundColor :"Red"}} value="OK" className='btn btn-primary'/> */
      /* <FooterBertasbih/> */
      
      /* <LoginBertasbih/> */
    
      