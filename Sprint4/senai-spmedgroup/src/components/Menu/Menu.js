import React from 'react'
import logoMenu from "../../assets/img/icon.png"
import "../../assets/css/menu.css"

function Menu() {
    
    return (
        <div>
            <div className="nav-side-menu">
                <div className="menu--logo">
            <img src={logoMenu} className="menu--logo__img"/>
                </div>
                <i className="fa fa-bars fa-2x toggle-btn" data-toggle="collapse" data-target="#menu-content"></i>

                <div className="menu-list">

                    <ul id="menu-content" className="menu-content collapse out">

                        <li data-toggle="collapse" data-target="#products" className="collapsed active">
                            <a href="#"><i className="fas fa-user"></i> Usuários <span className="arrow"></span></a>
                        </li>
                        <ul className="sub-menu collapse" id="products">
                            <li><a href="#">Cadastrar</a></li>
                            <li><a href="localhost:3000/usuarios/cadastrarusuarios">Listar</a></li>
                        </ul>


                        <li data-toggle="collapse" data-target="#service" className="collapsed">
                            <a href="#"><i className="fas fa-stethoscope"></i> Consultas <span className="arrow"></span></a>
                        </li>
                        <ul className="sub-menu collapse" id="service">
                            <li><a href="#">Cadastrar</a></li>
                            <li><a href="#">Listar</a></li>
                        </ul>


                        <li data-toggle="collapse" data-target="#new" className="collapsed">
                            <a href="#"><i className="fas fa-file-medical-alt"></i> Prontuários <span className="arrow"></span></a>
                        </li>
                        <ul className="sub-menu collapse" id="new">
                        <li><a href="#">Cadastrar</a></li>
                    <li><a href="#">Listar</a></li>
                        </ul>


                        <li>
                            <a href="#">
                            <i className="fas fa-user-md"></i> Médicos
                  </a>
                        </li>

                        <li>
                            <a href="#">
                            <i className="fas fa-hospital"></i> Clínica
                  </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>


    );
}

export default Menu;