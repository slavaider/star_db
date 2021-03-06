import React, {Component} from 'react';

import './person-details.css';

import Spinner from "../spinner";
import {withSwapi} from "../../hoc/with-swapi";

class PersonDetails extends Component {
    swapi =  this.props.swapi
    state = {
        person: {},
        loading: true,
    }

    updatePerson() {
        this.setState({loading: true})
        this.swapi.getData('people', this.props.match.params.id).then((data) => {
            this.setState({person: data, loading: false})
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.updatePerson()
        }
    }

    componentDidMount() {
        this.updatePerson()
    }

    render() {
        const {
            person: {
                name,
                gender,
                birth_year,
                eye_color
            }
        } = this.state;
        return (
                <div className="person-details card">
                    {!this.state.loading ?
                        <React.Fragment>
                            <img className="person-image"
                                 src={`https://starwars-visualguide.com/assets/img/characters/${this.props.match.params.id}.jpg`}
                                 onError={(event) => event.target.style.display = "none"}
                                 alt='Person: 404 not found'/>
                            <div className="card-body">
                                <h4>{name}</h4>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">
                                        <span className="term">Gender</span>
                                        <span>{gender}</span>
                                    </li>
                                    <li className="list-group-item">
                                        <span className="term">Birth Year</span>
                                        <span>{birth_year}</span>
                                    </li>
                                    <li className="list-group-item">
                                        <span className="term">Eye Color</span>
                                        <span>{eye_color}</span>
                                    </li>
                                </ul>
                            </div>
                        </React.Fragment> : <Spinner/>}
                </div>
        )
    }
}
export default withSwapi(PersonDetails)
