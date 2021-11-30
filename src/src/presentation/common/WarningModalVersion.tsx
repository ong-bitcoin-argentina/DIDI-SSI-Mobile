import React, { Component } from "react";
import { View, Modal, StyleSheet } from "react-native";
import { DidiText } from "../util/DidiText";
import DidiButton from "../util/DidiButton";
import commonStyles from "../resources/commonStyles";
import colors from "../resources/colors";
const { Small } = DidiText.Explanation;
const { Icon } = DidiText;

type WarningModalProps = {
    message: string
    modalVisible: boolean
}

export default class WarningModalVersion extends Component<WarningModalProps, { modalVisibleState: boolean }> {

    constructor(props: WarningModalProps) {
        super(props);
        this.state = {
            modalVisibleState: this.props.modalVisible,
        }
    }

    toggleModal() {
        this.setState(() => ({
            modalVisibleState: !this.props.modalVisible,
        }));
    }


    render() {
        const { modal } = commonStyles;
        const { modalVisibleState } = this.state;
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisibleState}
                onRequestClose={() => this.toggleModal()}
            >
                <View style={modal.centeredView}>
                    <View style={[modal.view, styles.modalView]}>
                        <View style={{}}>
                            <Icon fontSize={66} color={colors.yellow} style={{ marginBottom: 18 }}>
                                warning
                            </Icon>
                            <Small style={styles.descriptionModal}>{this.props.message}</Small>
                        </View>
                        <View style={modal.footer}>
                            <DidiButton
                                style={modal.smallButton}
                                title="Cerrar"
                                onPress={() => this.toggleModal()}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    descriptionModal: {
        textAlign: "center",
        marginVertical: 10
    },
    modalView: {
        alignItems: "flex-start"
    },
});

