/* eslint-disable linebreak-style */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
class LevelinList extends Component {
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
            <div  onClick={this.clicked.bind(this)}>
                <ListItem button className='classes.nested' key='item._id'>
                    <p className='lblnivelTip'
                        style={{ backgroundColor: this.colores[this.props.tip.nivel] }}>
                        {'N' + this.props.tip.nivel}
                    </p>
                    <ListItemText primary={this.props.tip.nombre} className='listTxt' />
                </ListItem>
            </div>
        );
    }
}

export default withRouter(LevelinList);
