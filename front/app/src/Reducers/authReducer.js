export default function (state = {}, action) {
    switch (action.type) {
        case "CREATE_SESSION":
            return { ...state, token: action.token, flash: action.flash }
        default:
            return state;
    }
}