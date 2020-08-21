import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import CodeMirror from '@uiw/react-codemirror';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/darcula.css';
import './CupiTip.css';
import refreshIcon from './refresh.svg';
import LevelTipList from "./levelTipList/levelTipList.js";
import { Container, Row, Col } from 'reactstrap';
import logo from './LPT-12.png';



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
            current_correcto: editor.getValue().replace('\t','    '),
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

    verificacionCicloInfinito(codigo){
        var ciclo = false;
        if (codigo.includes("while ")){
            ciclo = true;
            var condicion = codigo.split('while ')[1].split(':')[0];
            if(condicion === "False" || condicion === " False" || condicion === "False " || condicion === " False "|| condicion === "0" || condicion === " 0" || condicion === "0 " || condicion === " 0 " ){
                ciclo = false;
            }
            else if (condicion !== "True" && condicion !== " True" && condicion !== "True " && condicion !== " True " && condicion !== "!False" && condicion !== " !False" && condicion !== "!False " && condicion !== " !False "  && condicion !== "1" && condicion !== " 1" && condicion !== "1 "&& condicion !== " 1 "){
            //console.log(condicion);
                var partes = undefined;
                if (condicion.includes('and') ){
                    var p1 = condicion.split('and')[0];
                    var p2 = condicion.split('and')[1];
                    var parts1;
                    var parts2;
                    if (p1.includes('!') && !p1.includes('=')&& !p1.includes('>')&& !p1.includes('<')){
                        parts1 = p1.split('!')[1];
                    }
                    else if (!p1.includes('!') && !p1.includes('=')&& !p1.includes('>')&& !p1.includes('<')){
                        var a = [];
                        a[0] = p1;
                        parts1 = a;
                    }
                    else{
                        if (p1.includes('=')){
                            if (p1.includes('>')){
                                parts1 = p1.split('>=');
                            }
                            else if (p1.includes('<')){
                                parts1 = p1.split('<=');
                            }
                            else if (p1.includes('!')){
                                parts1 = p1.split('!=');
                            }
                            else if (p1.includes('==')){
                                parts1 = p1.split('==');
                            }
                        }
                        else{
                            if (p1.includes('>')){
                                parts1 = p1.split('>');
                            }
                            else if (p1.includes('<')){
                                parts1 = p1.split('<');
                            }
                        }
                    }
                    if (p2.includes('!') && !p2.includes('=')&& !p2.includes('>')&& !p2.includes('<')){
                        parts2 = p2.split('!')[1];
                    }
                    else if (!p2.includes('!') && !p2.includes('=')&& !p2.includes('>')&& !p2.includes('<')){
                        var b = [];
                        b[0] = p2;
                        parts2 = b;
                    }
                    else{
                        if (p2.includes('=')){
                            if (p2.includes('>')){
                                parts2 = p2.split('>=');
                            }
                            else if (p2.includes('<')){
                                parts2 = p2.split('<=');
                            }
                            else if (p2.includes('!')){
                                parts2 = p2.split('!=');
                            }
                            else if (p1.includes('==')){
                                parts2 = p2.split('==');
                            }
                        }
                        else{
                            if (p2.includes('>')){
                                parts2 = p2.split('>');
                            }
                            else if (p2.includes('<')){
                                parts2 = p2.split('<');
                            }
                        }
                    }
                    partes = parts1.concat(parts2);
                }
                else if ( condicion.includes('or')){
                    var d1 = condicion.split('or')[0];
                    var d2 = condicion.split('or')[1];
                    var partes1;
                    var partes2;
                    if (d1.includes('!') && !d1.includes('=')&& !d1.includes('>')&& !d1.includes('<')){
                        partes1 = d1.split('!')[1];
                    }
                    else if (!d1.includes('!') && !d1.includes('=')&& !d1.includes('>')&& !d1.includes('<')){
                        var c = [];
                        c[0] = p1;
                        partes1 = c;
                    }
                    else{
                        if (d1.includes('=')){
                            if (d1.includes('>')){
                                partes1 = d1.split('>=');
                            }
                            else if (d1.includes('<')){
                                partes1 = d1.split('<=');
                            }
                            else if (d1.includes('!')){
                                partes1 = d1.split('!=');
                            }
                            else if (d1.includes('==')){
                                partes1 = d1.split('==');
                            }
                        }
                        else{
                            if (d1.includes('>')){
                                partes1 = d1.split('>');
                            }
                            else if (d1.includes('<')){
                                partes1 = d1.split('<');
                            }
                        }
                    }
                    if (d2.includes('!') && !d2.includes('=')&& !d2.includes('>')&& !d2.includes('<')){
                        partes2 = p2.split('!')[1];
                    }
                    else if (!d2.includes('!') && !d2.includes('=')&& !d2.includes('>')&& !d2.includes('<')){
                        var d = [];
                        d[0] = p2;
                        partes2 = d;
                    }
                    else{
                        if (d2.includes('=')){
                            if (d2.includes('>')){
                                partes2 = d2.split('>=');
                            }
                            else if (d2.includes('<')){
                                partes2 = d2.split('<=');
                            }
                            else if (d2.includes('!')){
                                partes2 = d2.split('!=');
                            }
                            else if (d2.includes('==')){
                                partes2 = d2.split('==');
                            }
                        }
                        else{
                            if (d2.includes('>')){
                                partes2 = d2.split('>');
                            }
                            else if (d2.includes('<')){
                                partes2 = d2.split('<');
                            }
                        }
                    }
                    partes = partes1.concat(partes2);
                }
                else{
                    //console.log(partes);
                    if (condicion.includes('!') && !condicion.includes('=')&& !condicion.includes('>')&& !condicion.includes('<')){
                        partes = p1.split('!')[1];
                    }
                    else if (!condicion.includes('!') && !condicion.includes('=')&& !condicion.includes('>')&& !condicion.includes('<')){
                        var z = [];
                        z[0] = condicion;
                        partes = z;
                    }
                    else if (condicion.includes('=')){
                        if (condicion.includes('>')){
                            partes = condicion.split('>=');
                        }
                        else if (condicion.includes('<')){
                            partes = condicion.split('<=');
                        }
                        else if (condicion.includes('!')){
                            partes = condicion.split('!=');
                        }
                        else if (condicion.includes('==')){
                            partes = condicion.split('==');
                        }
                    }
                    else{
                        if (condicion.includes('>')){
                            partes = condicion.split('>');
                        }
                        else if (condicion.includes('<')){
                            partes = condicion.split('<');
                        }
                    }
                }
            
                console.log(partes); 
                var selec = undefined;
                for (let p = 0;  p< partes.length; p++) {
                    var v1 = partes[p].replace(" ","") +" =";
                    var v2 = partes[p].replace(" ","") +"=";
                    if (codigo.includes(v1) ||  codigo.includes(v2)){
                        selec = partes[p].replace(" ","");
                    //console.log(partes[p].replace(" ",""));
                    }
                    var ins = codigo.split('return')[0].split('    ');
                    //console.log(ins);
                    for (let l = 0;  l< ins.length; l++) { 
                
                        if (l !== 0 ) {
                            var line1 = selec + "+=";
                            var line2 = selec + " +=";
                            var line3 = selec + "=" + selec + "+";
                            var line4 = selec + " = " + selec + " +";
                            var line5 = selec + " = True";
                            var line6 = selec + " =True";
                            var line7 = selec + "= True";
                            var line8 = selec + "=True";
                            var line9 = selec + " = False";
                            var line10 = selec + " =False";
                            var line11 = selec + "= False";
                            var line12 = selec + "=False";
                            //console.log(ins[l]);
                            if (ins[l].includes(line1) || ins[l].includes(line2) || ins[l].includes(line3) || ins[l].includes(line4) || ins[l].includes(line5) || ins[l].includes(line6) || ins[l].includes(line7) || ins[l].includes(line8) || ins[l].includes(line9) || ins[l].includes(line10) || ins[l].includes(line11) || ins[l].includes(line12) ){
                                ciclo = false;
                            }
                        }
                    }
                }
            
            }
            
        }
        return ciclo;
    }

    timeout(ms,promise){
        let timeout = new Promise((resolve, reject) => {
            let id = setTimeout(() => {
                clearTimeout(id);
                //throw new Error('Timed out in '+ ms + 'ms.');
                reject('Timed out in '+ ms + 'ms.');
            }, ms);
        });
        console.log('race');
        // Returns a race between our timeout and the passed in promise
        return Promise.race([
            promise,
            timeout
        ]);
    }

    handleCompileBien = () => {   
        // var dbPromise = window.indexedDB.open('TEST', 1);
        // dbPromise.onsuccess=() => {
        //     const db = dbPromise.result;
        //     const transaction = db.transaction(
        //         [ "WINDOWOBJECTS" ],
        //         "readwrite"
        //     );
        //     const objStore = transaction.objectStore("WINDOWOBJECTS");

        //     const getRequest = objStore.get(1);
        //     getRequest.onsuccess = () => {
        //         // Do something with the data
        //         console.log(getRequest.result.object);
        //     };
        // };
        
        // var d= `
        // var onmessage = function(e) { // eslint-disable-line no-unused-vars
        //             self.pyodide.runPythonAsync(data.python, () => {})
        //                 .then((results) => { self.postMessage({results}); })
        //                 .catch((err) => {
        //                 // if you prefer messages with the error
        //                 self.postMessage({error : err.message});
        //             });

        // }
        // `;
        // var blob = new Blob([d], { type: 'text/javascript' });
        // var w = new Worker(window.URL.createObjectURL(blob));
        
        // w.onerror = (e) => {
        //     console.log(`Error in pyodideWorker at ${e.filename}, Line: ${e.lineno}, ${e.message}`);
        // };
        // w.onmessage = (e) => {
        //     const {results, error} = e.data;
        //     if (results) {
        //         console.log('pyodideWorker return results: ', results);
        //     } else if (error) {
        //         console.log('pyodideWorker error: ', error);
        //     }
        // };
        // const py = window.pyodide;
        // var data = {python: this.state.current_correcto};
        // w.postMessage(data);


        var cic = this.verificacionCicloInfinito(this.state.current_correcto.replace("\t","    "));
        //console.log(cic);
        if (!cic) {
            try {   

                window.pyodide
                    .runPythonAsync(this.state.current_correcto.replace("\t","    "))
                    .then((output) => {
                        
                        var resp = output;
                        this.setState({
                            resultadoCorrectoC: { correct: true, msg: 'El Resultado es: \n' + resp,},
                            resultadoCorrectoI: undefined,
                            
                        });
                    })
                    .catch((error)=>{
                        
                        var e1 = error.toString();
                        console.log(e1);
                        if (e1.includes("Timed out")){
                            console.log("TIMEOUT");
                            this.setState({
                                resultadoCorrectoI: { correct: false, msg: 'TIMEOUT',},
                                resultadoCorrectoC: undefined,
                                    
                            });
                        }
                        else {
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
                        }
                        
                    });
            } catch (error) {
                console.log(error);
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
        }
        else {
            this.setState({
                resultadoCorrectoI: { correct: false, msg: 'Error: Se encontro un ciclo infinito en el codigo' },
                resultadoCorrectoC: undefined,
            });
        }
        

        
    };

    handleCompileMal = () => {
        var cic = this.verificacionCicloInfinito(this.state.current_incorrecto);
        if(!cic){
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
        }
        else{
            this.setState({
                resultadoIncorrectoI: { correct: false, msg: 'Error: Se encontro un ciclo infinito en el codigo' },
                resultadoIncorrectoC: undefined,
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
                            <img src={logo} alt='Logo' className="rounded mx-auto d-block" width='25%' ></img>
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
                                                style={{ backgroundColor: 'rgb(70, 157, 204)' , borderColor:'rgb(70, 157, 204)'}}
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
                                                style={{ backgroundColor: 'rgb(70, 157, 204)', borderColor:'rgb(70, 157, 204)' }}
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
                                                style={{ backgroundColor: 'rgb(70, 157, 204)' , borderColor:'rgb(70, 157, 204)' }}
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
                                                style={{ backgroundColor: 'rgb(70, 157, 204)', borderColor:'rgb(70, 157, 204)'}}
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
