import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './states/testStore'
import originReducer from './states/travel/origin'
import destinationReducer from './states/travel/destination'
import CustomizationReducer from './states/Customization/Custom'
import profileReducer from './states/profile'
import travelParamsReducer from './states/travel/travelparams'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    origin: originReducer,
    destination: destinationReducer,
    Customization: CustomizationReducer,
    profile: profileReducer,
    travelParams: travelParamsReducer,
  },
})