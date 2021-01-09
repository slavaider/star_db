import React from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ItemList from '../item-list';

import './app.css';
import {Redirect, Route, Switch} from "react-router-dom";
import StarShipDetails from "../starship-details/starship-details";
import PersonDetails from "../person-details";
import PlanetDetails from "../planet-details/planet-details";

const repo_name = 'star_db'

function App() {
    return (
        <div className='container-fluid'>
            <Header/>
            <RandomPlanet/>
            <div className="row mb2">
                <Switch>
                    <Route
                        path={[`/${repo_name}/starships/:id`, `/${repo_name}/people/:id`, `/${repo_name}/planets/:id`]}
                        component={ItemList}/>
                    <Redirect from={'*'} to={`/${repo_name}/people/1`}/>
                </Switch>
                <div className="col-md-6">
                    <Switch>
                        <Route path={`/${repo_name}/starships/:id`} component={StarShipDetails}/>
                        <Route path={`/${repo_name}/people/:id`} component={PersonDetails}/>
                        <Route path={`/${repo_name}/planets/:id`} component={PlanetDetails}/>
                    </Switch>
                </div>
            </div>
        </div>
    );
}

export default App;
