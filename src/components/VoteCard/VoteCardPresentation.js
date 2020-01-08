import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import moment from 'moment'
import avatar from "assets/img/faces/marc.jpg";
import axios from "axios";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

export default function VoteCardPresentation(props) {
  
  const classes = useStyles();

  function registerVoteHandler() {
    console.log("PROPS", props);
    if (props.poll.id !== undefined && props.poll.id !== null && props.poll.id !== '') {
      const url = "https://votedatc.herokuapp.com/api/v1.0/platform/user/signUp"
      const cnp = localStorage.getItem("cnp");


      axios.post(url, {
        "pollId": props.poll.id,

    }, {
        headers: {
            'x-user-cnp': cnp,
        },
        withCredentials: true
    })
        .then(function (response) {

            alert("Mailul cu codul de inregistrare s-a trimis!");
        })
        .catch(function (error) {
            console.log(error);
            alert("EROARE LA INREGISTRARE INCERCATI DIN NOU");
        });
    } else {
      alert("EROARE LA INREGISTRARE INCERCATI DIN NOU");
    }
  }
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Poll Questions and Options</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>

                {/* {question.option.map(option => {
                    <h6 className={classes.cardTitle}>{option.name}</h6>
                    })} */}


                {props.poll.questions.map(question => (
                  <GridItem xs={12} sm={12} md={5}>
                    <h3 className={classes.cardCategory}>{question.name}</h3>
                    {question.options.map(option => (
                      <h6 className={classes.cardTitle}>{option.name}</h6>
                    ))}
                  </GridItem>
                ))}

              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={registerVoteHandler}>Register for this poll</Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardBody profile>
              <h3 className={classes.cardCategory}>{props.poll.name}</h3>
              <h6 className={classes.cardTitle}>Data de inceput: {moment(props.poll.startDate).format('MMMM Do YYYY, h:mm:ss a')}</h6>
              <h6 className={classes.cardTitle}>Data de sfarsit: {moment(props.poll.endDate).format('MMMM Do YYYY, h:mm:ss a')}</h6>

              <p className={classes.description}>{props.poll.description} </p>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

