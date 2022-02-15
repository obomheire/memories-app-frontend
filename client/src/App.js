import { Container } from '@material-ui/core';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import PostDetails from './components/PostDetails/PostDetails';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth'

function App() {

  const user = JSON.parse(localStorage.getItem('profile'))

  return (
    <Router>
    <Container maxWidth="xl">
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate replace to="/posts" /> } />
        <Route path="/posts" element={<Home />} />
        <Route path="/posts/search" element={<Home />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/auth" element={(!user ? <Auth /> : <Navigate replace to="/posts" /> )} />
      </Routes>
    </Container>
  </Router>
  );
}

export default App;