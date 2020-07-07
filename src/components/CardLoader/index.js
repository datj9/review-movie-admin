import React from "react";
import ContentLoader from "react-content-loader";

const CardLoader = (props) => {
    const listCard = [];
    for (let i = 0; i < props.numberOfCards; i++) {
        listCard.push(
            <ContentLoader className='card-item' viewBox='0 0 300 250'>
                <rect x='0' y='0' rx='5' ry='5' width='300' height='200' />
                <rect x='0' y='210' rx='4' ry='4' width='250' height='17' />
                <rect x='0' y='233' rx='3' ry='3' width='270' height='12' />
            </ContentLoader>
        );
    }
    return listCard;
};

export default CardLoader;
