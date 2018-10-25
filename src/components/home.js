import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom'

class mainComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {}
        this._onClick = this._onClick.bind(this);
    }
    _onClick() {
        this.props.history.push(`/adduser`);
    }
    render() {
        return (
            <div style={{ padding: 10, flex: 1 }}>
                <div className="card">
                    <div className="card-header">


                        <button type="button" className="btn btn-success m-2" onClick={this._onClick}>
                            Add new user
                        </button>
                        <button type="button" className="btn btn-primary">
                            Total <span className="badge badge-light">1</span>
                        </button>
                    </div>
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone Number</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Suleiman Abdulsamad Ola</td>
                                <td>suleimanolamilekan03@gmail.com</td>
                                <td>08142287687</td>
                                <td> <button type="button" className="btn btn-primary m-2">Edit</button>
                                    <button type="button" className="btn btn-danger">Delete</button></td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>

        );
    }
}

export default mainComponent;