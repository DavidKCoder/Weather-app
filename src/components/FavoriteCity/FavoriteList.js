import React, { useState, Component } from 'react'

import CityList from './CityList'


class FavoriteList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cities: [{ text: 'Yerevan', id: '1' }],
            value: "",
        };
    }

    handleChange = (e) => {
        this.setState({
            value: e.target.value
        })
    }
    debugger;
    handleSubmit = (e) => {
        e.preventDefault();
        if (!this.state.value.length) {
            return;
        }
        this.setState({
            value: "none"
        })

        const newItem = {
            text: this.state.value,
            id: Date.now()
        };
        this.setState(prevState => ({
            cities: prevState.cities.concat(newItem),
            value: ''
        }));
    }

    render() {
        return (
            <div className="favorite-wrapper">
                <div>
                    <h4>Favorite Cities</h4>
                    <form className="favorite-form" >
                        <input
                            type="text"
                            placeholder="add city..."
                            className="textInput"
                            onChange={this.handleChange}
                        />

                        <div onClick={this.handleSubmit} className="add-btn"> + </div>
                    </form>
                    <CityList cities={this.state.cities} className="" />
                </div>

            </div>
        );
    }
}

export default FavoriteList;
