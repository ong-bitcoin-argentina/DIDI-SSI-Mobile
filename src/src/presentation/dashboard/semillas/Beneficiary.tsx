import React from 'react';
import { View, StyleSheet } from "react-native";
import { DidiText } from "../../util/DidiText";

export type BeneficiaryModel = {
	id: number,
	name: string;
	phone: string;
	DNI: number|string;
	birthday: string;
	email: string;
}

type BeneficiaryProps = {
    item:BeneficiaryModel;
};

function Beneficiary(props: BeneficiaryProps) {
    const { name, phone, DNI, birthday, email } = props.item;
    return (
        <View style={{ paddingVertical:10 }}>
            <DidiText.Explanation.Small>
                { name }
            </DidiText.Explanation.Small>
            <DidiText.Explanation.Small>
                { DNI }
            </DidiText.Explanation.Small>
            <DidiText.Explanation.Small>
                { phone }
            </DidiText.Explanation.Small>
            <DidiText.Explanation.Small>
                { birthday }
            </DidiText.Explanation.Small>
            <DidiText.Explanation.Small>
                { email }
            </DidiText.Explanation.Small>
        </View>
    )
}

export default Beneficiary;

const styles = StyleSheet.create({

});