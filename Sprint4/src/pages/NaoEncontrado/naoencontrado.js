import React, {Component} from 'react'
import '../../assets/css/naoencontrado.css'


class NaoEncontrado extends Component{
    render(){
        return(
            <div className="body">
                <p className="naoencontrado-h1"><i class="fas fa-exclamation-triangle"></i> Ops... </p>
                <h1 className="naoencontrado-h1">A página que você está procurando não foi encontrada!</h1>
            </div>
        );
    }
}

export default NaoEncontrado;