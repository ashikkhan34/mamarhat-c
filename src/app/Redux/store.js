import { configureStore } from "@reduxjs/toolkit";
import foodReducer from './FoodSlice'
import categoryReducer from './CategorySlice'
import userReducer from './UserSlice'
import restaurantReducer from "./RestaurantSlice"
import reviewReducer from './ReviewSlice'


export const store = configureStore({
    reducer:{
        foods: foodReducer,
        categories: categoryReducer,
        users: userReducer,
        restaurants: restaurantReducer,
         reviews: reviewReducer,
    }
})