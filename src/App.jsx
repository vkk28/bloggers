
import { useState ,useEffect} from 'react'
// import './App.css'
import { useDispatch } from 'react-redux'
import Home from './pages/Home.jsx'
import Footer from './components/Footer/Footer.jsx'
import Header from './components/Header/Header.jsx'
import authService from "./appwrite/auth.js"
import {login , logout} from "./store/authSlice.js"
import { Outlet } from 'react-router-dom'


function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  //console.log(import.meta.env.VITE_APPWRITE_URL);
  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
     
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])
  
  return !loading ? (
    <div className="min-h-[100dvh] flex flex-col justify-between bg-bgcolor">
   
        <Header />
        <main>
        <Outlet />
        </main>
        <Footer/>
      {/* <Home/> */}
      </div>
    
  ) : null
}
//import { client } from "appwrite";  // Import the configured client

// class App extends React.Component {
//     componentDidMount() {
//         // Use the client to call Appwrite APIs
//         client.account.get()
//             .then(user => console.log(user))
//             .catch(err => console.error('Error:', err));
//     }

//     render() {
//         return <div>Hello, Appwrite!</div>;
//     }
// }

export default App;

