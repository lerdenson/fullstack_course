import {useState, useEffect} from 'react'
import axios from "axios";
import Finder from "./Finder";
import List from "./List";


const App = () => {
    const [countries, setCountries] = useState([])
    const [showCountries, setShowCountries] = useState([])

    const handleInputChange = (event) => {
        const input = event.target.value
        const countriesToShow = countries.filter(country => country.name.official.toLowerCase().includes(input.toLowerCase()))
        setShowCountries(countriesToShow)
    }

    const hook = () => {
        axios
            .get('https://restcountries.com/v3.1/all')
            .then(response => {
                setCountries(response.data)
            })
    }

    useEffect(hook, [])

    return (
        <div>
            <Finder handleInputChange={handleInputChange}/>
            <List showCountries={showCountries}/>
        </div>
    );
}

export default App;
