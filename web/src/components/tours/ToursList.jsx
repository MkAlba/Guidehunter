import { useState, useEffect } from 'react';
import TourItem from './TourItem';
import { list } from '../../services/tours-service';
import Filter from './../Filter';
import { Grid, Container, Header } from 'semantic-ui-react'

function ToursList({ minSearchChars }) {

  const [state, setState] = useState({
    tours: [],
    loading: false
  });
  const [search, setSearch] = useState('');

  useEffect(() => {

    async function fetchTours() {


      const tours = await list(search);


      if (!isUnmounted) {
        setState({
          tours: tours,
          loading: false
        })
      }
    }

    let isUnmounted = false;

    if (search.length >= minSearchChars || search.length === 0) {
      fetchTours();
    }

    return () => {

      isUnmounted = true;
    }
  }, [search, minSearchChars]);

  const handleSearch = search => setSearch(search);

  /*  ejemplo para buscar por fecha o otra cosa
    useEffect(() => {
  
      async function fetchGuides() {
  
        const guides = await guidesService.list(null, languages);
        if (!isUnmounted) {
          setState({
            guides: guides,
            loading: false
          })
        }
      }
  
      let isUnmounted = false;
  
      if (languages.length > 0) {
        fetchGuides();
      }
  
      return () => {
  
        isUnmounted = true;
      }
    }, [languages]);*/


  const { tours, loading } = state;

  return (
    <Container>
      <Header
        size='huge'
        textAlign='center'>
        Tour List
        </Header>
        <p  className="fs-5 text-center">Here is a selection of the best tours designed by the same guides who will take you on the tour.</p>
      <Grid celled >

        <Grid.Row >
          <Grid.Column width={3} >
            <Filter className="mb-3 mt-4" onSearch={handleSearch} loading={loading} />
            <Filter className="mb-3" onSearch={handleSearch} loading={loading} />
          </Grid.Column>

          <Grid.Column width={12}>

            <div className="col mt-4">

              {tours.map(tour => (
                <div key={tour.id} >
                  <TourItem tour={tour}
                  />
                </div>
              ))}
            </div>

          </Grid.Column>

        </Grid.Row>



      </Grid>
    </Container>
  )
}

ToursList.defaultProps = {
  minSearchChars: 1
}



export default ToursList;
