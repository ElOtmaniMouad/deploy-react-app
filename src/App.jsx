import { RouterProvider } from "react-router-dom"; 
import { ContextProvider } from './context/ContextProvider.jsx';
import { router } from "./router/index.jsx";
import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  );
}

export default App;
