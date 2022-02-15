import { useEffect, useState} from 'react';
import { Container, Grow, Grid, Paper } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { getPosts } from '../../actions/posts'
import Pagenation from '../Pagenation/Pagenation'
import Posts from '../../components/Posts/Posts'
import Form from '../../components/Form/Form'
import useStyles from './styles'

const Home = () => {

const [currentId, setCurrentId] = useState(null)
  const classes = useStyles()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPosts())
  }, [currentId, dispatch])
   
  return (
    <Grow in>
    <Container>
      <Grid className={classes.mainContainer} container justifyContent='space-between' alignItems='stretch' spacing={3}>
        <Grid item xs={12} sm={7}>
        <Posts setCurrentId={setCurrentId} />
        </Grid>
        <Grid item xs={12} sm={4}>
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