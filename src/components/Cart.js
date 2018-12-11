import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { Table,Input } from 'reactstrap';


class Cart extends Component {
    state = {listCart : []}

    componentDidMount(){
      this.renderListCart()
    }
  
    renderListCart = () => {
      axios.get('http://localhost:3001/cart' , {
        params : {
          username : this.props.username
        }
      })
      .then((res) => {
        console.log(res)
        this.setState({listCart : res.data})
      })
      var listJsx = this.state.listCart.map((item) => {
        
          return(
          
            <tr>
              <th><img src={item.img} width="50px" alt={item.id}/></th>
              <td>{item.nama}</td>
              <td>{item.harga}</td>
              <td >{item.qty}</td>
              <td >{item.total}</td>
            </tr>
        )
       
      })
  
      return listJsx;
    }

        
  onCheckOut = () => {

    axios.post('http://localhost:3001/history', {
      username : this.props.username,
      order : this.state.listJsx
    })
    .then((res) => {
      console.log(res)
      for(let i = 0 ; i < this.state.listJsx.length ; i ++){
        axios.delete('http://localhost:3001/cart/' + this.state.listJsx[i].id    
        ).then((res) => {
          console.log(res)     
          this.renderListCart()      
        })
      }
    })
  }

  renderTotalHarga = () => {
    var ttl = 0
    for(let i = 0; i < this.state.listCart.length ; i++){
      ttl += this.state.listCart[i].total
    }
    return(
      <div className='col-2'>
      <h3>Rp. {ttl}</h3>
       <Input className="btn-primary" type='button' value='CHECKOUT' onClick ={this.onCheckOut}/>
      </div>
    )
  }

      render() {
                if(this.props.username !== undefined) {
                    return (
                        <div>
                            <center>
                            <div>
                                <h1>Cart</h1>
                            </div>
                            <Table>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Nama</th>
                                    <th>Harga</th>
                                    <th>Qty</th>
                                    <th>Total Harga</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.renderListCart()}
                            </tbody>
                            
                            </Table>
                            <div className ="Row">
                            {this.renderTotalHarga()}
                            </div>
                            
                            </center>
                        </div>        
                    )         
            
                
              }
    }
    
  }

const mapStateToProps = (state) => {
  return{
    username : state.auth.username
  }
}

export default connect(mapStateToProps) (Cart)