import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { confirmReservation, confirmCancelReservation } from '../redux/rocket/rocket';

const Item = (props) => {
const {
    rocket: {
    id,
    rocket_name,
    description,
    reserved,
    },
} = props;

const dispatch = useDispatch();
const reserveRocketFromStore = () => {
    if (reserved === true) {
    dispatch(confirmCancelReservation({ id }));
    } else {
    dispatch(confirmReservation({ id }));
    }
};

return (
    <div  className="block-rocket">
    <div className="text-rocket">
        <h2 className="title">{rocket_name}</h2>
        <div className="reserv">
        <p className="pi-text">
            {reserved === true ? (
            <button type="button" className="res" key={id}>Reserved</button>
            ) : (
            <p />
            )}
            {description}
        </p>
        </div>
        {reserved ? (
        <button type="button" className="reserve cancel" onClick={reserveRocketFromStore}>
            Cancel Reservation
        </button>
        ) : (
        <button type="button" className="reserve" onClick={reserveRocketFromStore}>
            Reserve Rocket
        </button>
        )}
    </div>
    </div>
);
};

Item.propTypes = {
rocket: PropTypes.shape({
    id: PropTypes.number,
    rocket_name: PropTypes.string,
    description: PropTypes.string,
    reserved: PropTypes.bool,
}).isRequired,
};

export default Item;
