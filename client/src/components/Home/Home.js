import { useEffect, useState} from 'react';
import { Container, Grow, Grid, Paper,  AppBar, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { getPosts, getPostsBySearch } from '../../actions/posts'
import Pagenation from '../Pagenation/Pagenation'
import Posts from '../../components/Posts/Posts'
import Form from '../../components/Form/Form'
import useStyles from './styles'
import ChipInput from 'material-ui-chip-input';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {

const [currentId, setCurrentId] = useState(null)
  const classes = useStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);

  useEffect(() => {
    dispatch(getPosts())
  }, [currentId, dispatch])

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
      navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    } else {
      navigate('/');
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const handleAdd = (tag) => setTags([...tags, tag]);

  const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));
   
  return (
    <Grow in>
    <Container maxWidth="xl">
      <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
        <Grid item xs={12} sm={6} md={9}>
          <Posts setCurrentId={setCurrentId} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AppBar className={classes.appBarSearch} position="static" color="inherit">
            <TextField name="search" variant="outlined" label="Search Memories" onKeyPress={handleKeyPress} fullWidth value={search} onChange={(e) => setSearch(e.target.value)} />
            <ChipInput style={{ margin: '10px 0' }} value={tags} onAdd={handleAdd} onDelete={handleDelete} label="Search Tags" variant="outlined" />
            <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
          </AppBar>
        <Form currentId={currentId} setCurrentId={setCurrentId} />
        <Paper elevation={6}>
          <Pagenation />
        </Paper>
        </Grid>
      </Grid>
    </Container>
  </Grow>
  )
}

export default Home