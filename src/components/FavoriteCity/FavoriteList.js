import React, { useState } from 'react'
import Context from './context'
import AddCity from './AddCity'
import CityList from './CityList'


export default function FavoriteList() {
    const [cities, setCity] = useState([])

    function addCity(title) {
        setCity(
            cities.concat([
                {
                    title,
                    id: Date.now()
                }
            ])
        )
    }
    function removeCity(id) {
        setCity(cities.filter(city => city.id !== id))
    }

    return (
        <Context.Provider value={{ removeCity }}>
            <div className="favorite-wrapper">
                <h5>Your Favorite Cities</h5>
                <AddCity onCreate={addCity} />
                {cities.length ? <CityList cities={cities} /> : <h6>Empty...</h6>}
            </div>
        </Context.Provider>
    )
}