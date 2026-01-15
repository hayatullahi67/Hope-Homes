import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from '../screens/Welcome';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import AdminDashboard from '../screens/AdminDashboard';
import Home from '../screens/Home';
import PropertyDetails from '../screens/PropertyDetails';
import Profile from '../screens/Profile';
import AllListings from '../screens/AllListings';
import Chat from '../screens/Chat';
import Favorites from '../screens/Favorites';
import Notifications from '../screens/Notifications';
import Settings from '../screens/Settings';
import Support from '../screens/Support';
// Admin Screens
import ManageProperties from '../screens/admin/ManageProperties';
import SalesAnalytics from '../screens/admin/SalesAnalytics';
import UserManagement from '../screens/admin/UserManagement';
import FinancialReports from '../screens/admin/FinancialReports';
import InquiriesLeads from '../screens/admin/InquiriesLeads';
import AdminSettings from '../screens/admin/AdminSettings';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Welcome"
            screenOptions={{
                headerShown: false,
                animation: 'slide_from_right',
            }}
        >
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="PropertyDetails" component={PropertyDetails} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="AllListings" component={AllListings} />
            <Stack.Screen name="Chat" component={Chat} />
            <Stack.Screen name="Favorites" component={Favorites} />
            <Stack.Screen name="Notifications" component={Notifications} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="Support" component={Support} />
            {/* Admin Screens */}
            <Stack.Screen name="ManageProperties" component={ManageProperties} />
            <Stack.Screen name="SalesAnalytics" component={SalesAnalytics} />
            <Stack.Screen name="UserManagement" component={UserManagement} />
            <Stack.Screen name="FinancialReports" component={FinancialReports} />
            <Stack.Screen name="InquiriesLeads" component={InquiriesLeads} />
            <Stack.Screen name="AdminSettings" component={AdminSettings} />
        </Stack.Navigator>
    );
};

export default AppNavigator;
