import React from 'react'
import logoMenu from "../../assets/img/icon.png"
import {Link} from 'react-router-dom'
import "../../assets/css/menu.css"

function Menu() {

    return (
        <div>
            <div className="nav-side-menu">
                <div className="menu--logo">
                    <img src={logoMenu} className="menu--logo__img" />
                </div>
                <i className="fa fa-bars fa-2x toggle-btn" data-toggle="collapse" data-target="#menu-content"></i>

                <div className="menu-list">

                    <ul id="menu-content" className="menu-content collapse out">



                        <li data-toggle="collapse" data-target="#service" className="collapsed">
                            <a href="#"><i className="fas fa-stethoscope"></i> Consultas <span className="arrow"></span></a>
                        </li>
                        <ul className="sub-menu collapse" id="service">
                            <li><Link to ="/consulta/cadastrar">Cadastrar</Link></li>
                            <li><Link to ="/consulta/listar">Listar</Link></li>
                        </ul>

                        <li data-toggle="collapse" data-target="#products" className="collapsed">
                            <Link to ="/usuarios/listar"><i className="fas fa-user"></i> Usuários </Link>
                        </li>

                        <li data-toggle="collapse" data-target="#products" className="collapsed">
                            <Link to ="/localizacoes"><i className="fas fa-map-marked-alt"></i>  Localizações </Link>
                        </li>


                        <li data-toggle="collapse" data-target="#new" className="collapsed">
                            <Link to ="/prontuario/listar"><i className="fas fa-file-medical-alt"></i> Prontuários</Link>
                        </li>


                        <li>
                            <Link to ="/medicos/listar">
                                <i className="fas fa-user-md"></i> Médicos
                  </Link>
                        </li>

                        <li>
                            <Link to ="/clinica/listar">
                            <i className="fas fa-hospital"></i> Clínica
                  </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>


    );
}

export default Menu;