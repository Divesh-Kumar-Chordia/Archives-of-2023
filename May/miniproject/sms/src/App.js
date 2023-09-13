
import './App.css';

import Home from './screens/Home';
import{
  BrowserRouter as Router,
  Routes,Route
} from 'react-router-dom'
import Login from './screens/Login';
import Signup from './screens/Signup'
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
// import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import Teacher from './screens/Teacher';
import Student from './screens/Student';
import Admin from './screens/Admin';
import AddStudent from './screens/AddStudent';
import TakeAttendance from './screens/TakeAttendance';
import AddSheet from './screens/AddSheet';

import Authchecker from './screens/Authchecker';

function App() {
 
  return (
   <Router>
    <div>
      <Routes>
        <Route exact path='/' element={<Home/>}></Route>
       
        <Route exact path='/signup' element={<Signup/>}></Route>
        <Route exact path='/login' element={<Login/>}></Route>
        <Route exact path='/teacher' element={<Authchecker/>}></Route>
        
        <Route exact path='/student' element={<Student/>}></Route>
        {/* <Route exact path='/admin' element={<Admin/>}></Route> */}
        <Route exact path='/addstudent' element={<AddStudent/>}></Route>
        <Route exact path='/takeattendance' element={<TakeAttendance/>}></Route>
        <Route exact path='/addsheet' element={<AddSheet/>}></Route>

      </Routes>
      
    </div>
   </Router>
  );
}

export default App;
