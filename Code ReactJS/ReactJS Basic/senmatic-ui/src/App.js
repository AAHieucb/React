import Routes from "./router.js"
import TodoList from './transition4.js';
import React, { useState, useEffect } from 'react';
import { Pagination, Container, Grid, Input, Segment } from 'semantic-ui-react';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';
import PaginationExamplePagination from "./Pagination.js"
import TypeOf from "./TypeOf.js";

const App = () => {
  const [data, setData] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [apiUrl, setApiUrl] = useState('https://api.instantwebtools.net/v1/passenger?page=0&size=5');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  	axios.get(apiUrl).then(response => {
      setData(response.data.data)
      console.log(data)
      setLoading(false);
    });
  }, [apiUrl]);
  
  const onChange = (e, pageInfo) => {
    console.log(e);
    console.log(pageInfo);
    setLoading(true);
    if(e.type === "click"){
  	  setActivePage(pageInfo.activePage);
    }else if(e.type === "change"){
      setActivePage(e.target.value)
    }
    setApiUrl('https://api.instantwebtools.net/v1/passenger?page=' + activePage.toString() + "&size=5");
  };
  var display = data.map((item, index) => {
    return(
      <li key={index}>
        <div>Name: {item.name}</div>
        <div>Number of trips: {item.trips}</div>
        <div>Id: {item._id}</div>
        <br></br>
      </li>
    )
  })
  return (
    <Container>
      <Routes/>
      <TodoList></TodoList>
      <div style={{height: "10px"}}></div>
      <PaginationExamplePagination/>
      <div style={{height: "10px"}}></div>
      <ul>
        {display}
      </ul>
      <Grid columns={2} verticalAlign='middle'>
        <Grid.Column>
          <Segment secondary>
            <div>activePage: {activePage}</div>
            <Input
              min={1}
              max={10}
              onChange={onChange}
              type='range'
              value={activePage}
            />
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Pagination 
            disabled={loading}
            activePage={activePage}
            onPageChange={onChange}
            totalPages={10}
            ellipsisItem={null}
          />
        </Grid.Column>
      </Grid>
      <TypeOf></TypeOf>
    </Container>
  );
};

export default App;