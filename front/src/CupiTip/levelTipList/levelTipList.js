/* eslint-disable linebreak-style */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './levelTipList.css';

class LevelTipList extends Component {
    constructor(props) {
        console.log(props);
        super(props);
        this.colores = {
            1: 'rgb(70, 157, 204)',
            2: 'rgb(133, 177, 45)',
            3: 'rgb(113, 25, 65)',
            4: 'rgb(232, 100, 44)',
        };
        let n1 =[];
        let n2 =[];
        let n3 =[];
        let n4 =[];
        let tips = this.props.tips;
        for (let i = 0; i < tips.length; i++) {
            if (tips[i].nivel === 1) {
                n1.push(tips[i]);
            }
            if (tips[i].nivel === 2) {
                n2.push(tips[i].nombre);
            }
            if (tips[i].nivel === 3) {
                n3.push(tips[i].nombre);
            }
            if (tips[i].nivel === 4) {
                n4.push(tips[i].nombre);
            }
        }
        this.n1 = n1;
        this.n2 = n2;
        this.n3 = n3;
        this.n4 = n4;
    }

    clicked = () => {
        this.props.history.push({
            pathname: '/cupitip/' + this.props.tip._id,
            tip: this.props.tip,
        });
    };

    render() {
        return (
            <div>
                <h2> Tips Nivels 1</h2>
                <ul className= "lstnivel">
                    {this.n1.map(item => {
                        return <div key = {item.nombre}
                            className='numeroNivel'
                            style={{
                                backgroundColor: this.colores[1]
                            }}
                            //onClick={this.clicked(this)}
                        >
                            {item.nombre}
                        </div>;
                    })}
                </ul>
                <h2> Tips Nivels 2</h2>
                <ul className= "lstnivel">
                    {this.n2.map(item => {
                        return <div key = {item}
                            className='numeroNivel'
                            style={{
                                backgroundColor: this.colores[2]
                            }}
                        >
                            {item}
                        </div>;
                    })}
                </ul>
                <h2> Tips Nivels 3</h2>
                <ul className= "lstnivel">
                    {this.n3.map(item => {
                        return <div key = {item}
                            className='numeroNivel'
                            style={{
                                backgroundColor: this.colores[3]
                            }}
                        >
                            {item}
                        </div>;
                    })}     
                </ul>
                <h2> Tips Nivels 4</h2>
                <ul className= "lstnivel">
                    {this.n4.map(item => {
                        return <div key = {item}
                            className='numeroNivel'
                            style={{
                                backgroundColor: this.colores[4]
                            }}
                        >
                            {item}
                        </div>;
                    })}
                </ul>
            </div>
        );
    }
}
export default withRouter(LevelTipList);