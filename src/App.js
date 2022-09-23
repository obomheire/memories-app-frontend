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
        <Route path="/" exact element={<Navigate replace to="/posts" /> } />
        <Route path="/posts" exact element={<Home />} />
        <Route path="/posts/search" exact element={<Home />} />
        <Route path="/posts/:id" exact element={<PostDetails />} />
        <Route path="/auth" exact element={(!user ? <Auth /> : <Navigate replace to="/posts" /> )} />
      </Routes>
    </Container>
  </Router>
  );
}

export default App;