import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import './TipInList.css';

class TipInList extends Component {
    constructor(props) {
        super(props);
        this.colores = {
            1: 'rgb(70, 157, 204)',
            2: 'rgb(133, 177, 45)',
            3: 'rgb(113, 25, 65)',
            4: 'rgb(232, 100, 44)',
        };
    }

    clicked = () => {
        this.props.history.push({
            pathname: '/cupitip/' + this.props.tip._id,
            tip: this.props.tip,
        });
    };

    render() {
        return (
            <div className='tipInList' onClick={this.clicked.bind(this)}>
                <div>
                    <div
                        className='numeroNivel'
                        style={{
                            backgroundColor: this.colores[this.props.tip.nivel],
                        }}
                    >
                        {'N' + this.props.tip.nivel}
                    </div>
                    <div className='txtNombre'>{this.props.tip.nombre}</div>
                </div>
                <div>
                    <div className='tema'>{this.props.tip.tema}</div>
                    <div
                        className='likes'
                        style={{
                            backgroundColor: this.colores[this.props.tip.nivel],
                        }}
                    >
                        {this.props.tip.likes + ' '}
                        <div className='fas fa-star'></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(TipInList);
