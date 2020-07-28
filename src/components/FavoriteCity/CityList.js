import React from 'react'


const CityList = ({ cities }) => {
    return (
        <ul className="favorite-list">
            {cities.map((city,index) => (
                <li className="favorite-item" key={city.id}>
                    <span>
                        <span className="favorite-index">{index + 1}.</span>
                        <span className="favorite-name">"{city.text}"</span>
                    </span>
                </li>
            ))}
        </ul>
    )
}

export default CityList;