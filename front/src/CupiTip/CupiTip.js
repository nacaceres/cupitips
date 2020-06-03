import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import CodeMirror from '@uiw/react-codemirror';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/darcula.css';
import './CupiTip.css';

class CupiTip extends Component {
    constructor(props) {
        super(props);
        this.props.hideFilter();
        this.state = {
            comment: '',
            id: this.props.match.params.id,
            current_correcto: '',
            current_incorrecto: '',
        };
    }

    handleIncorrectoChange = (editor, data, value) => {
        this.setState({ current_incorrecto: editor.getValue() });
    };

    handleCorrectoChange = (editor, data, value) => {
        this.setState({ current_correcto: editor.getValue() });
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

    compliePython(event, code) {
        if (event) {
            var cod = '';
            var parts = code.split('\\n');
            for (let i = 0; i < parts.length; i++) {
                cod = cod + parts[i] + '\n';
            }
            window.pyodide.runPythonAsync(cod).then((output) => {
                var resp = output;
                document.getElementById('compileBien').innerText =
                    'El Resultado es: \n' + resp;
            });
        } else {
            var codm = '';
            var partsm = code.split('\\n');
            for (let i = 0; i < partsm.length; i++) {
                codm = codm + partsm[i] + '\n';
            }
            try {
                window.pyodide.runPythonAsync(codm).then((output) => {
                    var resp = output;
                    console.log(output);
                    document.getElementById('compileMal').innerText =
                        'El Resultado es: \n' + resp;
                });
            } catch (error) {
                console.log('ERROR');
                var e = ('' + error)
                    .split('File "<unknown>",')[1]
                    .split('at')[0]
                    .split('\n');
                var msgE = 'Error\n' + e[3] + '\n' + e[0] + '\n' + e[1] + '\n';
                console.log(msgE);
                document.getElementById('compileMal').innerText = msgE;
            }
            //alert(window.pyodide.runPython(stringm));
        }
    }
    handleChangeCode(event) {
        this.setState({ value: event.target.value });
    }
    Error;
    onChangeText(e) {
        this.setState({ comment: e.target.value });
    }

    keyPress = (e) => {
        if (e.keyCode === 13) {
            this.sendComment();
        }
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
            <div className="container-fluid">
                <div className="row filaNombreTip">
                    <div className="col-sm-1 text-left">
                        <button
                            className="btn btn-primary btnbackTip"
                            onClick={this.clickBack}
                        >
                            Back
                        </button>
                    </div>
                    <div className="col-sm-8 my-auto">
                        <div className="lblNombreTip text-center">
                            {tip.nombre}
                        </div>
                    </div>
                    <div className="col-sm-3 text-left my-auto">
                        <div className="lblnivelTip">Nivel {tip.nivel}</div>
                    </div>
                </div>
                <div className="row filaDescTip">
                    <div className="col-sm-9">
                        <div className="lblDescTip">
                            <span className="descTitleTip">Descripcion:</span>
                            {tip.descripcion}
                        </div>
                    </div>
                    <div className="col-sm-3 text-left my-auto">
                        <button
                            className="btn btn-outline-like"
                            onClick={this.sendLike}
                        >
                            {tip.likes} <span className="fas fa-star"></span>
                        </button>
                    </div>
                </div>
                <div className="row filaTemaTip">
                    <div className="col-sm-2 my-auto text-center">Tema:</div>
                    <div className="col-sm-9 mx-auto text-center">
                        <div className="temaTip">{tip.tema}</div>
                    </div>
                </div>
                <div className="row filaCodigoTip1">
                    <div className="col-sm-6">
                        <div className="codigolblTip">Codigo Correcto:</div>
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
                            <p id="compileBien"></p>
                            <button
                                type="button"
                                className="btn btn-primary"
                                disabled={!this.props.seCargoPyodide}
                                onClick={() =>
                                    this.compliePython(
                                        true,
                                        this.state.current_correcto
                                    )
                                }
                            >
                                <i className="fas fa-dragon"></i> Correr
                            </button>
                        </form>
                    </div>
                    <div className="col-sm-6">
                        <div className="codigolblTip">Codigo Incorrecto:</div>
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
                            <p id="compileMal"></p>
                            <button
                                type="button"
                                className="btn btn-primary"
                                disabled={!this.props.seCargoPyodide}
                                onClick={() =>
                                    this.compliePython(
                                        false,
                                        this.state.current_incorrecto
                                    )
                                }
                            >
                                <i className="fas fa-dragon"></i> Correr
                            </button>
                        </form>
                    </div>
                </div>
                <div className="row filaBtnsTip text-center mx-auto">
                    <div className="col-sm-12 text-center mx-auto">
                        <button
                            type="button"
                            className="btn btn-primary"
                            data-toggle="collapse"
                            data-target="#collapseComentario"
                            aria-expanded="false"
                            aria-controls="collapseComentario"
                        >
                            Agregar Comentario
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div
                        className="collapse col-sm-8 mx-auto text-center"
                        id="collapseComentario"
                    >
                        <div className="row colComent mx-auto text-center">
                            <textarea
                                onKeyDown={this.keyPress}
                                onChange={this.onChangeText.bind(this)}
                                className="form-control rounded-0"
                                value={this.state.comment}
                                rows="4"
                            ></textarea>
                        </div>
                        <div className="row text-center">
                            <button
                                className="btn btn-primary mx-auto"
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
