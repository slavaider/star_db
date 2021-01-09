import React, {Component} from 'react';

import './random-planet.css';
import SwapiService from "../../services/swapi";
import Spinner from "../spinner";

export default class RandomPlanet extends Component {
    swapi = new SwapiService()
    state = {
        planet: {},
        loading: true,
        error: '',
        interval: null
    }

    componentDidMount() {
        this.updatePlanet()
        this.setState({interval: setInterval(this.updatePlanet, 10000)})
    }

    componentWillUnmount() {
        const {interval} = this.state
        clearInterval(interval);
    }

    onError = (error) => {
        this.setState({error, loading: false})
    }
    updatePlanet = () => {
        const id = Math.floor(Math.random() * 16) + 3
        this.swapi.getData('planets', id).then(data => {
            this.setState({planet: data, loading: false})
        }).catch(this.onError);
    }

    render() {
        const {planet, error, loading} = this.state;
        const hasData = !(loading || !!error)
        const errorMessage = error ? error.toString() : null
        const spinner = loading ? <Spinner/> : null
        const content = hasData ? <PlanetView planet={planet}/> : null
        return (
            <div className="random-planet jumbotron rounded">
                {errorMessage}
                {spinner}
                {content}
            </div>
        );
    }
}

const PlanetView = ({planet}) => {
    const {
        id, name, population,
        rotation_period, diameter
    } = planet;

    return (
        <React.Fragment>
            <img alt='img' className="planet-image"
                 src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}/>
            <div>
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
        </React.Fragment>
    );
};
