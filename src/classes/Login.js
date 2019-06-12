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
    Modal,
    ActivityIndicator
} from "react-native";
import Validation from "../utils/Validation.js";
import { Container, Content } from "native-base";
import colors from "../assets/styles/colors";
import errors from "../common/GlobalError";
import { scale } from "../utils/FontScaler";
import { RadioGroup } from 'react-native-btr';
import firebase from 'firebase';
import Loader from '../common/Loader';

class Login extends Component {
    constructor(props) {
        super(props);

        /*initialise navigate */
        navigate = this.props.navigation.navigate;
        this.state = {
            password: "",
            email: "",
            userName: "",
            radioButtons: [
                {
                    label: 'Nurse',
                    value: 'Nurse',
                    checked: true,
                    color: '#000000',
                    disabled: false,
                    flexDirection: 'row',
                    size: 10

                },

                {
                    label: 'Doctor',
                    value: 'Doctor',
                    checked: false,
                    color: '#000000',
                    disabled: false,
                    flexDirection: 'row',
                    size: 10

                },

                {
                    label: 'Client',
                    value: 'Client',
                    checked: false,
                    color: '#000000',
                    disabled: false,
                    flexDirection: 'row',
                    size: 10

                }

            ],
            isLoading: false
        };
    }

    //no toolbar
    static navigationOptions = { header: null };

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

    onPressSignUp = async () => {
        const { navigation } = this.props;
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
        if (sucess == true) {
            const { email, password } = this.state;
            try {
                this.setState({
                    isLoading: true
                })
                const user = await firebase.auth().signInWithEmailAndPassword(email, password)
                console.warn(user);
                this.setState({
                    isLoading: false
                })
                
                firebase.database().ref('UsersList/').orderByChild("email").equalTo(email).on('value', function (snapshot) {
                    const data = snapshot.val();
                    console.log('componentDidMount111', snapshot.val())
                    if(data) {
                        console.log('data[Object.keys(data)[0]]', data[Object.keys(data)[0]])
                        navigation.navigate('Profile', { userData: data[Object.keys(data)[0]] });
                    }
                });
            } catch (error) {
                this.setState({
                    isLoading: false
                })
                console.log(error.toString(error));
            }
            AsyncStorage.setItem("email", email);
            AsyncStorage.setItem("password", password);
        }
    }

    /*
     * @Name - onPressDashboard()
     * @purpose - function that redirects to next signup step 2 screen
     * @params - NA
     *
     */

    onPressDashboard() {
        if (this.checkValidation()) {
            this.props.navigation.navigate("SignUpStep2");
        }
    }

    render() {
        const { navigation } = this.props;

        return (
            <Container style={styles.container}>
                <Content>
                    <View style={styles.viewContainer}>
                        <View
                            style={{
                                height: scale(40),
                                paddingTop: scale(100),
                                justifyContent: "center"
                            }}
                        >
                            <Text style={styles.appNameStyle}>CARE ZONE</Text>
                        </View>
                        <View style={styles.textInputMainContaintView}>
                            <View
                                style={{
                                    paddingTop: scale(100),
                                }}
                            />

                            <View style={styles.TextInputViewStyle}>
                                <TextInput
                                    onChangeText={this.hadleEmailAddress}
                                    style={styles.textinputStyle}
                                    value={this.state.email}
                                    placeholder="Username/Email Address"
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
                            <View
                                style={{
                                    borderBottomColor: "black",
                                    borderBottomWidth: 1
                                }}
                            />
                            <View style={styles.containerChildVertical}>
                                <TouchableOpacity onPress={() => { this.onPressSignUp() }}>
                                    <View style={styles.btnView}>
                                        <Text style={styles.btnTxt}>Login</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.containerChildVertical2}>
                                <TouchableOpacity onPress={() => { navigation.navigate('SignUp') }}>
                                    <View style={styles.btnView2}>
                                        <Text style={styles.btnTxt2}>Don't have account?</Text>
                                        <Text style={styles.btnTxt2}>Register</Text>
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
        paddingLeft: 10,
        fontSize: scale(15)
    },

    btnView: {
        backgroundColor: "#FFFFFF",
        width: 200,
        height: 40,
        borderRadius: 5
    },

    btnView2: {
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
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
    containerChildVertical2: {
        paddingTop: scale(40),
        justifyContent: "center",
        alignItems: "center"
    },
    appNameStyle: {
        color: colors.black,
        fontSize: scale(40),
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
    btnTxt2: {
        color: 'blue',
        textAlign: 'center',
        fontSize: scale(17),
        borderBottomWidth: 1,
        borderBottomColor: 'blue'
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
export default Login;