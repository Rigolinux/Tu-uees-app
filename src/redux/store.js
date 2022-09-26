import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './states/testStore'
import originReducer from './states/travel/origin'
import destinationReducer from './states/travel/destination'
import CustomizationReducer from './states/Customization/Custom'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    origin: originReducer,
    destination: destinationReducer,
    Customization: CustomizationReducer,
  },
})