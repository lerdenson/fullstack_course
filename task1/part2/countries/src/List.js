import {useState} from 'react'

import CountryInfo from "./CountryInfo";

const List = (props) => {
    const {showCountries} = props

    const arr = Array(showCountries.length).fill(false)
    const [showInfo, setShowInfo] = useState(arr)

    const handleButtonClick = (index) => {
        const a = [...showInfo]
        a[index] = !a[index]
        setShowInfo(a)
    }



    if (showCountries.length >= 10) return (
        <div>
            To many matches, specify another filter
        </div>)

    if (showCountries.length > 1) return (
        <div>
            <ul>
                {showCountries.map(country =>
                    <li key={country.name.official}>
                        {country.name.official} <button onClick={()=>handleButtonClick(showCountries.indexOf(country))}>show</button>
                        {showInfo[showCountries.indexOf(country)] && <CountryInfo country={country}/>}
                    </li>)}
            </ul>
        </div>)

    if (showCountries.length === 1) {
        return <CountryInfo country={showCountries[0]}/>
    }

}
export default List