
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
  AsyncStorage,
  AppRegistry,
  PixelRatio,
} from "react-native";
import Validation from "../utils/Validation.js";
import { Container, Content } from "native-base"
import colors from "../assets/styles/colors";
import errors from "../common/GlobalError";
import { scale } from "../utils/FontScaler";
import { RadioGroup } from 'react-native-btr';
import ImagePicker from 'react-native-image-picker';
import firebase from 'firebase';
import Loader from '../common/Loader';

const screenByRole = {
  1: {
    title: 'Profile Details(Doctor/Nurse)',
    isVisible: true
  },
  2: {
    title: 'Profile Details(Doctor/Nurse)',
    isVisible: false
  },
  3: {
    title: 'Profile Details(Clients)',
    isVisible: false
  }
}


class ProfileDetail extends Component {
  constructor(props) {
    super(props);

    /*initialise navigate */
    this.state = {
      password: "",
      confirmPassword: "",
      wallet: "",
      email: "",
      userName: "",
      age: "",
      mobileNo: "",
      ImageSource: null,
      isLoading: false,
      radioButtons: [
        {
          label: 'Male',
          value: 'MAle',
          checked: true,
          color: '#000000',
          disabled: false,
          flexDirection: 'row',
          size: 10

        },

        {
          label: 'Female',
          value: 'Femal',
          checked: false,
          color: '#000000',
          disabled: false,
          flexDirection: 'row',
          size: 10

        }
      ]
    };

    this.userData = props.navigation.getParam('userData');
    this.currentRole = screenByRole[this.userData.selectedRole[0].value];
  }

  hadleMobileNo = text => {
    this.setState({ mobileNo: text });
  };

  hadleEmailAddress = text => {
    this.setState({ email: text });
  };

  hadleAge = text => {
    this.setState({ age: text });
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

  onPressSignUp() {
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

    }
  }

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({

          ImageSource: source

        });
      }
    });
  }

  _createProfile = async () => {
    const { email, userName, selectedRole, password } = this.userData;
    const { age, mobileNo } = this.state;
    this.setState({
      isLoading: true
    });
    const data = {
      email,
      name: userName,
      password,
      role: selectedRole[0].value,
      age,
      gender: 'male',
      address: 'asasas',
      mobileNo
    };

    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      await firebase.database().ref('UsersList').push(data);
      this.props.navigation.navigate('Profile', { userData: data });
      this.setState({
        isLoading: false
      });
    } catch (error) {
      console.log('error', error)
      this.setState({
        isLoading: false
      });
    }
  }


  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <View style={styles.viewContainer}>
            <View
              style={{
                height: scale(100),
                justifyContent: "center"
              }}
            >
              <Text style={styles.appNameStyle}>{this.currentRole.title}</Text>
            </View>


            <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
              <View style={styles.ImageContainer}>
                {this.state.ImageSource === null ? <Text>Select a Photo</Text> :
                  <Image style={styles.ImageContainer} source={this.state.ImageSource} />
                }
              </View>
            </TouchableOpacity>


            <View style={styles.textInputMainContaintView}>
              {
                this.currentRole.isVisible
                  ?
                  <View style={styles.TextInputViewStyle}>
                    <TextInput
                      onChangeText={this.hadleAge}
                      style={styles.textinputStyle}
                      value={this.state.age}
                      placeholder="Age"
                      autoCapitalize={"none"}
                    />
                  </View>
                  : null
              }

              <View
                style={{
                  borderBottomColor: "black",
                  borderBottomWidth: 1
                }}
              />

              <TextInput style={styles.inputStyle}
                underlineColorAndroid="transparent"
                placeholder="Address"
                // placeholderTextColor="#CCD1D1"
                autoCapitalize="none"
                onChangeText={this.handleEmail}
                autofocus="true"
                returnKeyType="next"
              />


              <View style={styles.TextInputViewStyle}>
                <TextInput
                  onChangeText={this.hadleMobileNo}
                  style={styles.textinputStyle}
                  value={this.state.mobileNo}
                  placeholder="Mobile Number"
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
                <TouchableOpacity onPress={() => { this._createProfile() }}>
                  <View style={styles.btnView}>
                    <Text style={styles.btnTxt}>Create Profile</Text>
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
  ImageContainer: {
    borderRadius: 80,
    width: 150,
    height: 150,
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,

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
    paddingLeft: 10,
    fontSize: scale(15),
    color: colors.black
  },
  inputStyle: {
    height: 100,
    borderColor: colors.black,
    borderWidth: 1,
    fontSize: 18,
    paddingLeft: 10,
    marginTop: 10

  },
  btnView: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: scale(50),
    // height: 40,
    paddingVertical: scale(5),
    borderRadius: 5
  },


  containerChildVertical: {
    paddingTop: 20,
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
export default ProfileDetail;