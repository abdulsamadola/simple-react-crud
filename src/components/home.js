import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom'
import { AsyncStorage } from 'AsyncStorage'
const USERS_DATA = 'users_data'
class mainComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            userData: []
        }
        this._onClick = this._onClick.bind(this);
    }
    async deleteUsers() {
        try {
            await AsyncStorage.multiRemove(USERS_DATA)
            alert(' was successful!');
        } catch (error) {
            alert('something went  wrong' + error);
        }
    }

    async componentDidMount() {
        try {
            const dataRequest = await AsyncStorage.getItem(USERS_DATA)
            if (dataRequest) {
                this.setState({
                    userData: JSON.parse(dataRequest)
                })
            }
        } catch (error) {
            alert('something wrong')
        }
    }
    _onClick() {
        this.props.history.push(`/adduser`);
    }
    render() {
        return (
            <div style={{ padding: 10, flex: 1 }}>
                <div className="card" style={{ flex: 1 }}>
                    <div className="card-header">


                        <button type="button" className="btn btn-success m-2" onClick={this._onClick}>
                            Add new user
                        </button>
                        <button type="button" className="btn btn-danger m-2" onClick={() => { this.deleteUsers() }}>
                            Delete all users
                        </button>
                        <button type="button" className="btn btn-primary">
                            Total <span className="badge badge-light">{this.state.userData.length}</span>
                        </button>
                    </div>
                    <table class="table table-striped" style={{ flex: 1 }}>
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
                            {this.state.userData.map((user) => (
                                <tr>
                                    <th scope="row">{user.id}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phoneNumber}</td>
                                    <td>
                                        <button type="button" className="btn btn-primary m-2">Edit</button>
                                        <button type="button" className="btn btn-danger">Delete</button>
                                    </td>
                                </tr>

                            ))}


                        </tbody>

                    </table>
                </div>
            </div>

        );
    }
}

export default mainComponent;