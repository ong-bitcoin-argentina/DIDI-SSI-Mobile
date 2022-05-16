import React from "react";
import { StyleSheet, View, FlatList, Image, SafeAreaView, TouchableOpacity, ActivityIndicator } from "react-native";

import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import strings from "../../resources/strings";
import { DashboardScreenProps } from "../home/Dashboard";
import DidiButton from "../../util/DidiButton";
import { DidiText } from "../../util/DidiText";
import { didiConnect } from "../../../store/store";
import { getAllIssuerData } from "../../../services/user/getIssuerNames";
import { IssuerDescriptor } from "@proyecto-didi/app-sdk/src/model/IssuerDescriptor";
import commonStyles from "../../resources/commonStyles";
import Divider from "../common/Divider";
import colors from "../../resources/colors";
import WarningModal from "../../common/WarningModal";

export type IssuerScreenState = {
    issuersNames: IssuerDescriptor[];
    issuerImg: any;
    limit: number;
    page: number;
    modalVisible: boolean;
    loading: boolean;
    message: string;
};
export interface IssuerScreenNavigation {
    DashboardHome: DashboardScreenProps;
}

interface IssuerScreenStateProps {
    issuersNames: IssuerDescriptor[];
    totalPages: number;
}

interface IssuerScreenDispatchProps {
    getAllIssuerData: (limit: number, count: number) => void;
}

export type IssuerScreenProps = IssuerScreenStateProps & IssuerScreenDispatchProps;

class IssuersScreen extends NavigationEnabledComponent<
    IssuerScreenProps,
    IssuerScreenState,
    IssuerScreenNavigation
    > {
    constructor(props: IssuerScreenProps) {
        super(props);
        this.state = {
            issuersNames: [],
            issuerImg: null,
            limit: 4,
            page: 1,
            modalVisible: false,
            message: '',
            loading: false,
        };

        this.toggleModal = this.toggleModal.bind(this);
    }

    componentDidMount() {
        const {limit, page} = this.state;
        this.props.getAllIssuerData(limit, page);
    }

    toggleModal() {
        this.setState((state) => ({ 
            modalVisible: !state.modalVisible
        }));
    }

    static navigationOptions = NavigationHeaderStyle.withTitleAndFakeBackButton<IssuerScreenNavigation, "DashboardHome">(
        strings.tabNames.issuers,
        "DashboardHome",
        {}
    );

    openModal(item: IssuerDescriptor) {
        this.toggleModal();
        const { name, shareRequest } = item;
        const message = shareRequest
            ? 'Funcionalidad en desarrrollo.'
            : `El emisor "${name}" aún no tiene presentaciones.`;
        this.setState({ message })
    }

    private renderItem(item: IssuerDescriptor) {
        const { name, imageUrl, description } = item;
        return (
            <TouchableOpacity onPress={() => this.openModal(item)} >
                <View style={styles.listIssuers}>
                    <View style={styles.title}>
                        <Image
                            style={styles.image}
                            source={
                                imageUrl
                                ? { uri: `${imageUrl}` }
                                : require("../../resources/images/logo-space.png")
                            }
                            />
                        <DidiText.Explanation.Emphasis>{name}</DidiText.Explanation.Emphasis>
                    </View>
                    {description && (
                        <View style={styles.description}>
                            <DidiText.Explanation.Normal>{description}</DidiText.Explanation.Normal>
                        </View>
                    )}
                </View>
            </TouchableOpacity>
        );
    }
    
    private async nextPage() {
        await this.setState((state) => ({
            page: state.page + 1,
            loading: !state.loading,
        }));
        await this.props.getAllIssuerData(this.state.limit, this.state.page);
        this.setState({ loading: !this.state.loading })
    }
            
    private async previewPage() {
        await this.setState((state) => ({
            page: state.page - 1,
            loading: !state.loading,
        }));
        await this.props.getAllIssuerData(this.state.limit, this.state.page);
        this.setState({ loading: !this.state.loading })
    }
    
    renderLoading() {
        return (
            <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" color="#24CDD2" />
            </View>
        )
    }
    
    render() {
        return (
            <SafeAreaView style={commonStyles.view.area}>
                {this.state.loading ?   
                    this.renderLoading() 
                : 
                    <FlatList
                        style={styles.body}
                        ItemSeparatorComponent={() => <Divider color={colors.transparent} />}
                        data={this.props.issuersNames}
                        renderItem={item => this.renderItem(item.item)}
                        keyExtractor={(_, index) => index.toString()}
                        refreshing={this.state.loading}
                    />}
                <WarningModal 
                    message={this.state.message}
                    modalVisible={this.state.modalVisible}
                    toggleModal={this.toggleModal}
                />
                <View style={styles.buttons}>
                    <DidiButton 
                        style={[styles.button, styles.buttonMargin]} 
                        disabled={this.state.page === 1} 
                        title="Prev" 
                        onPress={() => this.previewPage()
                    } />
                    <DidiButton 
                        style={styles.button} 
                        disabled={this.props.totalPages <= this.state.page} 
                        title="Sig"
                        onPress={() => this.nextPage()} 
                    />
                </View>
            </SafeAreaView>
        );
    }
}

export default didiConnect(
    IssuersScreen,
    (state): IssuerScreenStateProps => ({
        issuersNames: state.issuersNames.issuersList,
        totalPages: state.issuersNames.totalPages
    }),
    (dispatch): IssuerScreenDispatchProps => ({
        getAllIssuerData: (limit, page) => dispatch(getAllIssuerData("getAllIssuerData", limit, page)),
    })
);

const styles = StyleSheet.create({
    body: {
        width: "100%",
        paddingHorizontal: 20,
        paddingVertical: 35,
    },
    title: {
        flexDirection: "row",
        alignItems: "flex-start",
        paddingLeft: 15,
        paddingTop: 15,
        paddingBottom: 8
    },
    description: {
        flexDirection: "row",
        alignItems: "flex-start",
        fontSize: 14,
        paddingLeft: 15,
        paddingBottom: 15
    },
    buttons: {
        marginTop: 5,
        marginBottom: 5,
        flexDirection: "row",
    },
    button: {
        width: 110
    },
    buttonMargin: {
        marginRight: 50
    },
    scrollContent: {

    },
    listIssuers: {
        marginBottom: 7,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: "#24CDD2",
    },
    image: {
        width: 30,
        height: 30,
        marginRight: 10
    },
    descriptionModal: {
		textAlign: "left",
		marginVertical: 10
	},
    modalView: {
		alignItems: "flex-start"
	},
    container: {
        flex: 1,
        justifyContent: "center"
      },
      horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
      }
});
