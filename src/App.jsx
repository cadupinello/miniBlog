import { useState, useEffect } from 'react'
import './App.css'

// Routes
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './Routes'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer';

// firebase auth
import { onAuthStateChanged } from 'firebase/auth'

// hooks
import { useAuthentication } from './hooks/useAuthentication'

// Context
import { AuthProvider } from './context/AuthContext';

function App() {

  const [user, setUser] = useState(undefined)
  const { auth } = useAuthentication()

  const loadingUser = user === undefined

  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })

  }, [auth])

  if(loadingUser) { 
    return <p>Carregando ...</p>
  }

  return (
    <div className="App">
      <AuthProvider value={{ user }}>
            <Router>
              <Navbar />
                <div className="container">
                  <Routes />
                </div>
              <Footer />
            </Router>
      </AuthProvider>
    </div>
  )
}

export default App
