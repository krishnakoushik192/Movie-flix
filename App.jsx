import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/Navigation/StackNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';

function App() {
  return (
   <SafeAreaView style={{flex:1,backgroundColor:'#030014'}}>
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
   </SafeAreaView>
  );
}

export default App;
