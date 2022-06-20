const initialState ={
    data:[],
    item:{
        id:'',
        title:'',
        start:'',
        end:'',
        backgroundcolor:'',
        selectable:false,
        detalle:''
    }
}

export function tareas(state = initialState, action){

    switch(action.type){
        case "TAREAS_ADD":            
        return {
          ...state,
          data: action.response,
          item: initialState.item  
        };
        case "TAREAS_DATA":
        return {
          ...state,
          data:action.response
        };

        default:
            return state;
    }
}    