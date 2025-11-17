import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { LinkProvider } from '../../modules/links/context/LinkContext'
import { AddLinkScreen } from '../../modules/links/screens/AddLinkScreen'
import { HomeScreen } from '../../modules/links/screens/HomeScreen'

export type RootStackParamList = {
    Home: undefined
    AddLink: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStackNavigator: React.FC = () => {
    return (
        <LinkProvider>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerStyle: { backgroundColor: "#020617" },
                        headerTintColor: "#E5E7EB",
                        headerTitleStyle: { fontWeight: '600' },
                        contentStyle: { backgroundColor: "#020617" }
                    }}
                >

                    <Stack.Screen
                        name='Home'
                        component={HomeScreen}
                        options={{ title: "LinkPilot Mobile" }}
                    />

                    <Stack.Screen
                        name='AddLink'
                        component={AddLinkScreen}
                        options={{ title: "Nuevo enlace" }}
                    />

                </Stack.Navigator>
            </NavigationContainer>

        </LinkProvider>
    )
}