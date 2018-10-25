import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom'

class mainComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div style={{ padding: 10, flex: 1 }}>
                <div className="card">
                    <div className="card-header">
                        <button type="button" className="btn btn-primary">
                            Notifications <span className="badge badge-light">4</span>
                        </button>

                    </div>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                    <div className="card-body">
                        <h5 className="card-title">Special title treatment</h5>
                        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                        <Link to='/adduser/1257852'>Add user</Link>


                    </div>
                </div>
            </div>

        );
    }
}

export default mainComponent;