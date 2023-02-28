import { StyleSheet } from 'react-native';
import { Layout } from '../../../res';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Layout.Spacing.MD,
  },
  removeMargin: {
    marginTop: 0,
  },
  leftContainer: {
    flex: 1,
    maxWidth: '75%',
  },
});