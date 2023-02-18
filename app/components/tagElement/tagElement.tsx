import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import type { NTag } from '../../types';
import styles from './tagElement.styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors, Screens } from '../../res';
import { Navigation } from '../../utils';

interface ITagElementProps {
  item: NTag.Tag,
  linkedPasswords?: number,
  onPressDelete?: (item: NTag.Tag) => void
}

export default function TagElement({ item, linkedPasswords, onPressDelete }: ITagElementProps) {
  const handleEdit = React.useCallback(() => {
    Navigation.navigate(
        Screens.CreateTag.Name, {
          tag: item,
        },
    );
  }, [item]);

  const handleDelete = React.useCallback(() => {
    onPressDelete?.(item);
  }, [item]);

  return (
    <View
      style={styles.container}>

      <Icon
        name="pricetag-outline"
        color={Colors.System.Brand}
        size={26} />

      <View style={styles.left}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.extraInfo}>Contains {linkedPasswords} passwords</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity onPress={handleEdit}>
          <Icon
            name="create-outline"
            color={Colors.System.Brand}
            size={26} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleDelete}>

          <Icon
            name="trash-outline"
            color={Colors.System.Brand}
            size={26} />
        </TouchableOpacity>
      </View>
    </View>
  );
}