import React from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, Image, View } from "react-native";
import { DidiText } from "../../util/DidiText";
import semillasImagesSources from './imagesSources';

export type PrestadorModel = {
    id: string;
    category: string;
    name: string;
    phone: string;
    benefit: string;
    speciality:string;
}

type PrestadorProps = {
    item: PrestadorModel;
    active: boolean;
    onPress: any;
};

function Prestador(props: PrestadorProps) {
    const { category, name, phone, benefit, speciality } = props.item;
    const { active } = props;
    const { title, description, highlight, inside, label } = styles;
    return (
        <SafeAreaView style={[styles.item, (active && highlight)]}>
            <TouchableOpacity 
                onPress={props.onPress}
                style={inside}
            >
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source={ semillasImagesSources[category] }
                    />
                </View>
                <View>
                    <DidiText.Explanation.Small style={title}>
                        {name}
                    </DidiText.Explanation.Small>
                    <DidiText.Explanation.Small style={description}>
                        {speciality}
                    </DidiText.Explanation.Small>
                    <DidiText.Explanation.Small style={description}>
                        {phone}
                    </DidiText.Explanation.Small>
                    <DidiText.Explanation.Small style={{...description, ...label}}>
                        Beneficio: {benefit}
                    </DidiText.Explanation.Small>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Prestador;

const styles = StyleSheet.create({
	title: {
        fontSize: 10, 
        fontWeight:'bold',
        marginVertical: 2
    },
    description: {
        fontSize: 10,
        marginVertical: 2
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
		height: 100,
    },
    inside: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
	highlight: {
		borderWidth: 3,
		borderColor:'#3471eb',
		borderRadius: 10
    },
    image: {
        height: 80,
        width: 80
    },
    imageContainer: {
        textAlign: 'center'
    }
});