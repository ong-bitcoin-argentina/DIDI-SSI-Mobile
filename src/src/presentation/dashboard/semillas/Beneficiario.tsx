import React, { Fragment } from 'react';
import { View, StyleSheet } from "react-native";
import { DidiText } from "../../util/DidiText";
import { SemillasIdentityModel } from '../../../model/SemillasIdentity';

type BeneficiarioProps = {
    item:SemillasIdentityModel;
};

const blacklist = [
    "NOMBRE",
    "APELLIDO",
    "Dni Titular",
    "Nombre Titular",
    "Relacion con Titular",
    "Genero"
]

function Beneficiary(props: BeneficiarioProps) {
    const { item } = props;
    const keysList = Object.keys(item).filter(key => !blacklist.includes(key));
    return (
        <View style={{ paddingVertical:10 }}>
            {
                keysList.map(key => (
                    <Fragment key={key}>
                        <DidiText.Explanation.Small style={styles.key}>
                            {key}
                        </DidiText.Explanation.Small>
                        <DidiText.Explanation.Small>
                            {item[key]}
                        </DidiText.Explanation.Small>
                    </Fragment>
                ))
            }
        </View>
    )
}

export default Beneficiary;

const styles = StyleSheet.create({
    key: {
        fontSize: 13,
        marginTop: 7
    }
});