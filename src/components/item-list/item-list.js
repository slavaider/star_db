import React, {Component} from 'react';

import './item-list.css';
import SwapiService from "../../services/swapi";

export default class ItemList extends Component {
    swapi = new SwapiService()
    state = {
        items: []
    }

    componentDidMount() {
        this.swapi.getAllData('people').then(data => {
            this.setState({items: data});
        })
    }

    render() {
        return (
            <ul className="item-list list-group ml-2">
                {this.state.items.map((obj)=>{
                    return (
                        <li key={obj.id} className="list-group-item">
                            {obj.name}
                        </li>
                    )
                })}
            </ul>
        );
    }
}
