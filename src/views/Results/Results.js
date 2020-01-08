import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import TablePoll from "components/TablePoll/TablePollResults"
import ResultsCard from "components/ResultsCard/ResultsCard.js"
const axios = require('axios');

function createData(name, desc, startDate, endDate, pollId) {
  // const density = population / size;
  return { name, desc, startDate, endDate, pollId };
}
const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(styles);

function useFetch(url) {
  const [loading, setLoading] = React.useState(true)
  const [data, setData] = React.useState(null)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    setLoading(true)
    const cnp = localStorage.getItem("cnp");


    axios.get(url, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'x-user-cnp': cnp
      },
      withCredentials: true
    })
      .then(function (response) {
        console.log("POLL LIST", response.data);
        const rows = [];
        response.data.forEach((poll, index) => {
          let cPoll = poll;
          console.log(cPoll.name, cPoll.description, cPoll.startDate, cPoll.endDate);
          rows.push(createData(cPoll.name, cPoll.description, cPoll.startDate, cPoll.endDate, cPoll.id));
        });
        setData(rows)
        setError(null)
        setLoading(false)
      })

      .catch(function (error) {
        setData([])
        setError(null)
        setLoading(false)
      })
  }, [url])

  return { loading, data, error }
}

export default function TableList() {
  const classes = useStyles();
  const { loading, data: rows, error } = useFetch(
    `https://votedatc.herokuapp.com/api/v1.0/platform/election`
  )
  const [cardState, setCardState] = useState(false);
  const [poll, setPoll] = useState({});
  const [pollResults, setPollResults] = useState({});

  async function handleRowReq(id) {
    const urlInformation = "https://votedatc.herokuapp.com/api/v1.0/platform/election/" + id;
    const urlResults = "https://votedatc.herokuapp.com/api/v1.0/platform/statistics/" + id;
    const user = localStorage.getItem("user", user);
    const cnp = user.cnp;
    let pollInformation = await axios.get(urlInformation, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'x-user-cnp': cnp
      },
      withCredentials: true
    })

    let pollResults = await axios.get(urlResults, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'x-user-cnp': cnp
        },
        withCredentials: true
      })
    
      let arrayResults =  Object.keys(pollResults.data).map(function(key) {
        return pollResults.data[key]
    });
      console.log("Poll Informations & Results::",pollInformation.data[0], "AND", arrayResults);

      setPoll(pollInformation.data[0])
      setPollResults(arrayResults)
      setCardState(true);
  }

  if (loading === true) {
    return <p>Loading</p>
  }


  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>

        {!cardState ?
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Poll List</h4>
            </CardHeader>
            <CardBody>
              <TablePoll rows={rows} handleRowReq={handleRowReq}></TablePoll>
            </CardBody>
          </Card> :
            <ResultsCard poll = {poll} pollResults = {pollResults}></ResultsCard>
        }

      </GridItem>
    </GridContainer>
  );
}
