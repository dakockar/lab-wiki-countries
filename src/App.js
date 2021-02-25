import React, { Component } from 'react'
import './App.css';
import CountriesList from './components/CountriesList';
import CountryDetails from './components/CountryDetails';
import Navbar from "./components/Navbar.js";
import axios from "axios";
import { Route } from "react-router-dom";



export default class App extends Component {

  state = {
    countries: []
  }

  componentDidMount() {
    axios.get("https://restcountries.eu/rest/v2/all")
      .then((response) => {
        // console.log(response.data);
        this.setState({
          countries: response.data
        })
      })
      .catch((err) => {
        console.log(err);
      });

  }



  render() {
    const { countries } = this.state;

    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <div className="row justify-content-start">
            <div className="col">
              <CountriesList countries={countries} />
            </div>
            <div className="col">
              {/* I can't believe I managed to do this :D  */}
              <Route
                exact
                path={`/:countryCode`}
                render={routeProps => {
                  return (
                    <CountryDetails countries={countries} {...routeProps} />
                  )
                }
                } />
            </div>
          </div>
        </div>
      </div>
    )
  }
}