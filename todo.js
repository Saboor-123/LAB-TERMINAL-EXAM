const SET = 'todo/SET';
export default function reducer(state = {}, action = {}) {
switch (action.type) {
    case SET:
    return state;
    default: return state;
}
}
export function set() {
return { type: SET };
}

