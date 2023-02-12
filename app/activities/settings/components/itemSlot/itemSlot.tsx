import React from 'react';
import { View, Text } from 'react-native';
import styles from './itemSlot.styles';

interface ItemProps {
  title: string,
  children?: React.ReactNode,
  childrenPosition?: 'left' | 'bottom',

  /** When this flag is true, the margin-top of the item is removed  */
  firstItem?: boolean,
}

export default function ItemSlot({ title, children, childrenPosition = 'left', firstItem = false }: ItemProps) {
  return (
    <View
      style={[
        styles.container,
        firstItem && styles.removeMargin,
        childrenPosition === 'bottom' && styles.childrenBottom,
      ]}>
      <View style={styles.leftContainer}>
        <Text style={styles.title}>{title && title}</Text>
      </View>

      { children && children }
    </View>
  );
}