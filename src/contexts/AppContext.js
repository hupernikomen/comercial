import React, { createContext, useState, useEffect } from "react";
import { api } from '../services/api'
import { View,Text } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

export const AppContext = createContext({})

export function AppProvider({ children }) {

  const [regionSelected,setRegionSelected] = useState('Dirceu')

  function selectRegion(region){
    setRegionSelected(region)
  }
  

  return (
    <AppContext.Provider value={{
      regionSelected,
      selectRegion,
    }}>
      {children}
    </AppContext.Provider>
  )
}