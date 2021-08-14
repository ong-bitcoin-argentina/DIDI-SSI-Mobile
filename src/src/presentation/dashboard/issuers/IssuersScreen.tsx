import React from "react";
import { StyleSheet, View, FlatList, Image, SafeAreaView } from "react-native";

import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import strings from "../../resources/strings";
import { DashboardScreenProps } from "../home/Dashboard";
import DidiButton from "../../util/DidiButton";
import { DidiText } from "../../util/DidiText";
import { didiConnect } from "../../../store/store";
import { getAllIssuerData } from "../../../services/user/getIssuerNames";
import { IssuerDescriptor } from "didi-sdk/src/model/IssuerDescriptor";
import { EthrDID } from "didi-sdk";
import commonStyles from "../../resources/commonStyles";
import Divider from "../common/Divider";
import colors from "../../resources/colors";

export type IssuerScreenState = {
    issuersNames: IssuerDescriptor[];
    issuerImg: any;
    limit: number;
    page: number;
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

const serviceKey = "getPersonalData";
const serviceKeySendData = "sendPersonalData";

const IssuersScreen = class IssuersScreen extends NavigationEnabledComponent<
    IssuerScreenProps,
    IssuerScreenState,
    IssuerScreenNavigation
    > {
    constructor(props: IssuerScreenProps) {
        super(props);
        this.state = {
            issuersNames: [],
            issuerImg: null,
            limit: 7,
            page: 1,
        };
    }

    static navigationOptions = NavigationHeaderStyle.withTitleAndFakeBackButton<IssuerScreenNavigation, "DashboardHome">(
        strings.tabNames.issuers,
        "DashboardHome",
        {}
    );

    private renderItem(item: { did: EthrDID; name: string | null; description?: string; imageUrl?: string; imageId?: string; image?: string }, index: number) {
        return (
            <View style={styles.listIssuers}>
                <View style={styles.title}>
                    <Image
                        style={styles.image}
                        source={
                            item.image
                                ? { uri: `${item.image}` }
                                : require("../../resources/images/logo-space.png")
                        }
                    />
                    <DidiText.Explanation.Emphasis>{item.name}</DidiText.Explanation.Emphasis>
                </View>
                {item.description && (
                    <View style={styles.description}>
                        <DidiText.Explanation.Normal>{item.description}</DidiText.Explanation.Normal>
                    </View>
                )}
            </View>
        );
    }

    private async nextPage() {
        await this.setState({ page: this.state.page + 1 });
        this.props.getAllIssuerData(this.state.limit, this.state.page);
    }

    private async previewPage() {
        await this.setState({ page: this.state.page - 1 });
        this.props.getAllIssuerData(this.state.limit, this.state.page);
    }

    render() {
        return (
            <>
                <SafeAreaView style={commonStyles.view.area}>
                    <FlatList
                        style={styles.body}
                        contentContainerStyle={styles.scrollContent}
                        ItemSeparatorComponent={() => <Divider color={colors.transparent} />}
                        data={this.props.issuersNames}
                        renderItem={item => this.renderItem(item.item, item.index)}
                        keyExtractor={(_, index) => index.toString()}
                    />
                    <View style={styles.buttons}>
                        <DidiButton style={{ width: 110, marginRight: 50 }} disabled={this.state.page === 1} title="Preview" onPress={() => this.previewPage()} />
                        <DidiButton style={{ width: 110 }} disabled={this.props.totalPages <= this.state.page} title="Next" onPress={() => this.nextPage()} />
                    </View>
                </SafeAreaView>
            </>
        );
    }
};

const connect = didiConnect(
    IssuersScreen,
    (state): IssuerScreenStateProps => ({
        issuersNames: state.issuersNames.issuersList,
        totalPages: state.issuersNames.totalPages
    }),
    (dispatch): IssuerScreenDispatchProps => ({
        getAllIssuerData: (limit, page) => dispatch(getAllIssuerData("getAllIssuerData", limit, page)),
    })
);

export { connect as IssuersScreen };

const styles = StyleSheet.create({
    body: {
        width: "100%"
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
        // justifyContent: "space-between",
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingVertical: 35,
    },
    listIssuers: {
        // alignItems: "flex-start",
        marginBottom: 20,
        borderWidth: 2,
        borderRadius: 5,
        borderColor: "#24CDD2",
    },
    image: {
        width: 30,
        height: 30,
        marginRight: 10
    }
});
