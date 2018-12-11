import React, { Component} from 'react'
import axios from 'axios';
import '../index.css'
import '../Support/CSS/produk.css'



class ManageProdukBertasbih extends Component {
    state = { listPopok: [], idSelectedtoEdit: 0}

    componentDidMount() {
       this.getPopokList();
      }

    getPopokList = () => {
        axios.get('http://localhost:3001/popok')
    
        .then((res) => {
            console.log(res.data)
            this.setState({listPopok: res.data})
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

        axios.post('http://localhost:3001/popok', {
            nama, merek, harga, img, description
        })
        .then((res) => {
            console.log(res)
            this.getPopokList()
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

        axios.put('http://localhost:3001/popok/'+id, {
            nama, merek, harga, img, description
        })
        .then((res) => {
            console.log(res)
            this.setState({idSelectedtoEdit:0})
            this.getPopokList()
        })
        .catch((err) => {
            console.log(err)
        })
    }


    onBtnDeleteClick = (id) => {
        if(window.confirm('Are sure want to delete this item?')){
            axios.delete('http://localhost:3001/popok/' + id)
            .then((res) => {
                this.getPopokList();
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }
   
    
    renderBodyPopok = () => {
        var listJSXPopok = this.state.listPopok.map(({id,nama,merek,harga,img,description}) => {
            if (this.state.idSelectedtoEdit === id) {
                return (
                    <tr>
                        <td>{id}</td>
                        <td><input type="text" ref="namaEdit" defaultValue={nama}/></td>
                        <td><select ref="merekEdit" defaultValue={merek}>
                                    <option>Merry</option>
                                    <option>Sweety</option>
                                    <option>Johnson</option>
                                </select></td>
                        <td>Rp. <input type="number" ref="hargaEdit" defaultValue={harga}/></td>
                        <td><input type="text" ref="imgEdit" defaultValue={img}/></td>
                        <td><textarea ref="descEdit" defaultValue={description}/></td>
                        <td><input className="btn btn-success" type="button" value="Save"  onClick={() => this.onBtnSaveClick(id)}/></td>
                        <td><input className="btn btn-danger" type="button" value="Cancel" onClick={() => this.setState({idSelectedtoEdit:0})} /></td>
                    </tr>
                    )
            }
            return (
                <tr>
                        <td>{id}</td>
                        <td>{nama}</td>
                        <td>{merek}</td>
                        <td>Rp. {harga}</td>
                        <td><img src={img} width="50px" alt={nama} /></td>
                        <td>{description}</td>
                        <td><input className="btn btn-primary" type="button" value="Edit"  onClick={() => this.onBtnEditClick(id)}/></td>
                        <td><input className="btn btn-danger" type="button" value="Delete" onClick={()=> this.onBtnDeleteClick(id)}/></td>
                    </tr>
            )
             
        })
        return listJSXPopok;
    }

    render() {
        return (          
           
            <div className="container-fluid">
            <div className="row" >
            <div className="col-lg-12 text-center">
                        <h2 className="section-heading text-uppercase">Manage Popok</h2>
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
                        {this.renderBodyPopok()}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td></td>
                            <td><input type="text" ref="namaAdd" /></td>
                            <td><select ref="merekAdd">
                                    <option>Merry</option>
                                    <option>Sweety</option>
                                    <option>Johnson</option>
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
        
 
export default ManageProdukBertasbih;