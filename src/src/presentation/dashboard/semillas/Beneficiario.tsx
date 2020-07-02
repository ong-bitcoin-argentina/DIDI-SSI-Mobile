import React from 'react';
import { View, StyleSheet } from "react-native";
import { DidiText } from "../../util/DidiText";
import { SemillasIdentityModel } from '../../../model/SemillasIdentity';

type BeneficiaryProps = {
    item:SemillasIdentityModel;
};

function Beneficiary(props: BeneficiaryProps) {
    const { item } = props.item;
    return (
        <View style={{ paddingVertical:10 }}>
            <DidiText.Explanation.Small>
                
            </DidiText.Explanation.Small>
            <DidiText.Explanation.Small>
                
            </DidiText.Explanation.Small>
            <DidiText.Explanation.Small>
                
            </DidiText.Explanation.Small>
            <DidiText.Explanation.Small>
                
            </DidiText.Explanation.Small>
            <DidiText.Explanation.Small>
                
            </DidiText.Explanation.Small>
        </View>
    )
}

export default Beneficiary;

const styles = StyleSheet.create({

});