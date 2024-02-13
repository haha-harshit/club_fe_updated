const initialState = 0;
 
const changeNumber = (state = initialState , action)=>{
 //we can use if else or switch to increase decrease and return here we used switch statement

    switch(action.type){
    case "INCREMENT"  :  return state+1;
    case "DECREMENT"  :  return state-1;
    default : return state;

 }
}
export default changeNumber;



// This is the one reducer we can create many according to requirements 
// so we can add all in index.js 
