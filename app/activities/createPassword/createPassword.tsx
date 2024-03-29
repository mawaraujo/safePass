import React from 'react';
import { BackHandler, ScrollView } from 'react-native';
import Default from '../../layout/default/default';
import NavigationBar from '../../components/navigationBar/navigationBar';
import { FormikHelpers, useFormik } from 'formik';
import useForm from './useForm';
import Button from '../../components/button/button';
import styles from './createPassword.styles';
import Input from '../../components/input/input';
import InputAutocomplete from '../../components/inputAutocomplete/inputAutocomplete';
import Select from '../../components/select/select';
import type { NPassword } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import passwordSlice from '../../store/reducers/passwordSlice';
import { Navigation, Strings } from '../../utils';
import { Screens, Autocomplete } from '../../res';
import uuid from 'react-native-uuid';
import alertSlice from '../../store/reducers/alertSlice';
import { RootState } from '../../store/store';
import { useTranslation } from 'react-i18next';
import PasswordActionIcons from './components/passwordActionIcons/passwordActionIcons';
import Confirm from '../../components/modal/confirm/confirm';

interface Props {
  navigation: any,
  route?: {
    params: {
      password: NPassword.Password
    }
  }
}

export default function CreatePassword({ navigation, route }: Props) {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const tags = useSelector((state: RootState) => state.tags);
  const password = route?.params?.password;

  const {
    editMode,
    setEditMode,
    showPassword,
    setShowPassword,
    initialValues,
    validationSchema,
  } = useForm();

  const [showExitModal, setShowExitModal] = React.useState<boolean>(false);

  const onSubmit = (value: NPassword.Password, _helpers: FormikHelpers<NPassword.Password>) => {
    if (!editMode) {
      // Create a random uuid
      value.id = uuid.v4().toString();

      dispatch(
          passwordSlice.actions.add(
              value,
          ),
      );

    } else {
      dispatch(
          passwordSlice.actions.edit(
              value,
          ),
      );
    }

    // Display success alert
    dispatch(
        alertSlice.actions.show({
          title: editMode
            ? t('EntryUpdated') ?? 'The entry was updated successfully'
            : t('EntryCreated') ?? 'The entry was created successfully',
          type: 'Success',
        }),
    );

    if (editMode) {
      Navigation.goBack();
      return;
    }

    Navigation.navigate(Screens.Main.Name);
  };

  const parsedTags = React.useMemo(() =>
    tags.map((tag) => ({ name: tag.name, value: tag.id })),
  [tags]);

  const formik = useFormik({
    validationSchema: validationSchema,
    initialValues: initialValues,
    onSubmit,
  });

  /**
   * Check if the screen will edit a password or create a new
   */
  React.useEffect(() => {
    if (password && Object.keys(password).length !== 0) {
      setEditMode(true);

      // Set the current password value on the formik state
      formik.setValues(password);

      // Screen unmount on blur fix
      Navigation.setParams({
        password: undefined,
      });
    }
  }, [password]);

  React.useEffect(() => {
    const subscription = BackHandler
        .addEventListener('hardwareBackPress', () => {
          setShowExitModal(true);
          return true;
        });

    return subscription.remove;
  }, []);

  return (
    <Default bottomTab={false}>
      <NavigationBar
        name={
          editMode
          ? t('Edit password') ?? 'Edit password'
          : t('Create password') ?? 'Create password'
        } />

      <Confirm
        show={showExitModal}
        title={t('exitConfirmTitle').toString()}
        extraInformation={t('exitConfirmDescription').toString()}
        onAccept={navigation.goBack}
        onCancel={() => setShowExitModal(false)} />

      <ScrollView
        keyboardShouldPersistTaps={'always'}
        contentContainerStyle={styles.container}>

        <Input
          value={formik.values.name}
          label={`${t('Name') ?? 'Name'}*`}
          autoCapitalize={'words'}
          validationError={formik.errors.name}
          onChangeText={(e) => {
            formik.setFieldValue('name', e);
          }}
          placeholder="Amazon"
        />

        <InputAutocomplete
          value={formik.values.url}
          data={Autocomplete.Sites}
          label={t('Site or Application') ?? 'Site or Application'}
          validationError={formik.errors.url}
          autoCapitalize={'none'}
          onChangeText={(e) => {
            formik.setFieldValue('url', e);
          }}
          placeholder="www.amazon.com/your-account"
        />

        <Input
          value={formik.values.username}
          label={t('Username') ?? 'Username'}
          accessibilityHint="username"
          autoCapitalize={'none'}
          validationError={formik.errors.username}
          onChangeText={(e) => {
            formik.setFieldValue('username', e);
          }}
          placeholder="username"
        />

        <Input
          value={formik.values.email}
          label={t('Email') ?? 'Email'}
          accessibilityHint="email_address"
          autoCapitalize={'none'}
          validationError={formik.errors.email}
          onChangeText={(e) => {
            formik.setFieldValue('email', e);
          }}
          placeholder="email@domain.com"
        />

        <Input
          value={formik.values.password}
          label={t('Password') ?? 'Password'}
          secureTextEntry={showPassword === false}
          accessibilityHint="password"
          validationError={formik.errors.password}
          onChangeText={(e) => {
            formik.setFieldValue('password', e);
          }}
          placeholder="*****"
          rightComponent={
            <PasswordActionIcons
              onPressGeneratePassword={() => {
                setShowPassword(true);
                formik.setFieldValue('password', Strings.generatePassword(12));
              }}
              showEye={showPassword}
              onPressEye={() => {
                setShowPassword(!showPassword);
              }}
            />
          }
        />

        <Select
          value={formik.values.tagId}
          label={t('Tag') ?? 'Tag'}
          validationError={formik.errors.notes}
          options={parsedTags}
          onChangeText={(tagId: string) => {
            formik.setFieldValue('tagId', tagId);
          }}
        />

        <Input
          value={formik.values.notes}
          label={t('Notes') ?? 'Notes'}
          numberOfLines={3}
          textAlignVerticalTop={true}
          multiline={true}
          validationError={formik.errors.notes}
          onChangeText={(e) => {
            formik.setFieldValue('notes', e);
          }}
        />

        <Button
          onPress={formik.handleSubmit as any}
          text={t('Save changes') ?? 'Save changes'} />
      </ScrollView>
    </Default>
  );
}
