import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar, H1, Body, Button, ButtonOutline, Tiny } from '../../components';
import { colors, gradients } from '../../theme';

export default function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <StatusBar />
      <LinearGradient colors={gradients.hero} style={styles.hero}>
        <Text style={styles.leaf}>🌱</Text>
        <H1 style={styles.title}>Your wellness journey starts here</H1>
        <Body style={styles.sub}>
          Connect with therapists, track your mood, and find calm — all in one private space.
        </Body>
      </LinearGradient>
      <View style={styles.footer}>
        <Button title="Get started →" onPress={() => navigation.navigate('Register')} style={{ paddingVertical: 2 }} />
        <ButtonOutline title="I already have an account" onPress={() => navigation.navigate('Login')} />
        <Tiny style={styles.terms}>
          By continuing you agree to our <Text style={{ color: colors.sage }}>Privacy Policy</Text> &{' '}
          <Text style={{ color: colors.sage }}>Terms</Text>
        </Tiny>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.surface },
  hero: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
    textAlign: 'center',
  },
  leaf: { fontSize: 72, marginBottom: 20 },
  title: { textAlign: 'center', marginBottom: 12 },
  sub: { textAlign: 'center', maxWidth: 270 },
  footer: {
    padding: 20,
    paddingBottom: 32,
    backgroundColor: colors.surface,
    gap: 10,
  },
  terms: { textAlign: 'center', marginTop: 4, lineHeight: 15 },
});
