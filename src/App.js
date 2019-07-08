import React, { Component } from 'react';
import Routes from './Routes'
import Footer from "./components/home/Footer";

class App extends Component {
    render() {
        return (
            <div>

                    <Routes />
                <Footer/>
            </div>
        )
    }
}

export default App;