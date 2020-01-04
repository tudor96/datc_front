import React from "react";
import { Link } from "react-router-dom"
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons

import People from "@material-ui/icons/People";
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
import axios from "axios"
import image from "assets/img/bg.jpg";
import UserProfile from "UserProfile.js"
const useStyles = makeStyles(styles);

export default function LoginPage(props) {
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
  function handleSign() {
    const cnp = document.getElementById("cnp").value;
    const url = "http://localhost:4010/api/v1.0/platform/user";

    axios.get(url, {
      params: {
        cnp: cnp
      },
      headers: {
          'Access-Control-Allow-Origin': '*',
          'x-user-cnp': cnp
      },
      withCredentials : true
    })
    .then(function (response) {
      console.log(response.data[0]);
      UserProfile.setAuth(response.data[0]);
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {
      // always executed
    }); 
    // .then( (response) => {
      // console.log("LOGIN", response);

      // 
      // if(response.isAdmin === 0){
      //   history.push("/admin/dashboard");        
      // } else {
      //   history.push("/admin/dashboard");        
      // }
    // })
    // .catch(function (error) {
    //   console.log(error);
    //   alert("Login failed!");
    // });


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
            <GridItem xs={12} sm={12} md={5}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Login</h4>


                  </CardHeader>
                  <p className={classes.divider}>Acceseaza sistemul de votare cu CNP-ul</p>
                  <CardBody>
                    <CustomInput
                      labelText="CNP..."
                      id="cnp"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Link to="/auth/register">
                      <Button simple color="primary">
                        Creaza cont nou!
                      </Button>
                    </Link>
                    <Button color="primary" onClick={handleSign}>
                      Intra in cont.
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
