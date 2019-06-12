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
import colors from "../assets/styles/colors";
import { scale } from "../utils/FontScaler";

export default class Loader extends Component {
    render() {
        return (
            <Modal visible={this.props.isLoading} transparent={true} animationType='slide' >
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{
                        backgroundColor: colors.white, borderRadius: 150,
                        flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: scale(110), width: scale(110)
                    }}>
                        {/* <View style={{ flexDirection: 'row', paddingBottom: scale(10) }}>
                            <ActivityIndicator size={30} />
                        </View> */}
                        <View style={{ flexDirection: 'row' }}>
                            <Text>
                                Please wait...
                            </Text>
                        </View>


                    </View>
                </View>
            </Modal>
        )
    }
}