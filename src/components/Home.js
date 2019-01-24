import React, {Component} from 'react';
import {connect} from 'react-redux'
import axios from 'axios';


class Home extends Component {
    state = { listProduk: [] }

    componentDidMount() {
        axios.get('http://localhost:3001/produk')
            .then((res) => {
                console.log(res.data)
                this.setState({ listProduk: res.data })
            }).catch((err) => {
                console.log(err)
            })
    }

    renderlistProduk = () => {
        var listJSXProduk = this.state.listProduk.map((item) => {
            return (
                <div>
                    <h3>{item.nama}</h3>
                    <p>{item.description}</p>
                </div>
            )
        })
        return listJSXProduk;
    }
    render () {
        return (
            <div>
                <h1>Welcome To Nur Journey</h1>
              
                {this.renderlistProduk()}
                <h2> {this.props.pikachu}</h2>
                </div>
        )}}

    const mapStateToProps =(state) =>{
return(
     {pikachu:state.pikachu}
)
    }

// export default HomeBertasbih;
export default connect(mapStateToProps)(Home)