import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  StatusBar, ScreenHeader, DismissKeyboard, H1, Body, Label, Input, Button, Small,
} from '../../components';
import { colors, gradients, fonts } from '../../theme';
import { useAuth } from '../../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = async () => {
    if (!email.trim() || !password) {
      setError('Please enter your email and password.');
      return;
    }
    const res = await login(email, password);
    if (!res.ok) {
      setError(res.error);
      return;
    }
    setError('');
    // Login button → Dashboard
    navigation.reset({ index: 0, routes: [{ name: 'Dashboard' }] });
  };

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <StatusBar />
      <ScreenHeader onBack={() => navigation.goBack()} />
      <DismissKeyboard>
        <LinearGradient colors={gradients.hero} style={styles.hero}>
          <Text style={styles.flower}>🌸</Text>
          <H1 style={{ marginBottom: 8, textAlign: 'center' }}>Welcome back</H1>
          <Body style={{ textAlign: 'center', maxWidth: 260 }}>
            Log in to continue your wellness journey.
          </Body>
        </LinearGradient>

        <ScrollView style={{ backgroundColor: colors.surface }} keyboardShouldPersistTaps="handled">
          <View style={styles.form}>
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
              <Input
                placeholder="Enter your password"
                secureTextEntry
                value={password}
                onChangeText={(v) => { setPassword(v); setError(''); }}
              />
            </View>
            {error ? <Small style={styles.error}>{error}</Small> : null}
          </View>
          <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
            <Button title="Log in →" onPress={submit} />
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Small style={styles.bottomLink}>
              Don't have an account? <Text style={styles.linkBold}>Sign up</Text>
            </Small>
          </TouchableOpacity>
        </ScrollView>
      </DismissKeyboard>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.surface },
  hero: { alignItems: 'center', justifyContent: 'center', paddingHorizontal: 28, paddingTop: 18, paddingBottom: 26 },
  flower: { fontSize: 40, marginBottom: 14 },
  form: { paddingHorizontal: 20, paddingTop: 22, gap: 14 },
  error: { color: colors.danger, fontFamily: fonts.sansMedium },
  bottomLink: { textAlign: 'center', paddingVertical: 22, paddingHorizontal: 20 },
  linkBold: { color: colors.sage, fontFamily: fonts.sansSemiBold },
});
