import React, {Component} from 'react';

import './random-planet.css';
import SwapiService from "../../services/swapi";

export default class RandomPlanet extends Component {
    swapi = new SwapiService()
    state = {
        planet: {}
    }

    componentDidMount() {
        this.updatePlanet()
        setInterval(this.updatePlanet, 10000)
    }


    updatePlanet = () => {
        const id = Math.floor(Math.random() * 15) + 5
        this.swapi.getData('planets', id).then(data => {
            this.setState({planet: data})
        })
    }

    render() {
        const {planet: {id, name, population, rotation_period, diameter}} = this.state
        return (
            <div className="random-planet jumbotron rounded">
                <img className="planet-image"
                     alt='img'
                     src={id ? `https://starwars-visualguide.com/assets/img/planets/${id}.jpg` : null}/>
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
            </div>

        );
    }
}
