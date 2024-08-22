import "./App.css";
import AddUser from "./addUser/AddUser";
import User from "./getUser/User";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import UpdateUser from "./updateUser/UpdateUser";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route index element={<User />} />
        <Route path="/add" element={<AddUser />} />
        <Route path="/update/:id" element={<UpdateUser />} />
      </Route>
    )
  );
  return (
    <div className="App">
      <RouterProvider router={router} />
      {/* <User /> */}
    </div>
  );
}

export default App;
