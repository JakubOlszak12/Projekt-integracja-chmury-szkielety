import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<div>XD</div>}/>
        <Route path='/register' element={<div>register</div>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
