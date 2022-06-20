import { crudService }  from "../services/crud.service"
export const crudActions = {
    GET_DATA,
    GET_ITEM,
    GET_DELETE,
    SET_ADD,
    SET_UPDATE
};

function GET_DATA(xredux, payload, dato) {  
    return (dispatch) => {          
        crudService.GET_DATA(payload,dato)
        .then((response) => {                  
          dispatch(resRedux(xredux, response.result));                
        })
    };
}

function GET_ITEM(xredux, payload, pky) {  
    return (dispatch) => {    
      crudService.GET_ITEM(payload,pky)        
        .then((response) => {                  
          dispatch(resRedux(xredux, response.result));                
        })
    };
}
function GET_DELETE(xredux, payload, dato) {  
    return (dispatch) => {    
      crudService
        .GET_DELETE(payload,dato)        
        .then((response) => {                  
          dispatch(resRedux(xredux, response.result));                
        })
    };
}

function SET_UPDATE(xredux, payload, dato) {  
    return (dispatch) => {    
      crudService
        .SET_UPDATE(payload,dato)
        .then((response) => {                  
          dispatch(resRedux(xredux, response.result));                
        })
    };
}

function SET_ADD(xredux, payload, dato) {  
    return (dispatch) => {
      crudService
        .SET_ADD(payload, dato)
        .then((response) => {             
          if(response.result){                    
            dispatch(resRedux(xredux, response.result));  
          }                                 
        })
        
    };
  }


export function resRedux(xredux, result) {     
    return {
      type: xredux,
      response: result
    };    
  }
  