import { configureStore } from "@reduxjs/toolkit";
import myIngredientSlice from "./myIngredientSlice";
import ingredientsSlice from "./ingredientsSlice";
import constructorSlice from "./constructorSlice";
import orderSlice from "./orderSlice";

export const store = configureStore({
  reducer: {
    ingredients: ingredientsSlice,
    myIngredient: myIngredientSlice,
    userBurgerIngredients: constructorSlice,
    order: orderSlice,
  },
});
