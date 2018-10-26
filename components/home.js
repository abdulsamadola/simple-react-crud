import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom'
import { AsyncStorage } from 'AsyncStorage'
const USERS_DATA = 'users_data'
//var Confirm = require('react-confirm-bootstrap');
const Confirm = require('react-confirm-bootstrap');
class mainComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            userData: [],
            isLoading: true,
            searchword: ''
        }
        this._onClick = this._onClick.bind(this);
    }


    deleteUsers = () => {
        this.deleteUsersHandler()
    }
    deleteUsersHandler() {
        const useDataRaw = [
        ]
        AsyncStorage.setItem(USERS_DATA, JSON.stringify(useDataRaw));
        this.setState({
            userData: useDataRaw
        })
    }
    deleteUser = (userid) => {
        const findI = this.state.userData.findIndex((id) => {
            return id.id === userid
        })

        const useDataRaw = [
            ...this.state.userData.slice(0, findI),
            ...this.state.userData.slice(findI + 1)
        ]
        AsyncStorage.setItem(USERS_DATA, JSON.stringify(useDataRaw));
        this.setState({
            userData: useDataRaw
        })
    }
    editUser = (userid) => {
        this.props.history.push(`/edit/${userid}`);
    }
    async componentDidMount() {
        try {
            const dataRequest = await AsyncStorage.getItem(USERS_DATA)
            if (dataRequest) {
                this.setState({
                    userData: JSON.parse(dataRequest),
                    isLoading: false

                })
            }
        } catch (error) {
            alert('something wrong' + error)
        }
    }
    handleSearch(event) {
        this.setState({
            searchword: event.target.value
        })
        let ideas = this.state.userData.filter((idea) => {

            // return idea.toLowerCase().search(
            //   event.target.value.toLowerCase()) !== -1;
            //   event.target.value.toLowerCase()) !== -1;

            //  return idea.name.includes(event.target.value.toLowerCase()) || idea.email.includes(event.target.value.toLowerCase()) || idea.phoneNumber.includes(event.target.value.toLowerCase())
            return idea.name === this.state.searchword;

        });

        this.setState({
            userData: ideas
        })

    }

    _onClick() {
        this.props.history.push(`/adduser`);
    }

    render() {

        return (

            <div style={{ padding: 10, flex: 1 }}>
                <h1><span class="badge badge-secondary">Simple React CRUD </span></h1>

                <div className="card" >
                    <div className="card-header">
                        <form class="form-inline my-10 my-lg-0">
                            <input className="form-control mr-sm-2" type="search" onKeyUp={this.handleSearch.bind(this)} placeholder="Search" aria-label="Search" />
                        </form>
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
                    {this.state.isLoading && <div className="progress">
                        <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{ width: '100%' }}></div>
                    </div>}
                    <div class="rptable table-responsive">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone Number</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>

                            <tbody>


                                {this.state.userData.map((user) => (
                                    <tr>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phoneNumber}</td>
                                        <td>
                                            <button type="button" className="btn btn-primary m-2" onClick={() => this.editUser(user.id)}>Edit</button>
                                            <button type="button" className="btn btn-danger" onClick={() => this.deleteUser(user.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>

        );
    }
}

export default mainComponent;