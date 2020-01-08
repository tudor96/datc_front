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
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import VoteCard from "components/VoteCard/VoteCard";

const axios = require('axios');

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
    },
    formControl: {
        margin: "10px",
        minWidth: 200,
    },
    selectEmpty: {
        marginTop: "10px",
    },
};

const useStyles = makeStyles(styles);

export default function Vote() {

    const classes = useStyles();
    const [poll, setPoll] = React.useState('');
    const [elections, setElections] = React.useState([]);
    const [pollId, setPollId] = React.useState('');
    const [profile, setProfile] = React.useState('');
    const inputLabel = React.useRef(null);
    
    React.useEffect(() => {
        // setLabelWidth(inputLabel.current.offsetWidth);
        let url =  "https://votedatc.herokuapp.com/api/v1.0/platform/election"
        const cnp = localStorage.getItem("cnp");


        axios.get(url, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'x-user-cnp': cnp
          },
          withCredentials: true
        })
          .then(function (response) {
              console.log("PARTIDE", response);
            setElections(response.data);
          })
          .catch(function (error) {
            setElections([]);
          })

          
          url = "https://votedatc.herokuapp.com/api/v1.0/platform/user";
          axios.get(url, {
            params: {
              cnp: cnp
            },
            headers: {
                'x-user-cnp': cnp
            }
          })
          .then(function (response) {
              console.log(response.data[0]);
            setProfile(response.data[0])
          })
          .catch(function (error) {
            console.log(error);
          })
          
    }, []);

    const handleChange = (event) => {
        // setPoll(event.target.value.name);
        setPoll(event.target.value);
        console.log(elections[event.target.value], event.target.value)
        setPollId(elections[event.target.value].id);
    };


    if (elections.length === 0 || profile === '' || profile ===  undefined)
        return (
            <div>
                Loading...
        </div>
        )

    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={8}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>Evenimente de votare active</h4>
                        </CardHeader>
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={6}> Selecteaza evenimentul de votare</GridItem>
                                <GridItem xs={12} sm={12} md={6}>
                                    <FormControl variant="outlined" className={classes.formControl}>
                                        <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
                                            Eveniment
                                        </InputLabel>
                                        <Select
                                            labelid="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            value={poll}
                                            onChange={event => handleChange(event)}
                                            
                                        >
                                            {elections.map((p, index) => (
                                                <MenuItem key={index} value={index}>{p.name} -- {p.description}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </GridItem>

                             <VoteCard pollId = {pollId}></VoteCard>
                                {/* {question.option.map(option => {
                    <h6 className={classes.cardTitle}>{option.name}</h6>
                    })} */}


                                {/* {props.poll.questions.map(question => (
                  <GridItem xs={12} sm={12} md={5}>
                    <h3 className={classes.cardCategory}>{question.name}</h3>
                    {question.options.map(option => (
                      <h6 className={classes.cardTitle}>{option.name}</h6>
                    ))}
                  </GridItem>
                ))} */}

                            </GridContainer>
                        </CardBody>
                        <CardFooter>
                            {/* <Button color="primary"></Button> */}
                        </CardFooter>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                    <Card >
                        <CardBody >
                            <h3 className={classes.cardCategory}>Nume: {profile.firstname} {profile.lastname}</h3>
                            <p className={classes.description}>Email: {profile.email}  </p>
                            <p className={classes.description}>Adresa: {profile.adresa}  </p>
                            <p className={classes.description}>-- Va rugam sa va verificati mailul pentru codul de vot inainte de a vota -- </p>
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    );
}

