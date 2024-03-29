import React from 'react';
import { View, TextInput as RNTextInput, TextInputProps } from 'react-native';
import styles from './inputAutocomplete.styles';
import { Strings } from '../../utils';
import { Colors } from '../../res';
import Results from './results';
import Text from '../text/text';

type Props = {
  label?: string,
  validationError?: string,
  data?: Array<string>,
}

export default function InputAutocomplete({
  label,
  validationError,
  data = [],
  ...rest
}: Props & TextInputProps) {

  const [focused, setFocused] = React.useState<boolean>(false);
  const [autoCompleteValues, setAutoCompleteValues] = React.useState<Array<string>>([]);

  const onChange = React.useCallback(() => {
    if (!data) return;

    const newList = data.filter((val) => val.toLowerCase().includes(rest.value ?? ''));
    setAutoCompleteValues(newList);

  }, [
    data,
    rest?.value,
    setAutoCompleteValues,
  ]);

  const onSelectAutoCompleteValue = React.useCallback((val: string) => {
    rest?.onChangeText?.(val);

    setTimeout(() => {
      setAutoCompleteValues([]);
    }, 100);
  }, [rest]);

  React.useEffect(() => onChange(), [rest.value]);

  return (
    <View style={styles.container}>
      {
        label?.length && (
          <Text>{label}</Text>
        )
      }

      <RNTextInput
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholderTextColor={Colors.Light.Muted}
        style={[
          styles.input,
          (focused && styles.inputFocused),
          (validationError ? styles.inputError : null),
        ]}
        {...rest} />

      {
        focused && autoCompleteValues.length > 0 && (
          <Results
            values={autoCompleteValues}
            onChange={onSelectAutoCompleteValue} />
        )
      }

      {
        (validationError && validationError?.length > 0) && (
          <Text style={styles.errorMessage}>
            {
              Strings.capitalizeFirstLetter(
                  validationError,
              )
            }
          </Text>
        )
      }
    </View>
  );
}
