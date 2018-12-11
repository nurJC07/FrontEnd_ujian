import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios'
import queryString from 'query-string'
import {Input , Form} from 'reactstrap'
import {select_produk, addCart} from '../actions'

class ProdukDetail extends Component {

componentDidMount(){
 console.log(this.props.location.search)
    var params = queryString.parse(this.props.location.search)
    // var produkId = this.props.match.params.id;
    var produkId = params.produk_id
    axios.get(`http://localhost:3001/popok/${produkId}`)
    .then((res) => {
        this.props.select_produk(res.data)
    }).catch ((err) => {
        console.log (err)
    })
}

onBtnCart = () => {
    var produkId= this.props.popok.id
    var nama = this.props.popok.nama
    var img = this.props.popok.img
    var harga = this.props.popok.harga
    var qty = 0
    
    axios.post('http://localhost:3001/cart' , {
        username : this.props.username,
        produkId : produkId,
        nama : nama,
        img : img,
        harga : harga,
        qty : qty,
        total : harga*qty,
        id_order : 1
       }).then((res) => {
      console.log(res)
      alert('Produk berhasil dimasukan ke Keranjang')
      this.props.addCart() 
    }).catch((err) => {
      console.log(err)
    })
    }
   


    render() {
        var { nama, harga, img, description, merk } = this.props.popok;
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-4">
                        <img alt={img} src={img} className="img-responsive" />
                    </div>
                    <div className="col-8">
                        <div className="row">
                            <h1>{nama}</h1>
                        </div>
                        <div className="row">
                            <h3>{merk}</h3>
                        </div>
                        <div className="row">
                            <h2>Rp. {harga}</h2>
                        </div>
                        <div className="row">
                            <p>{description}</p>
                        </div>
                        <div>
                        <tb><input type="number" ref="qty" /></tb>
                         </div> 
                        <input type="button" className="btn btn-success" value="Add To Chart" onClick={this.onBtnCart} />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { popok: state.selectedProduk,
        count: state.count }
}

export default connect(mapStateToProps, {select_produk, addCart})(ProdukDetail);






