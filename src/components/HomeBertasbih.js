import React, {Component} from 'react';
import {connect} from 'react-redux'
import axios from 'axios';


class HomeBertasbih extends Component {
    state = { listPopok: [] }

    componentDidMount() {
        axios.get('http://localhost:3001/popok')
            .then((res) => {
                console.log(res.data)
                this.setState({ listPopok: res.data })
            }).catch((err) => {
                console.log(err)
            })
    }

    renderListPopok = () => {
        var listJSXPopok = this.state.listPopok.map((item) => {
            return (
                <div>
                    <h3>{item.nama}</h3>
                    <p>{item.description}</p>
                </div>
            )
        })
        return listJSXPopok;
    }
    render () {
        return (
            <div>
                <h1>Welcome To Nur Journey</h1>
              
                {this.renderListPopok()}
                <h2> {this.props.pikachu}</h2>
                </div>
        )}}

    const mapStateToProps =(state) =>{
return(
     {pikachu:state.pikachu}
)
    }

// export default HomeBertasbih;
export default connect(mapStateToProps)(HomeBertasbih)