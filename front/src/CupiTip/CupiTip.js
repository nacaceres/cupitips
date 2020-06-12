import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import CodeMirror from '@uiw/react-codemirror';
import CodeMirror2 from 'codemirror';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/darcula.css';
import './CupiTip.css';
import refreshIcon from './refresh.svg';

class CupiTip extends Component {
    constructor(props) {
        super(props);
        this.props.hideFilter();
        this.state = {
            comment: '',
            id: this.props.match.params.id,
            current_correcto: '',
            current_incorrecto: '',
            resultadoCorrecto: undefined,
            resultadoIncorrecto: undefined,
            editorBien: undefined,
            editorMal: undefined,
        };
        this.colores = {
            1: 'rgb(70, 157, 204)',
            2: 'rgb(133, 177, 45)',
            3: 'rgb(113, 25, 65)',
            4: 'rgb(232, 100, 44)',
        };
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

    clickBack = () => {
        this.props.history.goBack();
    };

    buscarTip(idActual) {
        let tips = this.props.tips;
        for (let i = 0; i < tips.length; i++) {
            if (tips[i]._id === idActual) {
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
                        resultadoCorrecto: {
                            correct: true,
                            msg: 'El Resultado es: \n' + resp,
                        },
                    });
                });
        } catch (error) {
            let e = error
                .toString()
                .split('File "<unknown>",')[1]
                .split('at')[0]
                .split('\n');
            let msgE = 'Error\n' + e[3] + '\n' + e[0] + '\n' + e[1] + '\n';
            this.setState({
                resultadoIncorrecto: { correct: false, msg: msgE },
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
                        resultadoCorrecto: {
                            correct: true,
                            msg: 'El Resultado es: \n' + resp,
                        },
                    });
                });
        } catch (error) {
            let e = error
                .toString()
                .split('File "<unknown>",')[1]
                .split('at')[0]
                .split('\n');
            let msgE = 'Error\n' + e[3] + '\n' + e[0] + '\n' + e[1] + '\n';

            this.setState({
                resultadoIncorrecto: { correct: false, msg: msgE },
            });
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
        for (let i in partes) {
            if (i % 2 == 0) {
                content.push(partes[i]);
            } else {
                content.push(<span className='hightlight'>{partes[i]}</span>);
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

        if (this.props.tips.length > 0 && tip === null) {
            this.props.history.push('/NotFound');
        }

        if (tip === null) {
            return <div></div>;
        }
        return (
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
                                <img src={refreshIcon} />
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
                            {this.state.resultadoCorrecto && (
                                <p className='compileBien'>
                                    {this.state.resultadoCorrecto.msg}
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
                                <img src={refreshIcon} />
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
                            {this.state.resultadoIncorrecto && (
                                <p className='compileMal'>
                                    {this.state.resultadoIncorrecto.msg}
                                </p>
                            )}
                        </form>
                    </div>
                </div>
                <button
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
                </div>
            </div>
        );
    }
}

export default withRouter(CupiTip);
