const Finder = (props) => {
    const {handleInputChange} = props
    return <div>
        <p>Find countries
            <input onChange={handleInputChange}/>
        </p>
    </div>
}

export default Finder