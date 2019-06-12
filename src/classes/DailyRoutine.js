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
import { Dropdown } from 'react-native-material-dropdown';
import { TextInput } from "react-native-gesture-handler";

class DailyRoutine extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { navigation } = this.props;

        return (
            <Container style={styles.container}>
                <Content>
                    <View style={styles.viewContainer}>
                        <View style={{ flexDirection: 'row' }}>

                            <View style={{
                                justifyContent: "center",
                                alignContent: 'center'
                            }}
                            >
                                <Text style={styles.appNameStyle}>Daily Routine</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', flex: 1, }}>
                            <View style={{
                                flex: 1,
                                flexDirection: 'column',
                                justifyContent: "center",
                                alignContent: 'flex-start',

                            }}>

                                <Text style={styles.textStyle2}>Morning Duration: </Text>
                            </View>
                            <View style={{
                                flexDirection: 'column',
                                justifyContent: "center",
                                alignContent: 'flex-end',
                                flex: 1,

                            }}>
                                <Dropdown
                                    label='Select Duration'
                                    data={[{
                                        value: '1 hr',
                                    }, {
                                        value: '2 hr',
                                    }, {
                                        value: '3 hr',
                                    }]}
                                />
                            </View>
                        </View>

                        <View style={{ flex: 1, width: '100%' }}>
                            <TextInput
                                numberOfLines={5}
                                placeholder={'Description of activities.'}
                                style={{ fontSize: scale(15), borderWidth: 1, width: '100%', paddingHorizontal: scale(5) }}
                            />
                        </View>

                        <View style={{ flexDirection: 'row', flex: 1, }}>
                            <View style={{
                                flex: 1,
                                flexDirection: 'column',
                                justifyContent: "center",
                                alignContent: 'flex-start',

                            }}>

                                <Text style={styles.textStyle2}>Afternoon Duration: </Text>
                            </View>
                            <View style={{
                                flexDirection: 'column',
                                justifyContent: "center",
                                alignContent: 'flex-end',
                                flex: 1
                            }}>
                                <Dropdown
                                    label='Select Duration'
                                    data={[{
                                        value: '1 hr',
                                    }, {
                                        value: '2 hr',
                                    }, {
                                        value: '3 hr',
                                    }]}
                                />
                            </View>
                        </View>

                        <View style={{ flex: 1, width: '100%' }}>
                            <TextInput
                                numberOfLines={5}
                                placeholder={'Description of activities.'}
                                style={{ fontSize: scale(15), borderWidth: 1, width: '100%', paddingHorizontal: scale(5) }}
                            />
                        </View>
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
        paddingHorizontal: scale(15)
    },
    viewContainer: {
        paddingTop: scale(50),
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
        fontSize: scale(15), color: colors.black, fontWeight: 'bold'
    }

});

export default DailyRoutine;