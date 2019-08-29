import React from 'react'
import {createAppContainer, createStackNavigator} from 'react-navigation'

import HomeScreen from './presentation/HomeScreen';

const AppNavigator = createStackNavigator({
        Home: HomeScreen,
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
        render() {
                return <AppContainer />;
        }
}