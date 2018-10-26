import React, { PureComponent } from 'react';
import { AsyncStorage } from 'AsyncStorage'
const USERS_DATA = 'users_data'
class addUserComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            index: '',
            name: '',
            phoneNumber: '',
            email: '',
            userData: []
        }
        this.updateInput = this.updateInput.bind(this);
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
            alert('something wrong' + error)
        }
        const idi = this.props.match.params.id;
        const findI = this.state.userData.findIndex(item => {
            return item.id === idi
        })
        const chosenUser = this.state.userData[findI]
        this.setState({
            index: findI,
            name: chosenUser.name,
            phoneNumber: chosenUser.phoneNumber,
            email: chosenUser.email
        })

    }
    userUpdate = () => {

        const userDataStore = {
            id: this.state.id,
            name: this.state.name,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email
        }
        const findII = this.state.index
        const useDataRaw = [
            ...this.state.userData.slice(0, findII),
            userDataStore,
            ...this.state.userData.slice(findII + 1)
        ]

        AsyncStorage.setItem(USERS_DATA, JSON.stringify(useDataRaw));
        this.setState({
            userData: useDataRaw
        })

        alert('User successfully updated!')
        this.props.history.goBack();
    }

    updateInput(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });

    }
    _onClick = () => {
        this.props.history.goBack();
    }

    render() {
        return (
            <div style={{ padding: 10, flex: 1 }}>
                <h1><span class="badge badge-secondary">Simple React CRUD </span></h1>

                <div className="card">
                    <div className="card-header">
                        <button type="button" onClick={this._onClick.bind(this)} className="btn btn-danger">
                            Go back
                                    </button>

                    </div>

                    <div className="card-body">
                        <h5 className="card-title">Update user</h5>
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
                            <button onClick={this.userUpdate} type="button" className="btn btn-success" >Update</button>
                        </form>
                    </div>
                </div>

            </div>

        );
    }
}

export default addUserComponent;