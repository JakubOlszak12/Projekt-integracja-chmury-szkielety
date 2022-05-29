import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import Main from "./components/Main"
import Register from "./components/Register"
import Login from "./components/Login"
import UserProfile from "./components/UserProfile"
import Navbar from "./components/Navbar";
import Laureates from "./components/Laureates"
import Prizes from "./components/Prizes"
import {AppContextProvider} from "./AppContext";


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
            {user && <Route path="/user" exact element={<UserProfile/>}/>}
            <Route path="/user" element={<Navigate replace to="/login" />} />
            {user && <Route path="/laureates" exact element={<Laureates/>}/>}
            {user && <Route path="/prizes" exact element={<Prizes/>}/>}
            {user && <Route path="/storePrizes" exact element={<Laureates/>}/>}
            {user && <Route path="/storeLaureates" exact element={<Laureates/>}/>}
            <Route path="/laureates" element={<Navigate replace to="/login" />} />
            <Route path="/storePrizes" element={<Navigate replace to="/login" />} />
            <Route path="/storeLaureates" element={<Navigate replace to="/login" />} />
            <Route path="/prizes" element={<Navigate replace to="/login" />} />
            {user && <Route path="/deleteLaureates" exact element={<Laureates/>}/>}
            {user && <Route path="/deletePrizes" exact element={<Laureates/>}/>}
            <Route path="/deleteLaureates" element={<Navigate replace to="/login" />} />
            <Route path="/deletePrizes" element={<Navigate replace to="/login" />} />
        </Routes>
        </AppContextProvider>
    </BrowserRouter>
  );
}

export default App;
