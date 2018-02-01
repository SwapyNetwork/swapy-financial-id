// @flow

import { StackNavigator } from 'react-navigation';
import Index from '../index';

const Home = StackNavigator({
  Home: {
    screen: Index,
    navigationOptions: () => ({
      title: 'Home',
    }),
  },
});

export default Home;
