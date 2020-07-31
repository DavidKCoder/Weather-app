import React, { Component } from 'react'
import PropTypes from 'prop-types'

class FavoriteList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cities: [{ text: "Yerevan", id: 1 }],
            value: "",
        };
    }

    handleChange = (e) => {
        this.setState({
            value: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.value.length === 0) {
            return false;
        }
        const newItem = {
            text: this.state.value,
            id: Date.now()
        };
        this.setState(prevState => ({
            cities: prevState.cities.concat(newItem),
            value: ''
        }));
    };

    removeItem = (id) => {
        this.state.cities.splice(id, 1)
        this.setState({ cities: this.state.cities })
        // console.log(cities);
    }


    render() {
        return (
            <div className="favorite-wrapper">
                <div>
                    <h4>Favorite Cities</h4>
                    <form className="favorite-form" onSubmit={this.handleSubmit}>
                        <input
                            type="text"
                            placeholder="add city..."
                            className="textInput"
                            value={this.state.value}
                            onChange={this.handleChange}
                        />
                    </form>
                    <ul className="favorite-list">
                        {this.state.cities.map((city, index) => (
                            <li className="favorite-item" key={city.id}>
                                <span>
                                    <div className="fav-btns">

                                        <form className="favorite-name" onSubmit={this.props.submit}>
                                            <span className="favorite-index">{index + 1}.</span>
                                            <button type="text" value={city.text} onClick={this.props.change}>{city.text}</button>
                                        </form>
                                        <button className="rm" type="submit" onClick={this.removeItem}>&#x058;</button>
                                    </div>
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

FavoriteList.propTypes = {
    value: PropTypes.string.isRequired,
    submit: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
};

export default FavoriteList;
