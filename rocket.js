const initialState = [];

export const fetchRockets = (payload) => ({
type: 'FETCH_ROCKETS',
payload,
});

export const reserveRocket = (payload) => ({
type: 'RESERVE_ROCKET',
payload,
});

export const CancelReservation = (payload) => ({
type: 'CANCEL_RESERVATION',
payload,
});

export const fetchRocketsApi = () => async (dispatch) => {
const rockets = await axios.get('https://api.spacexdata.com/v4/rockets');
const mapRockets = Object.entries(rockets.data).map(([id, rocket]) => {
    const { rocket_name, description, flickr_images } = rocket;
    return {
    id,
    rocket_name,
    description,
    };
});
dispatch(fetchRockets(mapRockets));
};

export const confirmReservation = (id) => (dispatch) => {
dispatch(reserveRocket(id));
};

export const confirmCancelReservation = (id) => (dispatch) => {
dispatch(CancelReservation(id));
};

const rocketReducer = (state = initialState, action) => {
switch (action.type) {
    case 'FETCH_ROCKETS':
    return action.payload;
    case 'RESERVE_ROCKET':
    return state.map((rocket) => {
        if (rocket.id !== action.payload.id) return rocket;
        return { ...rocket, reserved: true };
    });
    case 'CANCEL_RESERVATION':
    return state.map((rocket) => {
        if (rocket.id !== action.payload.id) return rocket;
        return { ...rocket, reserved: false };
    });
    default:
    return state;
}
};

export default rocketReducer;
