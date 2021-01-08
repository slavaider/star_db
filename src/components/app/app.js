import React from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ItemList from '../item-list';

import './app.css';
import {Redirect, Route, Switch} from "react-router-dom";
import StarShipDetails from "../starship-details/starship-details";
import PersonDetails from "../person-details";
import PlanetDetails from "../planet-details/planet-details";


class App extends React.Component {
    state = {
        flag: false,
        id: 2
    }

    render() {
        return (
            <div className='container-fluid'>
                <Header/>
                <RandomPlanet/>
                <div className="row mb2">
                    <Switch>
                        <Route path={["/starships/:id", "/people/:id", "/planets/:id"]} component={ItemList}/>
                        <Redirect from={'*'} to={`/people/1`}/>
                    </Switch>
                    <Switch>
                        <Route path='/starships/:id' component={StarShipDetails}/>
                        <Route path='/people/:id' component={PersonDetails}/>
                        <Route path='/planets/:id' component={PlanetDetails}/>
                    </Switch>
                </div>
            </div>
        );
    }

}

export default App;
