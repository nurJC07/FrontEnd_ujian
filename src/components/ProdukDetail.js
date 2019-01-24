import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios'
import queryString from 'query-string'
import {select_produk} from '../actions'

class ProdukDetail extends Component {

componentDidMount(){
 console.log(this.props.location.search)
    var params = queryString.parse(this.props.location.search)
    // var produkId = this.props.match.params.id;
    var produkId = params.produk_id
    axios.get(`http://localhost:3001/produk/${produkId}`)
    .then((res) => {
        this.props.select_produk(res.data)
    }).catch ((err) => {
        console.log (err)
    })
}

onBtnCart = () => {
    var { id, nama, harga, img } = this.props.produk;
    var quantity = parseInt(this.refs.tbQuantity.value);
    
    axios.get('http://localhost:3001/cart' , {
        params:{
            username : this.props.username,
            produkId : id
        }
        
       }).then((res) => {
        if(res.data.length > 0) {
            axios.put('http://localhost:3001/cart/' + res.data[0].id, {
                username : this.props.username,
                produkId : id,
                    harga,
                    quantity,
                    nama,
                    img
    }).then((res) => {
        alert('Edit Cart Success!')
    }).catch((err) => {
        console.log(err)
    })
}else {
    axios.post('http://localhost:3001/cart', {
        username : this.props.username,
        produkId : id,
        harga,
        quantity,
        nama,
        img
        }).then ((res)=> {
            alert('Produk berhasil dimasukan ke Keranjang')
        }).catch((err) => {
            console.log(err)
        })
    }
}).catch(err => {
    console.log(err)
})
}

    render() {
        var { nama, harga, img, description, merek } = this.props.produk;
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-4">
                        <img alt={img} src={img} width="400px" className="img-responsive" />
                    </div>
                    <div className="col-8">
                        <div className="row">
                            <h1>{nama}</h1>
                        </div>
                        <div className="row">
                            <h3>{merek}</h3>
                        </div>
                        <div className="row">
                            <h2>Rp. {harga}</h2>
                        </div>
                        <div className="row">
                            <p>{description}</p>
                        </div>
                        <div className="row">
                            <div className="col-3">
                                <input type="number" ref="tbQuantity" defaultValue={1} />
                            </div>
                        </div>
                        <input type="button" className="btn btn-success" value="Add To Chart" onClick={this.onBtnCart} />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { produk: state.selectedProduk,
        username: state.auth.username }
}

export default connect(mapStateToProps, {select_produk})(ProdukDetail);






