import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import './TipInList.css';
class TipInList extends Component {
    clicked = () => {
        this.props.history.push({
            pathname: '/cupitip/' + this.props.tip._id,
            tip: this.props.tip,
        });
    };

    render() {
        return (
            <div
                className="tipInList container-flex disable-select"
                onClick={this.clicked.bind(this)}
            >
                <div className="row tipTitle">
                    <div className="col-sm-2">
                        <div className="numeroNivel mx-auto">
                            <div className="txtNumeroNivel">
                                {'N' + this.props.tip.nivel}
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-10 text-left my-auto txtNombre">
                        <div className="row">{this.props.tip.nombre}</div>
                    </div>
                </div>
                <div className="row tags">
                    <div className="col-sm-9 text-left">
                        <label className="tema">{this.props.tip.tema}</label>
                    </div>
                    <div className=" col-sm-3 text-right parLikes">
                        <div className="likes">
                            {this.props.tip.likes}{' '}
                            <span className="fas fa-star"></span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(TipInList);
