import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import CodeMirror from '@uiw/react-codemirror';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/darcula.css';
import './CupiTip.css';
import refreshIcon from './refresh.svg';
import LevelTipList from "./levelTipList/levelTipList.js";
import { Container, Row, Col } from 'reactstrap';

class CupiTip extends Component {
    constructor(props) {
        super(props);
        //console.log(props);
        this.state = {
            comment: '',
            id: this.props.match.params.id,
            current_correcto: '',
            current_incorrecto: '',
            resultadoCorrectoC: false,
            resultadoCorrectoI: false,
            resultadoIncorrectoC: false,
            resultadoIncorrectoI: false,
            editorBien: undefined,
            editorMal: undefined,
        };
        this.colores = {
            1: 'rgb(70, 157, 204)',
            2: 'rgb(133, 177, 45)',
            3: 'rgb(113, 25, 65)',
            4: 'rgb(232, 100, 44)',
        };
        this.idTip = undefined;
        this.nuevo = false;
        //console.log(this.props.tips);
    }

    handleIncorrectoChange = (editor) => {
        this.setState({
            current_incorrecto: editor.getValue(),
            editorMal: editor,
        });
    };

    handleCorrectoChange = (editor) => {
        this.setState({
            current_correcto: editor.getValue(),
            editorBien: editor,
        });
    };

    formatCode = (code) => {
        let newCode = code.split('\\n').join('\n');
        return newCode;
    };

    componentDidMount() {
        if (this.props.location.olddetailstate !== undefined) {
            this.setState(this.props.location.olddetailstate);
        }
        
    }
    
    componentDidUpdate(){
        if(this.nuevo){
            //console.log("UPDATE");
            //console.log(this.idTip);
            this.setState({
                resultadoCorrectoC: undefined,
                resultadoCorrectoI: undefined,
                resultadoIncorrectoC: undefined,
                resultadoIncorrectoI: undefined,
            });
        }
        
    }
   

    clickBack = () => {
        this.props.history.goBack();
    };

    buscarTip(idActual) {
        //console.log(idActual);
        let tips = this.props.tips;
        for (let i = 0; i < tips.length; i++) {
            if (this.idTip !== idActual) {
                this.nuevo = true;
            }
            else {
                this.nuevo = false;
            }
            if (tips[i]._id === idActual) {
                this.idTip = idActual;
                return tips[i];
            }
        }
        return null;
    }
    sugerirTip = () => {
        this.props.history.push('/CreateTip');
    };

