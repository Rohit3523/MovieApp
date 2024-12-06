import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MovieScreen from './app/screens/movies';
import DetailScreen from './app/screens/detail';
import SearchScreen from './app/screens/search';
import { NavigationContainer } from '@react-navigation/native';
import Octicons from 'react-native-vector-icons/Octicons';
import RNBootSplash from 'react-native-bootsplash';
import { theme } from './app/theme';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function App() {
    React.useEffect(()=>{
        setTimeout(() => {
            RNBootSplash.hide({ fade: true });
        }, 2000);
    }, [])

    const MoviesStack = () => (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={MovieScreen} />
            <Stack.Screen name="Detail" component={DetailScreen} />
        </Stack.Navigator>
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        headerShown: false,
                        tabBarShowLabel: false,
                        tabBarStyle: {
                            backgroundColor: theme.colors.background,
                            borderTopWidth: 0,
                            marginTop: 5
                        },
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName: string = 'home';

                            if (route.name === 'Movies') {
                                iconName = 'home';
                            } else if (route.name === 'Search') {
                                iconName = 'search';
                            }

                            return <Octicons name={iconName} size={size} color={color} />;
                        },
                        tabBarActiveTintColor: theme.colors.accent,
                        tabBarInactiveTintColor: theme.colors.secondaryText,
                    })}
                >
                    <Tab.Screen name="Movies" component={MoviesStack} />
                    <Tab.Screen name="Search" component={SearchScreen} />
                </Tab.Navigator>
            </NavigationContainer>
        </SafeAreaView>
    );
}

export default App;
