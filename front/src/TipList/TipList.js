import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './TipList.css';
import TipInList from './TipInList/TipInList.js';
import logo from './imagenes/LPT-12.png'

class TipList extends Component {
    componentDidMount() {
        this.props.showFilter();
    }

    renderElems(col) {
        return this.props.tips.map((tip) => (
            <TipInList key={'TipInList' + tip._id} tip={tip}></TipInList>
        ));
    }

    sugerir = () => {
        this.props.history.push('/createtip');
    };

    render() {
        return (
            <div>
                <div >
                    <img src={logo} alt='Logo' className="rounded mx-auto d-block" width='25%'/>
                </div>
                <div className='container-fluid' id='tipList'>
                    <div className='tipListContainer flexbox'>
                        {this.renderElems()}
                    </div>
                    <div className='row'>
                        {/* <div className='col-sm-6 text-center mx-auto'>
                        <button
                            className='btn btn-primary'
                            onClick={this.sugerir}
                        >
                            Sugerir Tip
                        </button>
                    </div> */}
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(TipList);
