import React, {Component} from 'react';

import './starship-details.css';

import Spinner from "../spinner";
import {withSwapi} from "../../hoc/with-swapi";

class StarShipDetails extends Component {
    swapi =this.props.swapi
    state = {
        starship: {},
        loading: true,
    }

    updateShip() {
        this.setState({loading: true})
        this.swapi.getData('starships', this.props.match.params.id).then((data) => {
            this.setState({starship: data, loading: false})
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.updateShip()
        }
    }

    componentDidMount() {
        this.updateShip()
    }


    render() {
        const {
            starship: {
                name,
                model,
                manufacturer,
                cost_in_credits,
                length,
                crew,
                passengers,
                cargo_capacity
            }
        } = this.state;
        return (
            <div className="starship-details card">
                {!this.state.loading ?
                    <React.Fragment>
                        <img className="starship-image"
                             src={`https://starwars-visualguide.com/assets/img/starships/${this.props.match.params.id}.jpg`}
                             onError={(event) => event.target.style.display = "none"}
                             alt='Starship: 404 not found'/>
                        <div className="card-body">
                            <h4>{name}</h4>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <span className="term">Model</span>
                                    <span>{model}</span>
                                </li>
                                <li className="list-group-item">
                                    <span className="term">Manufacturer</span>
                                    <span>{manufacturer}</span>
                                </li>
                                <li className="list-group-item">
                                    <span className="term">Cost in Credits</span>
                                    <span>{cost_in_credits}</span>
                                </li>
                                <li className="list-group-item">
                                    <span className="term">Length</span>
                                    <span>{length}</span>
                                </li>
                                <li className="list-group-item">
                                    <span className="term">Crew</span>
                                    <span>{crew}</span>
                                </li>
                                <li className="list-group-item">
                                    <span className="term">Passengers</span>
                                    <span>{passengers}</span>
                                </li>
                                <li className="list-group-item">
                                    <span className="term">Cargo Capacity</span>
                                    <span>{cargo_capacity}</span>
                                </li>
                            </ul>
                        </div>
                    </React.Fragment> : <Spinner/>}
            </div>
        )
    }
}

export default withSwapi(StarShipDetails)
