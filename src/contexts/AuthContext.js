import React, { createContext, useState, useEffect } from "react";
import api from '../services/api'

import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({})

export function AuthProvider({ children }) {

  const [user, setUser] = useState({
    id: '',
    email: '',
    token: ''
  })


  const [loadingAuth, setLoadingAuth] = useState(false)
  const [loading, setLoading] = useState(true)

  const isAutenticator = !!user.email

  useEffect(() => {


    async function getUser() {
      const userData = await AsyncStorage.getItem('@authGuiaComercial')

      let hasUser = JSON.parse(userData || '{}')

      // verifica se tem um user no asyncStorage
      if (Object.keys(hasUser).length > 0) {
        api.defaults.headers.common['Authorization'] = `Bearer ${hasUser.token}`

        setUser({
          id: hasUser.id,
          email: hasUser.email,
          token: hasUser.token
        })
      } else {
        AsyncStorage.clear()
      }


      setLoading(false)

    }
    getUser()

  }, [])



  async function signIn({ email, password }) {
    setLoadingAuth(true)
    if (email == '' || password == '') {
      return
    }
    
    const response = await api.post('/login', { email, password })


    const { id, token } = response.data
    const data = { ...response.data }


    await AsyncStorage.setItem('@authGuiaComercial', JSON.stringify(data))

    //Passar para todas as requisições o token do lojista logado
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`

    setUser({
      id,
      email,
      token
    })

    setLoadingAuth(false)

  }

  async function signOut() {
    await AsyncStorage.clear()
      .then(() => {
        setUser({
          id: '',
          email: '',
          token: ''
        })
      })
  }



  return (
    <AuthContext.Provider value={{
      user,
      isAutenticator,
      loadingAuth,
      loading,
      signIn,
      signOut,
    }}>
      {children}
    </AuthContext.Provider>
  )
}