import Weather from "./Weather";

const Languages = (props) => {
    const {country} = props
    const getLanguages = (country) => {
        const lngs = []
        Object.values(country.languages).forEach((language) => lngs.push(language));
        return lngs
    }

    return (
        <ul>
            {getLanguages(country).map(language =>
                <li key={language}>
                    {language}
                </li>)}
        </ul>
    )
}

const CountryInfo = (props) => {
    const {country} = props

    return (
        <div>
            <h2>{country.name.official}</h2>
            <p>capital {country.capital[0]}</p>
            <p>area {country.area}</p>
            <h3>languages</h3>
            <Languages country={country}/>
            <img src={country.flags.png} alt="flag"/>
            <Weather country={country}/>
        </div>
    )
}

export default CountryInfo