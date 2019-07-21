import React, { Component } from 'react';
import './App.css';
import { Button, Spinner } from 'reactstrap';
import axios from 'axios';
import SearchMenu from './components/searchMenu';
import Header from './components/header';


String.prototype.toProperCase = function () {
  return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

class App extends Component {
  state = {
    images: [],
    inputValue: '',
    loading: false
  }

  dogBreedSearchHandler = (breedName) => {
    this.setState({ loading: true });
    breedName = this.state.inputValue;
    axios.get('http://localhost:3001/api/' + breedName, { responseType: 'json' }).then(response => this.setState({ images: response.data.message }))

    setInterval(() => this.setState({ loading: false }), 2500);
  }




  InputChangeHandler = (event) => {
    this.setState({ inputValue: event.target.value });
  }

  render() {


    return (

      <div className="App-header">

        <Header/>
        <div className="search-bar">
          <SearchMenu inputValue = {this.state.inputValue} onInputChange = {event => this.InputChangeHandler(event)}/>
          <div className="button">
            <Button onClick={() => this.dogBreedSearchHandler(this.state.inputValue)} color="danger">Search</Button>
          </div>
        </div>

        <div className="image-array">

          {this.state.loading ? <Spinner style = {{margin: 'auto'}}/> : (Array.isArray(this.state.images) ? this.state.images.map((image, index) =>
            <div key = {index + 2}> <img alt = "" style={{ height: '300px', width: '300px', padding: '10px' }} key={index} src={image} /> <div style = {{width: '300px', height: '40px'}} key = {index + 1} className = "image-container">{image.split("/")[4].toProperCase()} </div> </div>
          ) : <div>Sorry, no results were found!</div>)}

        </div>
      </div>



    );
  }
}




export default App;
