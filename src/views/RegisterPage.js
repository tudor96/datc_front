import React from "react";
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

import styles from "assets/jss/material-kit-react/views/loginPage.js";
import history from '../history';
import image from "assets/img/bg.jpg";
import UserProfile from "UserProfile.js"
axios.defaults.withCredentials = true;

const useStyles = makeStyles(styles);

export default function RegisterPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  // const history = useHistory();

  // function handleClick() {
  //   history.push("/auth/register");
  // }
  // const { ...rest } = props;

  function authenticationHandler() {

    const url = `http://localhost:4010/api/v1.0/platform/user`;

    axios.post(url, {
      "firstname": document.getElementById("name").value,
      "lastname": document.getElementById("surname").value,
      "email": document.getElementById("email").value,
      "cnp": document.getElementById("cnp").value,
      "adresa": document.getElementById("oras").value + document.getElementById("judet").value,
    }, {
      headers: {
          'Access-Control-Allow-Origin': '*',
      },
      withCredentials : true
    })
    .then(function (response) {
      UserProfile.setAuth(response);
      if(response.isAdmin === 0){
        history.push("/admin");        
      } else {
        history.push("/admin");        
      }
      alert("Registration made!");
    })
    .catch(function (error) {
      console.log(error);
      alert("Registration failed!");
    });


  }


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
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={8}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Register</h4>
                  <p className={classes.cardCategoryWhite}>Inregistreaza-te pentru a accesa platforma de votare online.</p>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={5}>
                      <CustomInput
                        labelText="Nume"
                        id="name"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          disabled: false
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        labelText="Prenume"
                        id="surname"
                        formControlProps={{
                          fullWidth: true
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
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
                    {/* <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Last Name"
                        id="last-name"
                        formControlProps={{
                          fullWidth: true
                        }}
                      />
                    </GridItem> */}
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="Oras"
                        id="oras"
                        formControlProps={{
                          fullWidth: true
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="Judet"
                        id="judet"
                        formControlProps={{
                          fullWidth: true
                        }}
                      />
                    </GridItem>
                    {/* <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="Postal Code"
                        id="postal-code"
                        formControlProps={{
                          fullWidth: true
                        }}
                      />
                    </GridItem> */}
                  </GridContainer>
                  {/* <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <InputLabel style={{ color: "#AAAAAA" }}>About me</InputLabel>
                      <CustomInput
                        labelText="Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo."
                        id="about-me"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          multiline: true,
                          rows: 5
                        }}
                      />
                    </GridItem>
                  </GridContainer> */}
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












