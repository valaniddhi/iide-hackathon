import React, { Component } from 'react';
import axios from 'axios';

const generateRandomNumber = (min, max) => {  
    min = Math.ceil(min); 
    max = Math.floor(max); 
    return Math.floor(Math.random() * (max - min + 1)) + min; 
} 

export default class Order extends Component {
    state = {}

    componentDidMount() {
        this.getRandomRestaurant();
    }
    
    getRandomRestaurant = async () => {
        const {match} = this.props;
        const {params} = match;
        const {lat, lon} = params;
        const res = await axios.get('https://developers.zomato.com/api/v2.1/geocode',{ 
            params: { lat, lon }, 
            headers:{ 'user-key': '9ac3b629ab877765bf745bf34c374355' }
        });
        const restaurants = res.data.nearby_restaurants;
        console.log(restaurants);
        const randomIndex = generateRandomNumber(0, restaurants.length);
        this.setState({ selectedRestaurant: restaurants[randomIndex].restaurant });
    }

    render() {
        const {selectedRestaurant}= this.state;
        return (
            <div>
                {selectedRestaurant ? selectedRestaurant.name : null}                
            </div>
        )
    }
}
