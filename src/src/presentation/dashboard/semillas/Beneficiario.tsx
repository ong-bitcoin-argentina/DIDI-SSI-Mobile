import React, { Fragment, Component } from 'react';
import { View, StyleSheet } from "react-native";
import { DidiText } from "../../util/DidiText";
import { SemillasIdentityModel } from '../../../model/SemillasIdentity';
import { SpecialCredentialMap } from '../../../store/selector/credentialSelector';
import { didiConnect } from '../../../store/store';
import { getPhoneNumber, getEmail } from '../../../util/specialCredentialsHelpers';
import strings from '../../resources/strings';
import { ScrollView } from 'react-native-gesture-handler';
import colors from '../../resources/colors';

type BeneficiarioGlobalProps = {
    activeSpecialCredentials:SpecialCredentialMap;
}

type BeneficiarioInternalProps = {
    item:SemillasIdentityModel;
};

type BeneficiarioProps = BeneficiarioGlobalProps & BeneficiarioInternalProps;

type BeneficiarioState = {
    keysList:any[];
    phoneNumber:string;
    email:string;
};

const blacklist = [
    "NOMBRE",
    "APELLIDO",
    "Dni Titular",
    "Nombre Titular",
    "Relacion con Titular",
    "Genero"
]
class Beneficiario extends Component<BeneficiarioProps, BeneficiarioState> {

    constructor(props:BeneficiarioProps) {
        super(props);
        const keysList = Object.keys(this.props.item).filter(key => !blacklist.includes(key))
        this.state = {
            keysList,
            phoneNumber: getPhoneNumber(this.props.activeSpecialCredentials),
            email: getEmail(this.props.activeSpecialCredentials)
        }
    };

    render() {
        const { item } = this.props;
        const { keysList, phoneNumber, email } = this.state;
        return (
            <ScrollView>

                <View style={{ paddingVertical:10 }}>
                    {
                        keysList.map(key => (
                            <View key={key}>
                                <DidiText.Explanation.Small style={styles.key}>
                                    {key}
                                </DidiText.Explanation.Small>
                                <DidiText.Explanation.Small style={styles.value}>
                                    {item[key]}
                                </DidiText.Explanation.Small>
                            </View>
                        ))
                    }
                    <View>
                        <DidiText.Explanation.Small style={styles.key}>
                            {strings.specialCredentials.EmailData.title}
                        </DidiText.Explanation.Small>
                        <DidiText.Explanation.Small style={styles.value}>
                            {email ?? '-'}
                        </DidiText.Explanation.Small>
                    </View>
                    <View>
                        <DidiText.Explanation.Small style={styles.key}>
                            {strings.specialCredentials.PhoneNumberData.title}
                        </DidiText.Explanation.Small>
                        <DidiText.Explanation.Small style={styles.value}>
                            {phoneNumber ?? '-'}
                        </DidiText.Explanation.Small>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

export default didiConnect(
	Beneficiario,
	(state): BeneficiarioGlobalProps => ({
		activeSpecialCredentials: state.activeSpecialCredentials
	})
);

const styles = StyleSheet.create({
    key: {
        fontSize: 11,
        marginTop: 5,
        color: colors.textLight
    },
    value: {
        fontSize: 14,
        color: colors.darkText
    }

});