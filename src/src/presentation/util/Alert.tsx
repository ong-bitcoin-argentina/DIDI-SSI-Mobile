import React from 'react';
import { View, StyleSheet } from "react-native";
import { DidiText } from "./DidiText";

type AlertProps = {
    text: string;
    type?:string;
    closable?: boolean;
    style?: object;
    textStyle?: object;
};

const colors:any = {
    warning: '#ebc934',
    error: '#d41313',
    success: 'green',
    info: '#1f5fad'
};

function Alert(props: AlertProps) {
    const type = props.type ?? 'info';
    const { style, text, textStyle } = props;
    const { alert, localTextStyle } = styles;
    const color = colors[type];
    return (
        <View style={[ alert, {borderColor:color}, style]}>
            <DidiText.Explanation.Small style={[{color}, localTextStyle, textStyle]}>
                { text }
            </DidiText.Explanation.Small>
        </View>
    )
}

export default Alert;

const styles = StyleSheet.create({
    alert: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderWidth: 2,
        borderRadius: 4,
        marginVertical: 5,
        marginHorizontal: 10
    },
    localTextStyle: {
        textAlignVertical: 'center'
    }
});