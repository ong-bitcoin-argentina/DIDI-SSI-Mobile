import React, {Fragment} from 'react';
import {
	StyleSheet,
        TouchableOpacity,
        TouchableOpacityProps,
        Text,
} from 'react-native';

export interface DidiButtonProps extends TouchableOpacityProps {
        title: string
}

export default class DidiButton extends React.Component<DidiButtonProps> {
        public render() {
                return (
                        <TouchableOpacity
                                style={styles.button}
                                {...this.props}>
                                <Text style={styles.text}>
                                        {this.props.title.toUpperCase()}
                                </Text>
                        </TouchableOpacity>
                )
        }
}

const styles = StyleSheet.create({
	button: {
		flexDirection: 'row',
		justifyContent: 'center',
                alignItems: 'center',
                height: 56,
                width: '80%',
                marginHorizontal: 5,
                marginVertical: 5,
                borderRadius: 5,
                backgroundColor: '#999',
        },
        text: {
                textAlign: 'center',
                color: '#FFF'
        }
});