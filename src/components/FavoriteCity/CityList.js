import React from 'react'
import CityItem from './CityItem'


function CityList(props) {
    return (
        <ul className="favorite-list">
            {props.cities.map((city, index) => {
                return (
                    <CityItem
                        city={city}
                        key={city.id}
                        index={index} />
                )
            })}
        </ul>
    )
}

export default CityList;