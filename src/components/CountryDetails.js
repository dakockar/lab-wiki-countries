import React, { Component } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";

export default class CountryDetails extends Component {

    state = {
        country: {}
    }

    getCountry() {
        // console.log("get country")
        console.log(this.props)

        // alpha3Code
        const { countryCode } = this.props.match.params;

        axios.get(`https://restcountries.eu/rest/v2/alpha/${countryCode}`)
            .then((response) => {
                // console.log(response.data);
                // console.log("get country then")

                const { name, capital, area, borders } = response.data;

                let country = {
                    name,
                    capital,
                    area,
                    borders,
                    countryCode
                }

                this.setState({
                    country
                })

            })
            .catch((err) => {
                console.log("error in getCountry ", err);
            });
    }

    componentDidMount() {
        // console.log("did mount")
        this.getCountry();
    }

    componentDidUpdate() {
        // console.log("did update")
        const { countryCode } = this.props.match.params;

        if (this.state.country.countryCode !== countryCode) {
            this.getCountry();
        }
    }


    render() {
        // console.log("render")

        // the single country in out state
        const { country } = this.state;
        // the countries array that is passed with render in Route component in App.js
        const { countries } = this.props;

        if (!country.name) return null;

        // we want to use the names of the border countries, not only the codes
        // search the borders in the countries array and get a borderCountries array with details included

        let borderCountries = countries.filter(singleCountry => {
            return country.borders.includes(singleCountry.alpha3Code);
        });

        // worse solution for above :)
        // for (let border of country.borders) {
        // borderCountries.push(...countries.filter((singleCountry) => singleCountry.alpha3Code === border))
        // }

        return (
            <>
                <h1>{country.name}</h1>
                <table className="table">
                    <thead></thead>
                    <tbody>
                        <tr>
                            <td>Capital</td>
                            <td>{country.capital}</td>
                        </tr>
                        <tr>
                            <td>Area</td>
                            <td>
                                {country.area} km<sup>2</sup>
                            </td>
                        </tr>
                        <tr>
                            <td>Borders</td>
                            <td>
                                <ul>
                                    {
                                        borderCountries.length
                                            ? borderCountries.map((border, index) => {
                                                return (
                                                    <li key={index}>
                                                        <Link to={border.alpha3Code}>
                                                            {border.name}
                                                        </Link>
                                                    </li>)
                                            })
                                            : null
                                    }
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </>
        )
    }
}
