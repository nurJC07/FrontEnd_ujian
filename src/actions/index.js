import axios from 'axios'
import {
    USER_LOGIN_SUCCESS, 
    AUTH_SYSTEM_ERROR, 
    AUTH_LOADING,
    LOGOUT,
    COOKIE_CHECKED,
    SELECT_PRODUK,
    EDIT_CART,
    ADD_CART  
    
}from './types'

export const onUserRegister =({username, email, phone, password, confirm}) => {
   
        // dispatch berfungsi untuk proses unsincrone (axios)      
        return (dispatch) => {
            dispatch({
                type: AUTH_LOADING
            })
            if(username === '' || email === "" || phone === "" || password === '' || confirm === ''){
                dispatch ({type: AUTH_SYSTEM_ERROR , payload: 'Semua Form harus diisi'})
            }
            else {
        axios.get (' http://localhost:3001/users', {
            params: {
                username
            }
        }).then((res) => {
            if(res.data.length === 0){
                axios.post(' http://localhost:3001/users', {
                username, email, password, confirm, phone
            }).then((res) => {
                console.log(res)
                dispatch({type : USER_LOGIN_SUCCESS, payload : res.data.username})   
            }).catch ((err)=> {
                console.log(err)
                dispatch({type: AUTH_SYSTEM_ERROR, payload: 'System Error'})
            })
            }
            else {
            dispatch({type: AUTH_SYSTEM_ERROR, payload: 'Username has been taken'})
            }       
        }).catch ((err)=> {
            console.log(err)
            dispatch({type: AUTH_SYSTEM_ERROR, payload: 'System Error'})
    })
            }}
    }
export const onUserLogOut = () => {
    return {type : LOGOUT}
}

export const onUserLogin = ({username, password}) => {
    return (dispatch) => {
        dispatch({type: AUTH_LOADING})
        // setTimeout(() => loginYok(dispatch, username,password),2000) untuk delay loading
        loginYok (dispatch, username, password);
          
}
    } 


export const keepLogin = (username) =>{

    return {type : USER_LOGIN_SUCCESS, payload:username, cookie :true}
}


export const cookieChecked = () => {
    return {type : COOKIE_CHECKED }
}

// export const loginYok =({dispatch, username, password}) => {
var loginYok = (dispatch,username,password) => {
        axios.get(' http://localhost:3001/users', {
            params: {
                username,
                password
            }
        }).then((res) =>{
            console.log(res)
            if (res.data.length> 0){
                dispatch({type : USER_LOGIN_SUCCESS, payload : username})
            }
            else {
                dispatch({type: AUTH_SYSTEM_ERROR, payload: 'Username or password invalid'})
            } 
        }).catch ((err)=> {
            console.log(err)
            dispatch({type: AUTH_SYSTEM_ERROR, payload: 'System Error' })
        })
    }

   export const select_produk = (selectedProduk) => {
       return {
           type : SELECT_PRODUK,
           payload : selectedProduk
       }
   } 

   export const editClick = () =>{
    return {type : EDIT_CART}
}
export const addCart = () =>{
    return {type : ADD_CART}
}
    

   