import React, {useState} from "react";
import { Link } from "react-router-dom"
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import axios from "axios";
// @material-ui/icons

import People from "@material-ui/icons/People";
import Email from "@material-ui/icons/Email";
import Icon from "@material-ui/core/Icon";


// core components
import Header from "components/Header/Header.js";
// import HeaderLinks from "components/Header/HeaderLinks.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import MenuItem from '@material-ui/core/MenuItem';
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import history from '../history';
import image from "assets/img/bg.jpg";
import UserProfile from "UserProfile.js"
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles(styles);

export default function RegisterPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [judete, setJudete] = useState('');
  const [judet, setJudet] = useState('');
  const [sex, setSex] = useState('');


  React.useEffect(() => {
    const url = "https://votedatc.herokuapp.com/api/v1.0/platform/election/regions"
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
        setJudete(response.data);
      })
      .catch(function (error) {
      })
  }, []);

  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();

  function authenticationHandler() {

    const url = `https://votedatc.herokuapp.com/api/v1.0/platform/user`;

    axios.post(url, {
      "firstname": document.getElementById("firstname").value,
      "lastname": document.getElementById("firstname").value+ "."+document.getElementById("lastname").value,
      "username": document.getElementById("lastname").value,
      "email": document.getElementById("email").value,
      "cnp": document.getElementById("cnp").value,
      "adresa": document.getElementById("adresa").value ,
      "judet": judete[judet].id ,
      "sex":  sex,


    })
      .then(function (response) {
        console.log(response.data[0]);
        UserProfile.setAuth(response.data[0]);
        alert("Registration made!");
      })
      .catch(function (error) {
        console.log(error);
        alert("Registration failed!");
      });
  }

  function handleChangeJudet(event){
    setJudet(event.target.value);
  }

  function handleChangeSex(event){
    setSex(event.target.value);
  }

  if (judete.length === 0)
    return (
      <div>
        Loading...
      </div>
    )

  return (

    <div>
      <Header
        absolute
        color="transparent"
        brand="Online Voting System"
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center" >
            <GridItem xs={12} sm={12} md={8}>
              <Card className={classes[cardAnimaton]}>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Register</h4>
                  <p className={classes.cardCategoryWhite}>Inregistreaza-te pentru a accesa platforma de votare online.</p>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Nume"
                        id="firstname"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          disabled: false
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Prenume"
                        id="lastname"
                        formControlProps={{
                          fullWidth: true
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Adresa de email"
                        id="email"
                        formControlProps={{
                          fullWidth: true
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="CNP"
                        id="cnp"
                        formControlProps={{
                          fullWidth: true
                        }}
                      />
                    </GridItem>

                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Adresa"
                        id="adresa"
                        formControlProps={{
                          fullWidth: true
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <FormControl className={classes.formControl}>
                        <InputLabel id={"selectLabel"}>Judet</InputLabel>
                        <Select
                          id={"select"}
                          value={judet}
                          onChange={event => handleChangeJudet(event)}
                        >
                          {judete.map((p, index) => (
                            <MenuItem value={index}>{p.name}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <FormControl className={classes.formControl}>
                        <InputLabel id={"sexLabel"}>Sex</InputLabel>
                        <Select
                          id={"selectsex"}
                          value={sex}
                          onChange={event => handleChangeSex(event)}
                        >
                          
                            <MenuItem value={"masculin"}>Masculin</MenuItem>
                            <MenuItem value={"feminin"}>Feminin</MenuItem>
                            <MenuItem value={"altele"}>Altele</MenuItem>
                          
                        </Select>
                      </FormControl>
                    </GridItem>
                  </GridContainer>
                </CardBody>
                <CardFooter>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <Link to="/auth/login">
                        <Button simple color="primary">Am deja cont!</Button>
                      </Link>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <Button color="primary" onClick={authenticationHandler}>Inregistrare.</Button>
                    </GridItem>
                  </GridContainer>
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}












