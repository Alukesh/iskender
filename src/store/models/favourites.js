
const favourites = {
    state: {
        favourites: []
    },
    reducers: {
        addToFavourites: (state, product) => {
            return {
                ...state,
                favourites: [...state.favourites, product]
            }
        },
        removeFromFavourites: (state, productId) => {
          return  {
            ...state, favourites: state.favourites.filter(prod => prod._id !== productId)  
          }
          
        },
    }
}

export default favourites;