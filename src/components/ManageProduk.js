import React, { Component} from 'react'
import axios from 'axios';
import '../index.css'
import '../Support/CSS/produk.css'

class ManageProduk extends Component {
    state = { listProduk: [], idSelectedtoEdit: 0}

    componentDidMount() {
       this.getProdukList();
      }

      getProdukList = () => {
        axios.get('http://localhost:3001/produk')
    
        .then((res) => {
            console.log(res.data)
            this.setState({listProduk: res.data, idSelectedtoEdit: 0})
        }).catch((err) => {
            console.log (err)
        })
    }
            
    onBtnAddClick = () => {
        var nama = this.refs.namaAdd.value;
        var merek = this.refs.merekAdd.value;
        var harga = this.refs.hargaAdd.value;
        var img = this.refs.imgAdd.value;
        var description = this.refs.descAdd.value;

        axios.post('http://localhost:3001/produk', {
            nama, merek, harga, img, description
        })
        .then((res) => {
            console.log(res)
            this.getProdukList()
        })
        .catch((err) => {
            console.log(err)
        })
    }

    onBtnEditClick = (Idnya) => {
        this.setState({idSelectedtoEdit:Idnya})
    }


    onBtnSaveClick = (id) => {
        var nama = this.refs.namaEdit.value;
        var merek = this.refs.merekEdit.value;
        var harga = this.refs.hargaEdit.value;
        var img = this.refs.imgEdit.value;
        var description = this.refs.descEdit.value;

        axios.put('http://localhost:3001/produk/'+id, {
            nama, merek, harga, img, description
        })
        .then((res) => {
            console.log(res)
            this.getProdukList()
        })
        .catch((err) => {
            console.log(err)
        })
    }


    onBtnDeleteClick = (id) => {
        if(window.confirm('Are sure want to delete this item?')){
            axios.delete('http://localhost:3001/produk/' + id)
            .then((res) => {
                this.getProdukList();
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }
   
    
    renderBodyProduk = () => {
        
        var listJSXProduk = this.state.listProduk.map(({ id, nama, merek, harga, description, img}) => {
            if(id !== this.state.idSelectedtoEdit) {
                return (
                    <tr>
                        <td>{id}</td>
                        <td>{nama}</td>
                        <td>{merek}</td>
                        <td>Rp. {harga}</td>
                        <td><img src={img} width="50px" alt={id} /></td>
                        <td>{description}</td>
                        <td><input className="btn btn-primary" type="button" value="Edit" onClick={() => this.setState({ idSelectedtoEdit: id })} /></td>
                        <td><input className="btn btn-danger" type="button" value="Delete" onClick={() => this.onBtnDeleteClick(id)} /></td>
                    </tr> )
            }
            
            return (
                <tr>
                    <td>{id}</td>
                    <td>
                        <input 
                            type="text" 
                            defaultValue={nama}
                            ref="namaEdit"
                        />
                    </td>
                    <td>
                        <select ref="merekEdit" defaultValue={merek}>
                        <option>Fuji Film</option>
                        <option>Pentax</option>
                        <option>Nikon</option>
                        <option>Canon</option>
                        <option>Go Pro</option>
                        <option>Sony</option>
                        <option>Samsung</option>
                        <option>Olympus</option>
                        <option>Lumix</option>
                        </select>
                    </td>
                    <td>
                        <input
                            type="number"
                            ref="hargaEdit"
                            defaultValue={harga}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            ref="imgEdit"
                            defaultValue={img}
                        />
                    </td>
                    <td>
                        <textarea 
                            defaultValue={description}
                            ref="descEdit"
                        ></textarea>
                    </td>
                    <td><input className="btn btn-primary" type="button" value="Save" onClick={() => this.onBtnSaveClick(id)} /></td>
                    <td><input className="btn btn-danger" type="button" value="Cancel" onClick={() => this.setState({ idSelectedtoEdit: 0 })} /></td>
                </tr> )
            
        })
        return listJSXProduk;
    }
              

    render() {
        return (          
           
            <div className="container-fluid">
            <div className="row" >
            <div className="col-lg-12 text-center">
                        <h2 className="section-heading text-uppercase">Manage Produk</h2>
                        </div>
                </div>
                <center>
           
            <table>   
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nama</th>
                            <th>Merk</th>
                            <th>Harga</th>
                            <th>Image</th>
                            <th>Description</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderBodyProduk()}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td></td>
                            <td><input type="text" ref="namaAdd" /></td>
                            <td><select ref="merekAdd">
                                <option>Fuji Film</option>
                                <option>Pentax</option>
                                <option>Nikon</option>
                                <option>Canon</option>
                                <option>Go Pro</option>
                                <option>Sony</option>
                                <option>Samsung</option>
                                <option>Olympus</option>
                                <option>Lumix</option>
                                </select></td>
                            <td><input type="number" ref="hargaAdd" placeholder="Harga Product"/></td>
                            <td><input type="text" ref="imgAdd" placeholder="Image URL"/></td>
                            <td><textarea ref="descAdd" placeholder="Enter your description about product"/></td>
                            <td><input type="button" className="btn btn-success" value="Add" onClick={this.onBtnAddClick} /></td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
                </center>
       
            </div>
           
            
            )
    }
}
        
 
export default ManageProduk;