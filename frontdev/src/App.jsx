import './App.css';
// import Style from './Style';
import Navbar from './components/navbar/Navbar';
// import Login from './pages/auth/Login';
// import Signup from './pages/auth/Signup';
// import Sucess from './pages/auth/Sucess';
// import Verify from './pages/auth/Verfication';
import Pay from './pages/payment/Pay';

function App() {
  return (
    <div>
    {/* <Style /> */}
    <Navbar />
    <div className='flex justify-center'>
    {/* <Signup /> */}
    {/* <Login /> */}
    {/* <Verify /> */}
    {/* <Sucess /> */}
    <Pay />
    </div>
    </div>
  );
}

export default App;
