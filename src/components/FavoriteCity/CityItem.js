import React, { useContext } from 'react'
import Context from './context';

function CityItem({ city, index }) {
    const { removeCity } = useContext(Context)

    return (
        <li className="favorite-item">
            <span>
                <span className="favorite-index">{index + 1}.</span>
                <span className="favorite-name">"{city.title}"</span>
            </span>
            <button className='rm' onClick={removeCity.bind(null, city.id)}>&times;</button>
        </li>
    )
}

export default CityItem;