const {createStore,  applyMiddleware} = require("redux")
const thunk = require("redux-thunk").default
const axios = require("axios")


const Fetch_USERS_REQUEST = "FETCH_USERS_REQUEST";
const Fetch_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
const Fetch_USERS_FAIL = "FETCH_USERS_FAIL";

const initialState = {
   users: [],
   error: "",
   isLoading: false,
}

const fetchUsersRequest = ()=>{
    return{
        type: Fetch_USERS_REQUEST
    }
}

const fetchUsersSuccess = (users)=>{
    return{
        type: Fetch_USERS_SUCCESS,
        data: users,
    }
}


const fetchUsersFail = (error)=>{
    return{
        type: Fetch_USERS_FAIL,
        data: error,
    }
}


const userReducer = (state=initialState, action)=>{
    switch(action.type){
        case Fetch_USERS_REQUEST:
           return {...state, isLoading: true};
        case Fetch_USERS_SUCCESS:
           return {isLoading: false, users:action.data, error: ''};
        
        case Fetch_USERS_FAIL:
           return {isLoading: false, users:[], error:action.data};
        
        default:
           return state;
}

}

const fetchUsers = ()=> {
    return function(dispatch){
        dispatch(fetchUsersRequest())
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(response => {
            let users = response.data;
            dispatch(fetchUsersSuccess(users));     
        })
        .catch(err => {
            dispatch(fetchUsersFail(error))
        })
    }
}

const store = createStore(userReducer, applyMiddleware(thunk));
store.subscribe(users => {
    console.log(store.getState())});
store.dispatch(fetchUsers())
