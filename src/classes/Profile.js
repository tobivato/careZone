/*
 * @Name - Profile.js
 * @purpose - Profile
 * @params - NA
 *
 */
import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList,
    AsyncStorage
} from "react-native";
import Validation from "../utils/Validation.js";
import { Container, Content } from "native-base";
import colors from "../assets/styles/colors";
import errors from "../common/GlobalError";
import { scale } from "../utils/FontScaler";
import firebase from 'firebase';

const userType = {
    1: {
        role: 'carer',
        type: 1,
        title: 'Carer Profile',
        name: 'carer name',
        staffId: '123456',
        image: 'https://www.hdbfs.com/sites/default/files/testimonials_images/profile.png',
        buttons: [
            {
                title: '+ List of Clients',
                route: ''
            },
            {
                title: '+ Add Clients',
                route: 'ClientPage'
            }
        ],
        listOfClients: 3,
        displayIndex: 0
    },
    2: {
        role: 'doctor',
        type: 2,
        title: 'Doctor Profile',
        name: 'Doctor name',
        staffId: '1212121',
        image: 'https://www.hdbfs.com/sites/default/files/testimonials_images/profile.png',
        buttons: [
            {
                title: '+Find Clients',
                route: ''
            }
        ],
        listOfClients: 0,
        displayIndex: 0
    },
    3: {
        role: 'client',
        type: 3,
        title: 'Client Profile',
        name: 'Client name',
        staffId: '3434343',
        image: 'https://www.hdbfs.com/sites/default/files/testimonials_images/profile.png',
        buttons: [
            {
                title: '+Add Carer',
                route: ''
            },
            {
                title: '+Add Doctor',
                route: ''
            },
            {
                title: '+View Clients',
                route: ''
            }
        ],
        listOfClients: 0,
        displayIndex: 0
    }
}

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            clients: []
        }
        this.userData = props.navigation.getParam('userData');
        this.currentRole = userType[this.userData.role];
    }

    static navigationOptions = { header: null };

    _onLogout = () => {
        AsyncStorage.setItem("email", '');
        AsyncStorage.setItem("password", '');
        this.props.navigation.navigate('Login');
    }

    componentDidMount = () => {
        const self = this;
        firebase.database().ref('UsersList/').orderByChild("role").equalTo(this.currentRole.listOfClients).on('value', function (snapshot) {
            const data = snapshot.val();
            console.log('componentDidMount111', snapshot.val())
            if (data) {
                self.setState({
                    clients: data
                })
            }
        });
    }


    render() {
        const { navigation } = this.props;
        const { title = '', image, staffId, buttons, displayIndex } = this.currentRole;
        const { name } = this.userData;
        const { clients } = this.state;

        return (
            <Container style={styles.container}>
                <Content>
                    <View style={styles.viewContainer}>
                        <View
                            style={{
                                paddingTop: scale(50),
                                justifyContent: "center"
                            }}
                        >
                            <Text style={styles.appNameStyle}>{title}</Text>
                        </View>
                        <View style={{ borderWidth: 1, marginVertical: scale(15) }}>
                            <Image
                                style={{ height: scale(150), width: scale(150) }}
                                source={{ uri: image }} />
                        </View>
                        <View style={{ paddingTop: scale(20) }}>
                            <Text style={styles.textStyle}>Name: {name}</Text>
                        </View>
                        <View>
                            <Text style={styles.textStyle}>Staff Id: {staffId}</Text>
                        </View>
                        <FlatList
                            data={buttons}
                            extraData={Object.keys(clients).length}
                            renderItem={({ item, index }) => (
                                <View>
                                    <View key={index} style={{ flexDirection: 'row', marginVertical: scale(15) }}>
                                        <TouchableOpacity onPress={() => { navigation.navigate(item.route) }}
                                            style={{ borderRadius: 50, alignItems: 'center', backgroundColor: colors.black, padding: scale(5), width: '100%' }}>
                                            <Text style={styles.textStyle2}>{item.title}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    {
                                        (displayIndex == index)
                                            ?
                                            Object.keys(clients).map((item, key) => (
                                                <View style={{ paddingLeft: 15, flexDirection: 'row' }}>
                                                    <Text style={{fontSize: 16, color: '#000', paddingHorizontal: 15}}>Name:{' '+clients[item].name}</Text>
                                                    <Text style={{fontSize: 16, color: '#000'}}>Mobile No: {' '+clients[item].mobileNo}</Text>
                                                </View>

                                            ))
                                            : null
                                    }

                                </View>
                            )}
                        />
                    </View>
                    <View style={styles.containerChildVertical}>
                        <TouchableOpacity onPress={() => { this._onLogout() }}>
                            <View style={styles.btnView}>
                                <Text style={styles.btnTxt}>Logout</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Content>
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
        backgroundColor: colors.appBGColor,
        paddingHorizontal: scale(5)
    },
    viewContainer: {
        justifyContent: "center",
        alignItems: "center"
    },

    appNameStyle: {
        color: colors.black,
        fontSize: scale(25),
        textAlign: "center",
        fontWeight: "bold",
        fontStyle: "normal"
    },
    textStyle: {
        fontSize: scale(20), color: colors.black, fontWeight: 'bold'
    },
    textStyle2: {
        fontSize: scale(30), color: colors.white, fontWeight: 'bold'
    },
    containerChildVertical: {
        paddingVertical: 50,
        justifyContent: "center",
        alignItems: "center"
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

export default Profile;