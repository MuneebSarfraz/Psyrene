import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import {
  StatusBar, ScreenHeader, DismissKeyboard, H1, Body, Label, Input, Button, Tiny, Small, Row,
} from '../../components';
import { colors, fonts } from '../../theme';
import { useAuth } from '../../context/AuthContext';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RegisterScreen({ navigation }) {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState('');

  const submit = async () => {
    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!EMAIL_RE.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    if (!agree) {
      setError('Please agree to the Privacy Policy & Terms to continue.');
      return;
    }

    const res = await register({ name, email, password });
    if (!res.ok) {
      setError(res.error);
      return;
    }
    setError('');
    // Account created → go to Login so the user can sign in
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <StatusBar />
      <ScreenHeader onBack={() => navigation.goBack()} />
      <DismissKeyboard>
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <View style={styles.head}>
            <Text style={styles.leaf}>🌱</Text>
            <H1 style={{ marginBottom: 8 }}>Create your account</H1>
            <Body style={{ marginBottom: 22 }}>
              Start your wellness journey — private, secure, and always in your control.
            </Body>
          </View>

          <View style={styles.form}>
            <View>
              <Label style={{ marginBottom: 8 }}>Full name</Label>
              <Input placeholder="e.g. Khadija Hammad" value={name} onChangeText={(v) => { setName(v); setError(''); }} />
            </View>
            <View>
              <Label style={{ marginBottom: 8 }}>Email address</Label>
              <Input
                placeholder="you@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={(v) => { setEmail(v); setError(''); }}
              />
            </View>
            <View>
              <Label style={{ marginBottom: 8 }}>Password</Label>
              <Input placeholder="Create a password" secureTextEntry value={password} onChangeText={(v) => { setPassword(v); setError(''); }} />
              <Tiny style={{ marginTop: 6 }}>At least 8 characters, with a number</Tiny>
            </View>
            <View>
              <Label style={{ marginBottom: 8 }}>Confirm password</Label>
              <Input placeholder="Re-enter your password" secureTextEntry value={confirm} onChangeText={(v) => { setConfirm(v); setError(''); }} />
            </View>

            <Row style={{ alignItems: 'flex-start', gap: 8, paddingTop: 2 }}>
              <TouchableOpacity onPress={() => { setAgree((a) => !a); setError(''); }} style={[styles.checkbox, agree && styles.checkboxOn]}>
                {agree && <Ionicons name="checkmark" size={11} color="#fff" />}
              </TouchableOpacity>
              <Small style={{ flex: 1, lineHeight: 17 }}>
                I agree to the <Text style={styles.link}>Privacy Policy</Text> &{' '}
                <Text style={styles.link}>Terms of Service</Text>
              </Small>
            </Row>

            {error ? <Small style={styles.error}>{error}</Small> : null}
          </View>

          <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
            <Button title="Create account →" onPress={submit} />
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Small style={styles.bottomLink}>
              Already have an account? <Text style={styles.linkBold}>Log in</Text>
            </Small>
          </TouchableOpacity>
        </ScrollView>
      </DismissKeyboard>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.cream },
  head: { paddingHorizontal: 20, paddingTop: 4, paddingBottom: 8 },
  leaf: { fontSize: 40, marginBottom: 14 },
  form: { paddingHorizontal: 20, gap: 14 },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: colors.border2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  checkboxOn: { backgroundColor: colors.sage, borderColor: colors.sage },
  link: { color: colors.sage, fontFamily: fonts.sansMedium },
  linkBold: { color: colors.sage, fontFamily: fonts.sansSemiBold },
  error: { color: colors.danger, fontFamily: fonts.sansMedium },
  bottomLink: { textAlign: 'center', paddingVertical: 22, paddingHorizontal: 20 },
});
