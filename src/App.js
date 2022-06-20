import logo from './logo.svg';
import './App.css';
import Tareas from "./pages/Tareas/Inicio"
import {Provider} from "react-redux"
import {store} from "./helpers"

function App() {
  return (
    <Provider store={store}>
      <Tareas/>
    </Provider>    
  );
}

export default App;
