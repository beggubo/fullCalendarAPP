import { api } from "../helpers";

export const crudService = {
    GET_DATA,
    GET_ITEM,
    GET_DELETE,
    SET_ADD,
    SET_UPDATE

};

function GET_DATA(payload, dato) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dato),
    };
    return fetch(`${api}/${payload}/lista`, requestOptions).then(handleResponse);
}

function SET_ADD(payload, dato) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dato),
    };
    return fetch(`${api}/${payload}`, requestOptions).then(handleResponse);
}

function GET_ITEM(payload, pky) {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" }      
    };
    return fetch(`${api}/${payload}/${pky}`, requestOptions).then(handleResponse);
}

function SET_UPDATE(payload, dato) {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dato)      
    };
    return fetch(`${api}/${payload}/${dato.id}`, requestOptions).then(handleResponse);
}

function GET_DELETE(payload, dato) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dato)      
    };
    return fetch(`${api}/${payload}/delete/lista`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then((text) => {
      const data = text && JSON.parse(text);
      if (!response.ok) {
        if (response.status === 401) {
          // auto logout if 401 response returned from api
          // logout();
          //location.reload(true);
        }
  
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }
  
      return data;
    });
  }