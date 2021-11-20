const {createStore, combineReducers, applyMiddleware} = require("redux")
const logger = require("redux-logger").default
const thunk = require("thunk")

const BUY_LAPTOP="BUY_LAPTOP";
const BUY_Mobile="BUY_Mobile";

const initialLaptops = {
    numberOfLaptops: 100
}

const initialMobile= {
    numOfMobiles: 1000
}

const byLaptop=() => {
    return {
        type: BUY_LAPTOP
    }

}

const byMobile=() => {
    return {
        type: BUY_Mobile
    }

}


// const reducers = (state, action) =>{
//    if(action.type == "BUY_LAPTOP"){
//        return {numberOfLaptops: state.numberOfLaptops-1}
//    }else{
//        return state;
//    }
// }


const laptopReducer = (state=initialLaptops, action)=>{
    switch(action.type){
      case BUY_LAPTOP:
      return {numberOfLaptops: state.numberOfLaptops-1};
      default:
          return state;  
    }

}

const mobileReducer = (state=initialMobile, action)=>{
    switch(action.type){
      case BUY_Mobile:
      return {numOfMobiles: state.numOfMobiles-1};
      default:
          return state;  
    }

}

const rootReducer = combineReducers({laptops:laptopReducer, mobiles:mobileReducer});
const store = createStore(rootReducer, applyMiddleware(logger));
console.log(store)
store.subscribe(state => {                                                                                                                 
    console.log(store.getState())
})

store.dispatch( byLaptop());
store.dispatch( byLaptop());
store.dispatch( byLaptop());
store.dispatch( byMobile());
store.dispatch( byMobile());