// React Core
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// Redux
// import { useDispatch, useSelector } from 'react-redux';
// Selectors
// Libs
import axios from '../__mock__/axios';
// Components
import Cards from '../components/Cards';


const CardsContainer = props => {

    const [cardsData, setCardsData] = useState([]);

    useEffect(() => {
        axios.get('/cards')
            .then(cardsResponse => {
                setCardsData(cardsResponse.data)
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    return (
        <Cards cardsData={cardsData} />
    )

};

export default CardsContainer;