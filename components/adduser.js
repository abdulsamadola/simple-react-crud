import React, { PureComponent } from 'react';
import { AsyncStorage } from 'AsyncStorage'
const USERS_DATA = 'users_data'
const uuid = require('uuidv4');
class addUserComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phoneNumber: '',
            email: '',
            userData: []
        }
        this.updateInput = this.updateInput.bind(this);
    }
    async deleteUsers() {
        try {
            await AsyncStorage.removeItem(USERS_DATA)
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
    async storeData(userDataStore) {

        const userStorage = this.state.userData
        userStorage.push(userDataStore)
        AsyncStorage.setItem(USERS_DATA, JSON.stringify(userStorage))
            .then(() => this.props.history.goBack()
            )
        this.setState({
            userData: userStorage,
        })
    }


    updateInput(event) {

        this.setState({
            [event.target.name]: event.target.value,
        });

    }
    _onClick = () => {
        this.props.history.goBack();
    }
    onSubmit = () => {
        const userDataStore = {
            id: uuid(),
            name: this.state.name,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email
        }
        this.storeData(userDataStore);
    }
    render() {
        return (
            <div style={{ padding: 10, flex: 1 }}>
                <h1><span class="badge badge-secondary">Simple React CRUD </span></h1>
                <div className="card">
                    <div className="card-header">
                        <button type="button" onClick={this._onClick.bind(this)} className="btn btn-danger">
                            Go back                        </button>

                    </div>

                    <div className="card-body">
                        <h5 className="card-title">Add new user</h5>
                        <form>
                            <div className="input-group mb-3">

                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroup-sizing-default">Name</span>
                                </div>
                                <input type="text" name="name" value={this.state.name} onChange={this.updateInput} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroup-sizing-default">Email</span>
                                </div>
                                <input type="email" name="email" value={this.state.email} onChange={this.updateInput} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroup-sizing-default">Phone Number</span>
                                </div>
                                <input type="tel" name="phoneNumber" value={this.state.phoneNumber} onChange={this.updateInput} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                            </div>
                            <button onClick={this.onSubmit} type="button" className="btn btn-success" >Submit</button>
                        </form>
                    </div>
                </div>

            </div>

        );
    }
}

export default addUserComponent;