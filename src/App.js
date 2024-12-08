import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Logout from './Components/Logout';
import NotesList from './Components/NotesList';
import CreateNote from './Components/CreateNote';
import UpdateNote from './Components/UpdateNote';
import DeleteNote from './Components/DeleteNote';
import UsersList from './Components/UsersList';
import UpdatePassword from './Components/UpdatePassword';
import { useState } from 'react';
function App() {
  const [userName, setUserName] = useState("");
  return (
    <Router>
      <div className="App">
        <Routes>
        <Route path="/Login" element={<Login setUserName={setUserName} />} />
          <Route path="/" element={<NotesList userName={userName} />} />
          <Route path="/Logout" element={<Logout />} />
          <Route path="/DeleteNote/:id" element={<DeleteNote />} />
          <Route path="/UpdateNote/:id" element={<UpdateNote />} />
          <Route path="/CreateNote" element={<CreateNote />} />
          <Route path="/UsersList" element={<UsersList />} />
          <Route path="/UpdatePassword" element={<UpdatePassword />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;