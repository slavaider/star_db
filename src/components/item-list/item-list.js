import React, {Component} from 'react';

import './item-list.css';
import SwapiService from "../../services/swapi";
import {withRouter} from "react-router-dom";
import Spinner from "../spinner";

class ItemList extends Component {
    swapi = new SwapiService()
    state = {
        items: [],
        loading: true,
        index: 0,
        step: 10,
        max: null
    }
    updateItems = () => {
        this.setState({loading: true});
        this.swapi.getAllData(this.props.match.path.match(/\/([a-z]*)\//)[1]).then(data => {
            this.setState({index: 0, items: data, loading: false, max: Math.ceil(data.length / this.state.step)});
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.path !== prevProps.match.path) {
            this.updateItems()
        }
    }

    componentDidMount() {
        this.updateItems()
    }

    Choose = (id) => {
        this.props.history.push(`/star_db/${this.props.match.path.match(/\/([a-z]*)\//)[1]}/${id}`)
    }
    changePage = (event) => {
        this.setState({
            index: event.target.value - 1,
        })
    }
    Prev = () => {
        if (this.state.index !== 0) {
            this.setState((prev_state) => {
                return {
                    index: prev_state.index - 1,
                }
            })
        }
    }
    Next = () => {
        if (this.state.index !== this.state.max - 1) {
            this.setState((prev_state) => {
                return {
                    index: prev_state.index + 1,
                }
            })
        }
    }

    Pagination() {
        let i = 0
        const pages = []
        while (i < this.state.max) {
            i++
            pages.push((
                <li key={i} className={['page-item', this.state.index === i - 1 ? 'active' : null].join(' ')}>
                    <button className='page-link'
                            value={i}
                            onClick={(event) => this.changePage(event)}>{i}</button>
                </li>
            ))
        }
        return [...pages]
    }

    render() {
        return (
            <div className="col-md-6">
                <ul className="item-list list-group">
                    {!this.state.loading ?
                        <React.Fragment>
                            {this.state.items
                                .slice(this.state.index * this.state.step, (this.state.index + 1) * this.state.step)
                                .map((obj) => {
                                    return (
                                        <li key={obj.id}
                                            onClick={() => this.Choose(obj.id)}
                                            className="list-group-item">
                                            [ID:{obj.id}] {obj.name}
                                        </li>)
                                })
                            }
                            <ul className="pagination pagination-md mt-2 mb-2 justify-content-center">
                                <li className="page-item">
                                    <button onClick={() => this.Prev()} className="page-link">&lt;</button>
                                </li>
                                {this.Pagination()}
                                <li className="page-item">
                                    <button onClick={() => this.Next()} className="page-link">&gt;</button>
                                </li>
                            </ul>
                        </React.Fragment> : <Spinner/>}
                </ul>
            </div>
        );
    }
}

export default withRouter(ItemList)
