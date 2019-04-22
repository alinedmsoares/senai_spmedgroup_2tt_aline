import React from 'react'

function Menu() {
    return (
        <div class="content">
            <div class="colors">
                <a class="default" href="javascript:void(0)"></a>
                <a class="blue" href="javascript:void(0)"></a>
                <a class="green" href="javascript:void(0)"></a>
                <a class="red" href="javascript:void(0)"></a>
                <a class="white" href="javascript:void(0)"></a>
                <a class="black" href="javascript:void(0)"></a>
            </div>
            <div id="jquery-accordion-menu" class="jquery-accordion-menu">
                <div class="jquery-accordion-menu-header">Header </div>
                <ul>
                    <li class="active"><a href="#"><i class="fa fa-home"></i>Home </a></li>
                    <li><a href="#"><i class="fa fa-glass"></i>Events </a></li>
                    <li><a href="#"><i class="fa fa-file-image-o"></i>Gallery </a><span class="jquery-accordion-menu-label">12 </span></li>
                    <li><a href="#"><i class="fa fa-cog"></i>Services </a>
                        <ul class="submenu">
                            <li><a href="#">
                                Web Design </a></li>
                            <li><a href="#">Hosting </a></li>
                            <li><a href="#">Design </a>
                                <ul class="submenu">
                                    <li><a href="#">Graphics </a></li>
                                    <li><a href="#">Vectors </a></li>
                                    <li><a href="#">Photoshop </a></li>
                                    <li><a href="#">Fonts </a></li>
                                </ul>
                            </li>
                            <li><a href="#">Consulting </a></li>
                        </ul>
                    </li>
                    <li><a href="#"><i class="fa fa-newspaper-o"></i>News </a></li>
                    <li><a href="#"><i class="fa fa-suitcase"></i>Portfolio </a>
                        <ul class="submenu">
                            <li><a href="#">Web Design </a></li>
                            <li><a href="#">Graphics </a><span class="jquery-accordion-menu-label">10 </span></li>
                            <li><a href="#">Photoshop </a></li>
                            <li><a href="#">Programming </a></li>
                        </ul>
                    </li>
                    <li><a href="#"><i class="fa fa-user"></i>About </a></li>
                    <li><a href="#"><i class="fa fa-envelope"></i>Contact </a></li>
                </ul>
                <div class="jquery-accordion-menu-footer">Footer </div>
            </div>
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        
        </div>
        
        
    );
}

export default Menu;