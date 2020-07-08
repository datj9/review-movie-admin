import React from "react";
import ContentLoader from "react-content-loader";

const CardLoader = (props) => {
    const listCard = [];
    for (let i = 0; i < props.numberOfCards; i++) {
        listCard.push(
            <ContentLoader key={i} className='card-item' viewBox='0 0 300 270'>
                <rect x='0' y='0' rx='5' ry='5' width='300' height='220' />
                <rect x='20' y='230' rx='4' ry='4' width='250' height='15' />
                <rect x='20' y='257' rx='3' ry='3' width='280' height='12' />
            </ContentLoader>
        );
    }
    return listCard;
};

export default CardLoader;
