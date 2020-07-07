/* eslint-disable linebreak-style */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './levelTipList.css';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import LevelinList from './levelinList/levelinList';

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
                n2.push(tips[i]);
            }
            if (tips[i].nivel === 3) {
                n3.push(tips[i]);
            }
            if (tips[i].nivel === 4) {
                n4.push(tips[i]);
            }
        }
        this.n1 = n1;
        this.n2 = n2;
        this.n3 = n3;
        this.n4 = n4;
        this.state = {
            openN1: false,
            openN2: false,
            openN3: false,
            openN4: false
        };
    }

    handleClickN1 = () => {
        console.log(this.state.openN1);
        this.setState({ openN1: !this.state.openN1});
    };

    handleClickN2 = () => {
        console.log(this.state.openN2);
        this.setState({ openN2: !this.state.openN2});
    };
    
    handleClickN3 = () => {
        console.log(this.state.openN3);
        this.setState({ openN3: !this.state.openN3});
    };

    handleClickN4 = () => {
        console.log(this.state.openN4);
        this.setState({ openN4: !this.state.openN4});
    };

    renderElemsN1(col) {
        return this.n1.map((tip) => (
            <LevelinList key={'TipInList' + tip._id} tip={tip}></LevelinList>
        ));
    }
    renderElemsN2(col) {
        return this.n2.map((tip) => (
            <LevelinList key={'TipInList' + tip._id} tip={tip}></LevelinList>
        ));
    }
    renderElemsN3(col) {
        return this.n3.map((tip) => (
            <LevelinList key={'TipInList' + tip._id} tip={tip}></LevelinList>
        ));
    }
    renderElemsN4(col) {
        return this.n4.map((tip) => (
            <LevelinList key={'TipInList' + tip._id} tip={tip}></LevelinList>
        ));
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
                <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    
                    className = "root"
                >
                    <ListItem >
                        <h2 className= 'listTxt'>Otros Tips</h2>
                    </ListItem>
                    <ListItem button onClick={this.handleClickN1}>
                        <ListItemText primary="Nivel 1" className='listTxt'/>
                        {this.state.openN1 ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={this.state.openN1} unmountOnExit>
                        <List component="div" disablePadding>
                            {this.renderElemsN1()}
                        </List>
                    </Collapse>
                    <ListItem button onClick={this.handleClickN2}>
                        <ListItemText primary="Nivel 2" className='listTxt'/>
                        {this.state.openN2 ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={this.state.openN2} unmountOnExit>
                        <List component="div" disablePadding>
                            {this.renderElemsN2()}
                        </List>
                    </Collapse>
                    <ListItem button onClick={this.handleClickN3}>
                        <ListItemText primary="Nivel 3" className='listTxt'/>
                        {this.state.openN3 ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={this.state.openN3} unmountOnExit>
                        <List component="div" disablePadding>
                            {this.renderElemsN3()}
                        </List>
                    </Collapse>
                    <ListItem button onClick={this.handleClickN4}>
                        <ListItemText primary="Nivel 4" className='listTxt'/>
                        {this.state.openN4 ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={this.state.openN4} unmountOnExit>
                        <List component="div" disablePadding>
                            {this.renderElemsN4()}
                        </List>
                    </Collapse>
                </List> 
            </div>
        );
    }
}
export default withRouter(LevelTipList);