import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ProdukItem from './ProdukItem';

class ProdukList extends Component {
    state = { listPopok: [], searchListPopok: [] }

    componentDidMount() {
        axios.get('http://localhost:3001/popok')
            .then((res) => {
                this.setState({ listPopok: res.data, searchListPopok: res.data })
            }).catch((err) => {
                console.log(err)
            })
    }

    onBtnSearchClick = () => {
        var nama = this.refs.searchNama.value;
        var merek = this.refs.searchMerek.value;
        var hargaMin = parseInt(this.refs.hargaMinSearch.value);
        var hargaMax = parseInt(this.refs.hargaMaxSearch.value);

        var arrSearch = this.state.listPopok.filter((item) => {
            return item.merek.includes(merek) 
                    && item.harga >= hargaMin
                    && item.harga <= hargaMax
                    && item.nama.toLowerCase().includes(nama.toLowerCase())
        })

        this.setState({ searchListPopok: arrSearch })
    }

  renderListPopok = () => {
    var total = 12;
    var size = 4;
    var check = true;
    var listJSXPopok = this.state.searchListPopok.map((item) => {
        if(total === 0 && check === true) {
            size = 6;
            total = 12;
            check = false;
        }
        else if(total === 0 && check === false){
            size = 4;
            total = 12;
            check = true;
        }
        total -= size;

        return (
            <ProdukItem size={size} popok={item} />
        )
    })
    return listJSXPopok;
}

    render (){
      if(this.props.username !== ""){
        if(this.props.popok.id !== 0) {
        //   return <Redirect to = {`/ProdukDetail/${this.props.popok.id}`} />
        return <Redirect to = {`/ProdukDetail?produk_id=${this.props.popok.id}&namaProduk=${this.props.popok.nama}`} />
        }
        return (
            <div>
            <section className="bg-light" id="portfolio">
            <div className="container">
            <div className="row">
            <div className="col-lg-12 text-center">
            <h2 className="section-heading text-uppercase">List Popok</h2>
            <h3 className="section-subheading text-muted">Best popok in town.</h3>
            </div>
            </div>
            <div className="form-group">
            Filter by Merk: <select ref="searchMerek">
                <option value="">All Merk</option>
                <option>Johnson</option>
                <option>Sweety</option>
                <option>Merry</option>
            </select>
            </div>
            <div className="form-group">
            Filter by Nama Produk : <input type="text" ref="searchNama" placeholder="Nama Produk"/>
            </div>
            <div className="form-group">
            <span> Harga: Rp. <input type="number" ref="hargaMinSearch" defaultValue="0"/> - Rp. <input type="number" ref="hargaMaxSearch" defaultValue="99999"/>
            </span>
            </div>
            <input type="button" className="btn btn-success" value="Search" onClick={this.onBtnSearchClick} />
            {/* <center><input type="button" className="btn btn-success col-2" value="Search" onClick={this.onBtnSearchClick.bind(this)} /></center> */}
            <div className="row">
            { this.renderListPopok()}
            </div>
            </div>
            </section>
            </div>
  );
}
return <Redirect to ='/Login'/>
}
}

const mapStateToProps = (state) => {
  return {username : state.auth.username, popok : state.selectedProduk}
}

export default connect (mapStateToProps)(ProdukList);