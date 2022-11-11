const wishesReducer = (initialState = [], action) => {
    switch (action.type) {
        case 'add_item':
            console.log(action.payload);
            return [...initialState, action.payload]

        // case 'delete_item':
        //     return initialState.filter(wi => itemWish.id !== action.payload)

        default:
            return initialState;

    }
}

export default wishesReducer;