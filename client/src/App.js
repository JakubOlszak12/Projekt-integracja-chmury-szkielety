import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import Main from "./components/Main"
import Register from "./components/Register"
import Login from "./components/Login"
import UserProfile from "./components/UserProfile"
import Navbar from "./components/Navbar";
import AppContextProvider from "./AppContext";

function App() {
    const user = localStorage.getItem("token")

    return (
    <BrowserRouter>
        <AppContextProvider>
        {user && <Navbar />}
        <Routes>
            {user && <Route path="/" exact element={<Main />} />}
            <Route path="/signup" exact element={<Register />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/" element={<Navigate replace to="/login" />} />
            <Route path="/user" exact element={<UserProfile />}/>
        </Routes>
        </AppContextProvider>
    </BrowserRouter>
  );
}

export default App;
