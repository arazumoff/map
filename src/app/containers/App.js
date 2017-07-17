import React from 'react';
import Panel from "../components/Panel";
import Mapper from "../components/Mapper";


class App extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="App">
                            <div className="App-header">
                                <h2>React Mapper</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <Panel/>
                    <Mapper/>
                </div>
            </div>
    );
  }
}

export default App;
