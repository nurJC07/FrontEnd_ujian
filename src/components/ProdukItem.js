import React, { Component } from 'react';
import { connect } from 'react-redux';
import { select_produk } from '../actions';

class ProdukItem extends Component {

    onItemClick = () => {
        this.props.select_produk(this.props.produk);
    }

    render() {
        const { img, nama, description, harga, merek } = this.props.produk;
        return (
            <div onClick={this.onItemClick} className={`col-md-${this.props.size} col-sm-6 portfolio-item`}>
                <a className="portfolio-link" data-toggle="modal" href="#portfolioModal1">
                    <div className="portfolio-hover">
                        <div className="portfolio-hover-content">
                            <i className="fas fa-plus fa-3x" />
                        </div>
                    </div>
                    <img className="img-fluid" src={img} width="400px" height="300px" alt="ferguso" />
                </a>
                <div className="portfolio-caption">
                    <h4>{nama}</h4>
                    <h4>{merek}</h4>
                    <p className="text-muted">{description}</p>
                    <h4>Rp. {harga}</h4>
                </div>
            </div>  
        );
    }
}

export default connect(null, { select_produk })(ProdukItem);

/* pada src, description dan nama ada proses description.
Seharusnya this.props.produk.img, this.props.produk.nama, this.props.produk.description */