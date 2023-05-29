import { configureStore, createSlice } from '@reduxjs/toolkit'
import user from './store/userSlice'
import data from './data.js'

let stock = createSlice({
  name : 'stock',
  initialState : [10, 11, 12]
})

let cart = createSlice({

  name : 'cart',
  
  initialState : [
    {id : 0, name : 'White and Black', count : 2},
    {id : 2, name : 'Grey Yordan', count : 1}
  ],

  reducers : {
    changeCount(state, action){
      const { itemId, increment } = action.payload;
      let num = state.findIndex((item)=>item.id === itemId);
      state[num].count += increment;
    },
    orderShoes(state, action){
      let num = state.findIndex((item)=>item.id == action.payload.id)
      console.log(num);
      if(num != -1){
        state[num].count++
        console.log(state[num].count)
      } else {
        state.push(action.payload);
      }
    }
  }
})
export let { changeCount, orderShoes } = cart.actions

export default configureStore({
  reducer: {
    user : user.reducer,
    stock : stock.reducer,
    cart : cart.reducer
  }
})