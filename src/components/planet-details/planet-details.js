import React, {Component} from 'react';

import './planet-details.css';
import SwapiService from "../../services/swapi";
import Spinner from "../spinner";

export default class PlanetDetails extends Component {
    swapi = new SwapiService()

    state = {
        planet: {},
        loading: true,
    }

    updatePlanet() {
        this.setState({loading: true})
        this.swapi.getData('planets', this.props.match.params.id).then((data) => {
            this.setState({planet: data, loading: false})
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.updatePlanet()
        }
    }

    componentDidMount() {
        this.updatePlanet()
    }


    render() {
        const {
            planet: {
                name,
                population,
                rotation_period,
                diameter,
            }
        } = this.state;
        return (
            <div className="col-md-6">
                <div className="planet-details card">
                    {!this.state.loading ?
                        <React.Fragment>
                            <img className="planet-image"
                                 src={`https://starwars-visualguide.com/assets/img/planets/${this.props.match.params.id}.jpg`}
                                 onError={(event) => event.target.style.display = "none"}
                                 alt='Planet: 404 not found'/>
                            <div className="card-body">
                                <h4>{name}</h4>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">
                                        <span className="term">Population</span>
                                        <span>{population}</span>
                                    </li>
                                    <li className="list-group-item">
                                        <span className="term">Rotation Period</span>
                                        <span>{rotation_period}</span>
                                    </li>
                                    <li className="list-group-item">
                                        <span className="term">Diameter</span>
                                        <span>{diameter}</span>
                                    </li>
                                </ul>
                            </div>
                        </React.Fragment> : <Spinner/>}
                </div>
            </div>
        )
    }
}
