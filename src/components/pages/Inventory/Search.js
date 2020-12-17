import React from "react";
import Table from "../../Table/Table"
import { Grid} from  "@material-ui/core";
// import './form.css'


const divStyle = {
  marginTop: '5rem',
  marginLeft: '16rem'
}

function Search() {
  
  return(
  <div style={divStyle}>
      <Grid container >
        <Grid item xs>
            <Table />
        </Grid>
      </Grid>
  </div>
  );
}

export default Search;
