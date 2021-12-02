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
  toggleModal: any
}

export default class WarningModal extends Component<WarningModalProps> {
  render() {
    const { modal } = commonStyles;
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.modalVisible}
        onRequestClose={() => this.props.toggleModal()}
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
                onPress={() => this.props.toggleModal()}
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
    textAlign: "left",
    marginVertical: 10
  },
  modalView: {
    alignItems: "flex-start"
  },
});

