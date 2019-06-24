import { createStackNavigator, createAppContainer } from "react-navigation";
import Preload from "./src/screen/Preload";
import Login from "./src/screen/Login";
import RecPSW from "./src/screen/RecPSW";
import Bottomtab from "./src/screen/bottomNavigation/Bottomtab";
import BottomtabNutri from "./src/screen/bottomNavigation/BottomtabNutri";
import BottomtabADM from "./src/screen/bottomNavigation/BottomtabADM";
import CadastroPaciente from "./src/screen/CadastroPaciente";
import CadastroMedico from "./src/screen/CadastroMedico";
import Conversa from "./src/screen/telas/Conversa";
import './src/config/reactotronConfig';
console.disableYellowBox = true;
const navegation = createStackNavigator({
  Preload: {
    screen: Preload
  },
  Login: {
    screen: Login
  },
  RecPSW: {
    screen: RecPSW
  },
  Bottomtab: {
    screen: Bottomtab,
    navigationOptions: {
      title: null,
      header: null
    }
  },
  BottomtabNutri: {
    screen: BottomtabNutri,
    navigationOptions: {
      title: null,
      header: null
    }
  },
  BottomtabADM: {
    screen: BottomtabADM,
    navigationOptions: {
      title: null,
      header: null
    }
  },
  CadastroPaciente: {
    screen: CadastroPaciente
  },
  CadastroMedico: {
    screen: CadastroMedico
  },
  Conversa: {
    screen: Conversa
  }
});

const AppContainer = createAppContainer(navegation);
export default AppContainer;