    sendComment = () => {
        if (this.props.autenticado) {
            let req = {};
            req['_id'] = this.state.id;
            req.comentario = this.state.comment;
            fetch('comment', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(req),
            })
                .then((response) => response.json())
                .then((resp) => {
                    if (resp.result.n > 0) {
                        alert('Tu comentario ha sido enviado correctamente.');
                    } else {
                        alert(
                            'Ha ocurrido un error y tu comentario no pudo ser enviado.'
                        );
                    }
                });
        } else {
            this.props.history.push({
                pathname: '/auth',
                olddetailstate: this.state,
            });
        }
    };

    sendLike = () => {
        if (this.props.autenticado) {
            let req = {};
            req['_id'] = this.props.match.params.id;
            fetch('like', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(req),
            })
                .then((response) => response.json())
                .then((resp) => {
                    if (resp.result.n > 0) {
                        this.props.actualizarTips();
                    } else {
                        alert(
                            'Ha ocurrido un error y tu like no pudo ser enviado.'
                        );
                    }
                });
        } else {
            this.props.history.push('/auth');
        }
    };

    handleCompileBien = () => {

        
        try {
            window.pyodide
                .runPythonAsync(this.state.current_correcto)
                .then((output) => {
                    var resp = output;
                    this.setState({
                        resultadoCorrectoC: { correct: true, msg: 'El Resultado es: \n' + resp,},
                        resultadoCorrectoI: undefined,
                        
                    });
                })
                .catch((error)=>{
                    var e1 = error.toString();
                    if(e1.includes('[')){
                        var e2 = e1.split("[");
                        var un = e2[0];
                        var err= e2[1].split("]")[1];
                        var temp = un.split('\n');
                        var line = temp[temp.length-2];
                        var parts = line.split(',');
                        var l = parts[1];
                        var msm = parts[2];
                        //console.log(l);
                        //console.log(msm);
                        //console.log(err);
                        let msgE = 'Error\n' + err + '\n' + l + ' ' + msm + '\n';

                        this.setState({
                            resultadoCorrectoI: { correct: false, msg: msgE },
                            resultadoCorrectoC: undefined,
                            
                        });
                    }
                    else{
                        var t = e1.split('\n');
                        var er = t[t.length-2];
                        var lin = t[t.length-3];
                        var part = lin.split(',');
                        //console.log(er);
                        //console.log(lin);
                        let msgE = 'Error\n' + er + '\n' + part[1] + ' ' + part[2] + '\n';

                        this.setState({
                            resultadoCorrectoI: { correct: false, msg: msgE },
                            resultadoCorrectoC: undefined,
                        });
                    }
                });
        } catch (error) {
            let e = error
                .toString()
                .split('File "<unknown>",')[1]
                .split('at')[0]
                .split('\n');
            let msgE = 'Error\n' + e[3] + '\n' + e[0] + '\n' + e[1] + '\n';
            this.setState({
                resultadoCorrectoI: { correct: false, msg: msgE },
                resultadoCorrectoC: undefined,
            });
        }
        
    };

    handleCompileMal = () => {
        try {
            window.pyodide
                .runPythonAsync(this.state.current_incorrecto)
                .then((output) => {
                    var resp = output;
                    this.setState({
                        resultadoIncorrectoC: {
                            correct: true,
                            msg: 'El Resultado es: \n' + resp,
                        },
                        resultadoIncorrectoI: undefined,
                    });
                })
                .catch((error)=>{
                    var e1 = error.toString();
                    if(e1.includes('[')){
                        var e2 = e1.split("[");
                        var un = e2[0];
                        var err= e2[1].split("]")[1];
                        var temp = un.split('\n');
                        var line = temp[temp.length-2];
                        var parts = line.split(',');
                        var l = parts[1];
                        var msm = parts[2];
                        //console.log(l);
                        //console.log(msm);
                        //console.log(err);
                        let msgE = 'Error\n' + err + '\n' + l + ' ' + msm + '\n';

                        this.setState({
                            resultadoIncorrectoI: { correct: false, msg: msgE },
                            resultadoIncorrectoC: undefined,
                        });
                    }
                    else{
                        var t = e1.split('\n');
                        var er = t[t.length-2];
                        var lin = t[t.length-3];
                        var part = lin.split(',');
                        //console.log(er);
                        //console.log(lin);
                        let msgE = 'Error\n' + er + '\n' + part[1] + ' ' + part[2] + '\n';
                        
                        this.setState({
                            resultadoIncorrectoI: { correct: false, msg: msgE },
                            resultadoIncorrectoC: undefined,
                        });
                    }
                });
                
        } catch (error) {
            //console.log(error);
            let es = error.toString();
            if( es.includes('File "<unknown>",')){
                //console.log("Sintax");
                let e = error
                    .toString()
                    .split('File "<unknown>",')[1]
                    .split('at')[0]
                    .split('\n');
                let msgE = 'Error\n' + e[3] + '\n' + e[0] + '\n' + e[1] + '\n';

                this.setState({
                    resultadoIncorrectoI: { correct: false, msg: msgE },
                    resultadoIncorrectoC: undefined,
                });
            }
            //console.log("FFF");
        }
    };

    handleChangeCode(event) {
        this.setState({ value: event.target.value });
    }

    onChangeText(e) {
        this.setState({ comment: e.target.value });
    }

    keyPress = (e) => {
        if (e.keyCode === 13) {
            this.sendComment();
        }
    };

    renderDescription = (tip) => {
        let partes = tip.descripcion.split('**');
        let content = [];
        let id = tip._id;
        for (let i in partes) {
            if (i % 2 === 0) {
                content.push(partes[i]);
            } else {
                content.push(<span key= {id+i} className='hightlight'>{partes[i]}</span>);
            }
        }
        return <p className='description'>{content}</p>;
    };

    handleRefreshCorrect = (tip) => {
        this.state.editorBien.setValue(this.formatCode(tip.codigo_bien_p));
    };

    handleRefreshIncorrect = (tip) => {
        this.state.editorMal.setValue(this.formatCode(tip.codigo_mal_p));
    };

   

    render() {
        let tip = this.buscarTip(this.props.match.params.id);
        //console.log(tip);
        //console.log(this.state);
     

        if (this.props.tips.length > 0 && tip === null) {
            this.props.history.push('/NotFound');
        }

        if (tip === null) {
            return <div></div>;
        }

        return (
            <div>
                <Container>
                    <Row>
                        <Col xs="10">
                            <div className='container-fluid'>
                                <div className='filaNombreTip flexbox'>
                                    <div
                                        className='lblnivelTip'
                                        style={{ backgroundColor: this.colores[tip.nivel] }}
                                    >
                                    N{tip.nivel}
                                    </div>
                                    <h1 className='lblNombreTip'>{tip.nombre}</h1>
                                </div>
                                <div className='filaDescTip'>
                                    <h2>Descripción:</h2>
                                    {this.renderDescription(tip)}
                                </div>
                                <div className='filaTemaTip'>
                                    <div>
                                        <h3>Temas:</h3>
                                        <button
                                            className='btn btn-outline-like'
                                            onClick={this.sendLike}
                                        >
                                            {tip.likes} <span className='fas fa-star'></span>
                                        </button>
                                    </div>
                                    <div className=' temasContainer flexbox'>
                                        <div className='temaTip'>{tip.tema}</div>
                                    </div>
                                </div>
                                <div className='row filaCodigoTip1'>
                                    <div className='col-sm-6'>
                                        <div>
                                            <h4 className='codigolblTip'>Código Correcto:</h4>
                                            <button
                                                className='refreshButton'
                                                onClick={() => this.handleRefreshCorrect(tip)}
                                            >
                                                <img src={refreshIcon} alt='' />
                                            </button>
                                        </div>
                                        <form>
                                            <CodeMirror
                                                onChange={this.handleCorrectoChange}
                                                value={this.formatCode(tip.codigo_bien_p)}
                                                options={{
                                                    theme: 'darcula',
                                                    keyMap: 'sublime',
                                                    mode: 'python',
                                                    lineNumbers: true,
                                                }}
                                            />
                                            <button
                                                type='button'
                                                className='botonEjecutar btn btn-primary'
                                                disabled={!this.props.seCargoPyodide}
                                                onClick={this.handleCompileBien}
                                            >
                                                <i className='fas fa-dragon'></i> Ejecutar
                                            </button>
                                            {this.state.resultadoCorrectoC && (
                                                <p className='compileBien'>
                                                    {this.state.resultadoCorrectoC.msg}
                                                </p>
                                            )}
                                            {this.state.resultadoCorrectoI && (
                                                <p className='compileMal'>
                                                    {this.state.resultadoCorrectoI.msg}
                                                </p>
                                            )}
                                        </form>
                                    </div>
                                    <div className='col-sm-6'>
                                        <div>
                                            <h4 className='codigolblTip'>Código Incorrecto:</h4>
                                            <button
                                                className='refreshButton'
                                                onClick={() => this.handleRefreshIncorrect(tip)}
                                            >
                                                <img src={refreshIcon} alt=''/>
                                            </button>
                                        </div>
                                        <form>
                                            <CodeMirror
                                                onChange={this.handleIncorrectoChange}
                                                value={this.formatCode(tip.codigo_mal_p)}
                                                options={{
                                                    theme: 'darcula',
                                                    keyMap: 'sublime',
                                                    mode: 'python',
                                                    lineNumbers: true,
                                                }}
                                            />
                                            <button
                                                type='button'
                                                className='botonEjecutar btn btn-primary'
                                                disabled={!this.props.seCargoPyodide}
                                                onClick={this.handleCompileMal}
                                            >
                                                <i className='fas fa-dragon'></i> Ejecutar
                                            </button>
                                            {this.state.resultadoIncorrectoC && ( 
                                                <p className='compileBien'>
                                                    {this.state.resultadoIncorrectoC.msg}
                                                </p>
                                            )}
                                            {this.state.resultadoIncorrectoI && ( 
                                                <p className='compileMal'>
                                                    {this.state.resultadoIncorrectoI.msg}
                                                </p>
                                            )}
                                        </form>
                                    </div>
                                </div>
                                {/* <button
                                    type='button'
                                    className='btn btn-primary botonAgregar'
                                    data-toggle='collapse'
                                    data-target='#collapseComentario'
                                    aria-expanded='false'
                                    aria-controls='collapseComentario'
                                >
                                    Agregar Comentario
                                </button>
                                <div className='row'>
                                    <div
                                        className='collapse col-sm-8 mx-auto text-center'
                                        id='collapseComentario'
                                    >
                                        <div className='row colComent mx-auto text-center'>
                                            <textarea
                                                onKeyDown={this.keyPress}
                                                onChange={this.onChangeText.bind(this)}
                                                className='form-control rounded-0'
                                                value={this.state.comment}
                                                rows='4'
                                            ></textarea>
                                        </div>
                                        <div className='row'>
                                            <button
                                                className='btn btn-primary mx-auto'
                                                onClick={this.sendComment}
                                            >
                                                Enviar
                                            </button>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </Col>
                        <Col xs="2">
                            <LevelTipList
                                tips={this.props.tips}>

                            </LevelTipList>
                        </Col>
                    </Row>
                </Container>
            </div>
            
        );
    }
}

export default withRouter(CupiTip);
