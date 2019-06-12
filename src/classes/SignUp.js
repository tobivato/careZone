/*
 * @Name - SignUp.js
 * @purpose - SignUp component to register new user
 * @params - NA
 *
 */
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import Validation from "../utils/Validation.js";
import { Container, Content } from "native-base";
import colors from "../assets/styles/colors";
import errors from "../common/GlobalError";
import { scale } from "../utils/FontScaler";
import { RadioGroup } from 'react-native-btr';
import { roles } from '../common/Globals';
import Loader from '../common/Loader';

class SignUp extends Component {
  constructor(props) {
    super(props);

    /*initialise navigate */
    navigate = this.props.navigation.navigate;
    this.state = {
      password: "",
      email: "",
      userName: "",
      selectedRole: roles.nurse,
      isLoading: false,
      radioButtons: [
        {
          label: 'Nurse',
          value: roles.nurse,
          checked: true,
          color: '#000000',
          disabled: false,
          flexDirection: 'row',
          size: 10

        },

        {
          label: 'Doctor',
          value: roles.doctor,
          checked: false,
          color: '#000000',
          disabled: false,
          flexDirection: 'row',
          size: 10

        },

        {
          label: 'Client',
          value: roles.client,
          checked: false,
          color: '#000000',
          disabled: false,
          flexDirection: 'row',
          size: 10

        }

      ]
    };
  }

  //no toolbar
  // static navigationOptions = { header: null };




  hadleEmailAddress = text => {
    this.setState({ email: text });
  };
  hadleUserName = text => {
    this.setState({ userName: text });
  };

  handlePassword = text => {
    this.setState({ password: text });
  };
  handleConfirmPassword = text => {
    this.setState({ confirmPassword: text });
  };

  /**
   * Commonn validations for all the input text used in this screen
   * this function will check
   * input value from state
   * as an argument
   */

  checkValidation() {
    if (
      Validation.isEmpty(this.state.privateKey) &&
      Validation.isEmpty(this.state.walletAddress)
    ) {
      alert("please generate passKey and walletAddress");
      return false;
    }
    return true;
  }

  onPressSignUp = () => {
    var sucess = true;
    let emailAddress = this.state.email == null ? "" : this.state.email.trim();
    let password =
      this.state.password == null ? "" : this.state.password.trim();
    let confirmPassword =
      this.state.confirmPassword == null
        ? ""
        : this.state.confirmPassword.trim();

    if (Validation.isEmpty(emailAddress)) {
      alert(errors.emailAddressEmpty);
      sucess = false;
      return;
    }
    if (Validation.isEmailValid(emailAddress) == false) {
      alert(errors.validEmailAddress);
      sucess = false;
      return;
    }
    if (Validation.isEmpty(password)) {
      alert(errors.passwordEmpty);
      sucess = false;
      return;
    }
    if (password.length < 4) {
      alert(errors.passwordLength);
      sucess = false;
      return;
    }
    if (Validation.isEmpty(confirmPassword)) {
      alert(errors.confirmPasswordEmpty);
      sucess = false;
      return;
    }
    if (password !== confirmPassword) {
      alert(errors.passwordMatched);
      sucess = false;
      return;
    }
    if (sucess == true) {
      AsyncStorage.setItem("email", this.state.email);
      AsyncStorage.setItem("password", this.state.password);
      const { password, email, userName, radioButtons } = this.state;
      console.log('radioButtons', radioButtons.filter((item) => item.checked));

      this.props.navigation.navigate('ProfileDetails', { userData: { selectedRole:radioButtons.filter((item) => item.checked), password, email, userName } })

    }
  }

  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <View style={styles.viewContainer}>
            <View
              style={{
                height: scale(40),
                justifyContent: "center"
              }}
            >
              <Text style={styles.appNameStyle}>Register User</Text>
            </View>
            <View style={styles.textInputMainContaintView}>
              <View style={styles.TextInputViewStyle}>
                <TextInput
                  onChangeText={this.hadleUserName}
                  style={styles.textinputStyle}
                  value={this.state.userName}
                  placeholder="Name"
                  autoCapitalize={"none"}
                />
              </View>
              <View
                style={{
                  borderBottomColor: "black",
                  borderBottomWidth: 1
                }}
              />

              <View style={styles.TextInputViewStyle}>
                <TextInput
                  onChangeText={this.hadleEmailAddress}
                  style={styles.textinputStyle}
                  value={this.state.email}
                  placeholder="Email Address"
                  autoCapitalize={"none"}
                  keyboardType="email-address"
                />
              </View>
              <View
                style={{
                  borderBottomColor: "black",
                  borderBottomWidth: 1
                }}
              />
              <View style={styles.TextInputViewStyle}>
                <TextInput
                  onChangeText={this.handlePassword}
                  secureTextEntry={true}
                  style={styles.textinputStyle}
                  value={this.state.password}
                  placeholder="Password"
                />
              </View>
              <View
                style={{
                  borderBottomColor: "black",
                  borderBottomWidth: 1
                }}
              />
              <View style={styles.TextInputViewStyle}>
                <TextInput
                  onChangeText={this.handleConfirmPassword}
                  secureTextEntry={true}
                  style={styles.textinputStyle}
                  value={this.state.confirmPassword}
                  placeholder="Confirm Password"
                />
              </View>
              <View
                style={{
                  borderBottomColor: "black",
                  borderBottomWidth: 1
                }}
              />


              <RadioGroup
                color='#0277BD'
                labelStyle={{ fontSize: 14, }}
                radioButtons={this.state.radioButtons}
                style={{ paddingTop: 20 }}
              />


              <View style={styles.containerChildVertical}>
                <TouchableOpacity onPress={() => this.onPressSignUp()}>
                  <View style={styles.btnView}>
                    <Text style={styles.btnTxt}>Next</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Content>
        <Loader isLoading={this.state.isLoading} />
      </Container>
    );
  }
}

/*
 * @purpose - Common  style
 * @params - NA
 */
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.appBGColor
  },
  viewContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  textInputMainContaintView: {
    flex: 1,
    width: "100%",
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 30,
    backgroundColor: "transparent"
  },
  TextInputViewStyle: {
    height: scale(40),
    marginTop: scale(10),
    marginLeft: scale(10),
    marginRight: scale(10),
    marginBottom: scale(5),
    textAlign: "left",
    backgroundColor: "transparent",
    justifyContent: "space-around"
  },
  textinputStyle: {
    paddingLeft: 10
  },

  btnView: {
    backgroundColor: "#FFFFFF",
    width: 200,
    height: 40,
    borderRadius: 5
  },

  btnTxt: {
    color: "#33A5AD",
    textAlign: "center",
    marginTop: 8,
    fontSize: 16,
    fontWeight: "600",
    fontStyle: "italic"
  },
  containerChildVertical: {
    paddingTop: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  appNameStyle: {
    color: colors.black,
    fontSize: 26,
    textAlign: "center",
    fontWeight: "bold",
    fontStyle: "normal"
  },
  btnView: {
    backgroundColor: colors.lightGray,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: scale(100)
  },
  btnTxt: {
    color: colors.black,
    textAlign: 'center',
    fontSize: scale(17),
    // fontStyle: 'italic',
    // fontWeight: 'bold', 
  },
});

/*
 * @purpose -  Common InputText style
 * @params -
 * width - screen width in percantage outof 100%
 */
inputTextStyleCommonAccount = function (width) {
  return {
    backgroundColor: "#FFFFFF",
    width: width,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "row",
    borderColor: "#000000",
    borderWidth: 1,
    paddingStart: 5,
    fontSize: 16
  };
};
export default SignUp;