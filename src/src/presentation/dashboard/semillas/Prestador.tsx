import React from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import { DidiText } from "../../util/DidiText";

export type PrestadorModel = {
    id: string;
    category: string;
    name: string;
    phone: string;
    benefit: string;
}

type PrestadorProps = {
    item: PrestadorModel;
    active: boolean;
    onPress: any;
};

function Prestador(props: PrestadorProps) {
    const { category, name, phone, benefit } = props.item;
    const { active } = props;
    const { title, description, highlight, inside, label } = styles;
    return (
        <SafeAreaView style={[styles.item, (active && highlight)]}>
            <TouchableOpacity 
                onPress={props.onPress}
                style={inside}
            >
                <DidiText.Explanation.Small style={title}>
                    Icono / Imagen
                </DidiText.Explanation.Small>
                <DidiText.Explanation.Small style={title}>
                    {name}
                </DidiText.Explanation.Small>
                <DidiText.Explanation.Small style={description}>
                    {category}
                </DidiText.Explanation.Small>
                <DidiText.Explanation.Small style={description}>
                    {phone}
                </DidiText.Explanation.Small>
                <DidiText.Explanation.Small style={{...description, ...label}}>
                    Beneficio: {benefit}
                </DidiText.Explanation.Small>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Prestador;

const styles = StyleSheet.create({
	title: {
        fontSize: 10, 
        fontWeight:'bold'
    },
    description: {
        fontSize: 10
	},
	label: {
        paddingVertical: 1,
        paddingHorizontal: 5,
		backgroundColor: '#f5476b',
		color: 'white'
	},
	item: {
        flex: 1, 
        margin: 1,
		borderRadius:8, 
		borderColor:'#f0f0f0',
		borderWidth:1,
		height: 120,
    },
    inside: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
	highlight: {
		borderWidth: 3,
		borderColor:'#3471eb',
		borderRadius: 10
	}
});