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
    FlatList
} from "react-native";
import Validation from "../utils/Validation.js";
import { Container, Content } from "native-base";
import colors from "../assets/styles/colors";
import errors from "../common/GlobalError";
import { scale } from "../utils/FontScaler";
import { RadioGroup } from 'react-native-btr';

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
                title: 'Daily Routine',
                route: 'DailyRoutine'
            },
            {
                title: 'Medication',
                route: 'ClientPage'
            },
            {
                title: 'Reports',
                route: 'ClientPage'
            },
            {
                title: 'Nutrition',
                route: 'ClientPage'
            },
            {
                title: 'Likes & Dislike',
                route: 'ClientPage'
            }
        ]
    },
}

class ClientPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { navigation } = this.props;
        const { title, image, name, staffId, buttons } = userType[1];

        return (
            <Container style={styles.container}>
                <Content>
                    <View style={styles.viewContainer}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ justifyContent: 'center', alignItems: 'center', borderWidth: 1, marginVertical: scale(15), marginHorizontal: scale(10) }}>
                                <Image
                                    style={{ height: scale(100), width: scale(100) }}
                                    source={{ uri: image }} />
                            </View>
                            <View style={{
                                justifyContent: "center",
                                alignContent: 'center'
                            }}
                            >
                                <Text style={styles.appNameStyle}>Client Page</Text>
                            </View>
                        </View>

                        <FlatList
                            data={buttons}
                            horizontal={false}
                            numColumns={2}
                            renderItem={({ item, index }) => (
                                <View key={index} style={{ flexDirection: 'row', marginVertical: scale(15), marginHorizontal: scale(5) }}>
                                    <TouchableOpacity onPress={() => { navigation.navigate(item.route) }}
                                        style={{ borderRadius: 50, backgroundColor: colors.black, }}>
                                        <Text style={styles.textStyle2}>{item.title}</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        />
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
        paddingTop: scale(100),
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
        fontSize: scale(20), color: colors.white, fontWeight: 'bold', padding: scale(15),
    }

});

export default ClientPage;