import { createStackNavigator, createAppContainer } from 'react-navigation';
import SignUp from './classes/SignUp';
import Login from './classes/Login';
import Profile from './classes/Profile';
import ProfileDetails from './classes/ProfileDetail';
import ClientPage from './classes/ClientPage';
import DailyRoutine from './classes/DailyRoutine';

const MainNavigator = createStackNavigator({
    Profile: { screen: Profile },
    Login: { screen: Login },
    SignUp: { screen: SignUp },
    ProfileDetails: { screen: ProfileDetails },
    ClientPage: { screen: ClientPage },
    DailyRoutine: { screen: DailyRoutine }
},
    {
        initialRouteName: 'Login',
        // headerMode: 'none',
        // navigationOptions: {
        //     headerVisible: false,
        // }
    }
);

const Routes = createAppContainer(MainNavigator);

export default Routes;