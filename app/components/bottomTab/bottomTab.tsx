import React from 'react';
import { View } from 'react-native';
import bottomTabStyles from './bottomTab.styles';
import { Screens, Colors } from '../../res';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';
import { Navigation } from '../../utils';
import { useRoute } from '@react-navigation/native';
import ChooseToCreate from '../modal/chooseToCreate/chooseToCreate';

export default function BottomTab() {
  const [showCreationModal, setShowCreationModal] = React.useState<boolean>(false);
  const route = useRoute();

  const isFocused = React.useCallback((screenName: string): boolean => {
    return (
      route.name === screenName
    );
  }, [route.name]);

  return (
    <React.Fragment>
      <ChooseToCreate
        onClose={() => setShowCreationModal(false)}
        show={showCreationModal} />

      <View style={bottomTabStyles.container}>
        <TouchableOpacity
          onPress={() => {
            Navigation.navigate(Screens.Main.Name);
          }}>

          <Icon
            name={
            isFocused(Screens.Main.Name)
              ? Screens.Main.IconFocused
              : Screens.Main.Icon
            }
            size={28}
            color={Colors.System.Brand} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            bottomTabStyles.buttonContainer,
            bottomTabStyles.buttonActive,
          ]}
          onPress={() => {
            setShowCreationModal(true);
          }}>

          <Icon
            name={Screens.CreatePassword.Icon}
            size={28}
            color={Colors.System.White} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            Navigation.navigate(Screens.Tags.Name);
          }}>

          <Icon
            name={
            isFocused(Screens.Tags.Name)
              ? Screens.Tags.IconFocused
              : Screens.Tags.Icon
            }
            size={28}
            color={Colors.System.Brand} />
        </TouchableOpacity>
      </View>
    </React.Fragment>
  );
}
