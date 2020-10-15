import React, { useState } from 'react'
import PropTypes from 'prop-types'

const FavoriteName = ({ submit, change }) => {
    const [state, setState] = useState({ cities: [{ text: "Yerevan", id: 1 }] })
    const [value, setValue] = useState("")

    const handleSubmit = (evn, e) => {
        evn.preventDefault(e);
        if (!value.length) {
            return;
        }
        const newItem = {
            text: value,
            id: Date.now()
        };

        setState(prevState => ({
            cities: [...prevState.cities, newItem],
            value: ""
        }));
    };

    const removeItem = (id) => {
        const copyCities = [...state.cities]
        const filterCities = copyCities.filter(i => i.id !== id)
        setState({
            cities: filterCities
        })
    };

    return (
        <div className="favorite-wrapper">
            <div>
                <h4>Favorite Cities</h4>
                <form className="favorite-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="add city..."
                        className="text-input"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                </form>
                <ul className="favorite-list">
                    {state.cities.map((city, index) => (
                        <li className="favorite-item" key={city.id}>
                            <span>
                                <div className="fav-btns">
                                    <form className="favorite-name" onSubmit={submit}>
                                        <span className="favorite-index">{index + 1}.</span>
                                        <button
                                            type="text"
                                            value={city.text}
                                            onClick={change}>
                                            {city.text}
                                        </button>
                                    </form>
                                    <button
                                        className="remove"
                                        type="submit"
                                        onClick={() => removeItem(city.id)}>
                                        &#x058;
                                        </button>
                                </div>
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

FavoriteName.propTypes = {
    value: PropTypes.string.isRequired,
    submit: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
};

export default FavoriteName;