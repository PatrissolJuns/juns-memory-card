import React, {Component} from 'react';
import './Header.css';

class Header extends Component {

    render() {
        return (
            <div className={'Header'}>
                <h1>Memory Card game</h1>
                <h4>By <a href="https://github.com/PatrissolJuns">Patrissol Juns</a></h4>
            </div>
        );
    }
}

export default Header;