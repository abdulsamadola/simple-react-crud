import React, { PureComponent } from 'react';

class mainComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        }
        this.updateInput = this.updateInput.bind(this);
    }
    updateInput(value) {
        this.setState({
            name: value
        });

    }
    _onClick = () => {
        this.props.history.goBack();
    }
    render() {
        return (
            <div style={{ padding: 10, flex: 1 }}>
                <div className="card">
                    <div className="card-header">
                        <button type="button" onClick={this._onClick.bind(this)} className="btn btn-danger">
                            Go back                        </button>

                    </div>

                    <div className="card-body">
                        <h5 className="card-title">Add new user</h5>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroup-sizing-default">Name</span>
                            </div>
                            <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroup-sizing-default">Email</span>
                            </div>
                            <input type="text" onChange={this.updateInput} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroup-sizing-default">Phone Number</span>
                            </div>
                            <input type="text" onChange={this.updateInput} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                        </div>
                        <button type="button" className="btn btn-success" >Submit</button>
                        <div> {this.state.name} </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default mainComponent;