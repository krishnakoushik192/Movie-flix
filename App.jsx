import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/Navigation/StackNavigator';
import {ContextProvider } from './src/Context/ContextApi';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function App() {
  return (
    <ContextProvider>
      <GestureHandlerRootView>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </GestureHandlerRootView>
    </ContextProvider>
  );
}

export default App;
