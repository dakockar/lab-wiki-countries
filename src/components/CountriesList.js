import React, { Component } from 'react'
import { Link } from "react-router-dom";
// import axios from "axios";


export default class CountriesList extends Component {


    render() {
        const { countries } = this.props;

        return (
            <div className="scroll">
                {
                    countries.map(country => {
                        return (
                            <div className="list-item" key={country.alpha3Code}>
                                <Link to={country.alpha3Code}>
                                    <img src={country.flag} alt={country.name} />  {country.name}
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
