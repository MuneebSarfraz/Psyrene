import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, Feather } from '@expo/vector-icons';
import { colors, gradients, radius, fonts, shadow } from '../theme';

/* ── Typography ──────────────────────────────────── */
export const H1 = ({ style, children, ...p }) => (
  <Text style={[styles.h1, style]} {...p}>{children}</Text>
);
export const H2 = ({ style, children, ...p }) => (
  <Text style={[styles.h2, style]} {...p}>{children}</Text>
);
export const H3 = ({ style, children, ...p }) => (
  <Text style={[styles.h3, style]} {...p}>{children}</Text>
);
export const Serif = ({ style, children, ...p }) => (
  <Text style={[{ fontFamily: fonts.serif, color: colors.t1 }, style]} {...p}>{children}</Text>
);
export const Body = ({ style, children, ...p }) => (
  <Text style={[styles.body, style]} {...p}>{children}</Text>
);
export const Small = ({ style, children, ...p }) => (
  <Text style={[styles.small, style]} {...p}>{children}</Text>
);
export const Tiny = ({ style, children, ...p }) => (
  <Text style={[styles.tiny, style]} {...p}>{children}</Text>
);
export const Label = ({ style, children, ...p }) => (
  <Text style={[styles.label, style]} {...p}>{children}</Text>
);
export const T = ({ style, children, weight, color, size, ...p }) => (
  <Text
    style={[
      { fontFamily: weightFont(weight), color: color || colors.t1, fontSize: size || 13 },
      style,
    ]}
    {...p}
  >
    {children}
  </Text>
);
const weightFont = (w) =>
  w === '600' || w === 'semibold'
    ? fonts.sansSemiBold
    : w === '500' || w === 'medium'
    ? fonts.sansMedium
    : fonts.sans;

/* ── Cards ───────────────────────────────────────── */
export const Card = ({ style, children, ...p }) => (
  <View style={[styles.card, style]} {...p}>{children}</View>
);
export const CardSm = ({ style, children, ...p }) => (
  <View style={[styles.cardSm, style]} {...p}>{children}</View>
);
export const GradientCard = ({ type = 'brand', style, children, ...p }) => (
  <LinearGradient
    colors={gradients[type]}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={[styles.card, { borderWidth: 0 }, style]}
    {...p}
  >
    {children}
  </LinearGradient>
);

/* ── Pills ───────────────────────────────────────── */
const pillTone = {
  sage: { bg: colors.sageBg, fg: colors.sage },
  teal: { bg: colors.tealBg, fg: colors.teal },
  warm: { bg: colors.warmBg, fg: colors.warm },
  lav: { bg: colors.lavBg, fg: colors.lav },
  muted: { bg: colors.subtle, fg: colors.t2 },
};
export const Pill = ({ tone = 'muted', style, textStyle, children, onPress }) => {
  const t = pillTone[tone] || pillTone.muted;
  const inner = (
    <View style={[styles.pill, { backgroundColor: t.bg }, style]}>
      <Text style={[styles.pillText, { color: t.fg }, textStyle]}>{children}</Text>
    </View>
  );
  return onPress ? <TouchableOpacity onPress={onPress}>{inner}</TouchableOpacity> : inner;
};

/* ── Buttons ─────────────────────────────────────── */
export const Button = ({ title, onPress, style, textStyle, children }) => (
  <TouchableOpacity activeOpacity={0.85} onPress={onPress} style={[{ width: '100%' }, style]}>
    <LinearGradient
      colors={gradients.brand}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.btn}
    >
      <Text style={[styles.btnText, textStyle]}>{children || title}</Text>
    </LinearGradient>
  </TouchableOpacity>
);
export const ButtonOutline = ({ title, onPress, style, textStyle, children }) => (
  <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={[styles.btnO, style]}>
    <Text style={[styles.btnOText, textStyle]}>{children || title}</Text>
  </TouchableOpacity>
);

/* ── Dismiss keyboard on outside tap ─────────────── */
export const DismissKeyboard = ({ children, style }) => {
  if (Platform.OS === 'web') {
    return <View style={[{ flex: 1 }, style]}>{children}</View>;
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={[{ flex: 1 }, style]}>{children}</View>
    </TouchableWithoutFeedback>
  );
};
/* ── Input ───────────────────────────────────────── */
export const Input = ({ style, multiline, ...p }) => (
  <TextInput
    style={[styles.inp, multiline && { height: 84, textAlignVertical: 'top' }, style]}
    placeholderTextColor={colors.t3}
    multiline={multiline}
    {...p}
  />
);

/* ── Progress bar ────────────────────────────────── */
export const ProgressBar = ({ pct = 0, height = 5, gradient = gradients.progressBar, style }) => (
  <View style={[styles.pbar, { height }, style]}>
    <LinearGradient
      colors={gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{ height: '100%', width: `${pct}%`, borderRadius: 3 }}
    />
  </View>
);

/* ── Status bar (faux iOS) ───────────────────────── */
export const StatusBar = ({ dark }) => {
  const c = dark ? 'rgba(255,255,255,0.5)' : colors.t2;
  return (
    <View style={styles.sb}>
      <Text style={[styles.sbTime, { color: c }]}>9:41</Text>
      <View style={[styles.sbPill, dark && { backgroundColor: '#1a2535' }]} />
      <View style={styles.sbR}>
        <Feather name="wifi" size={13} color={c} />
        <Feather name="battery-full" size={16} color={c} />
      </View>
    </View>
  );
};

/* ── Screen header with back button ──────────────── */
export const ScreenHeader = ({ title, onBack, right, titleStyle }) => (
  <View style={styles.scrHdr}>
    {onBack !== undefined && (
      <TouchableOpacity style={styles.back} onPress={onBack}>
        <Ionicons name="chevron-back" size={18} color={colors.t2} />
      </TouchableOpacity>
    )}
    {title ? <H2 style={[{ flex: 1 }, titleStyle]}>{title}</H2> : <View style={{ flex: 1 }} />}
    {right}
  </View>
);

/* ── Section header row ──────────────────────────── */
export const SectionHeader = ({ title, action, onAction }) => (
  <View style={styles.shRow}>
    <Text style={styles.shTitle}>{title}</Text>
    {action ? (
      <TouchableOpacity onPress={onAction}>
        <Text style={styles.seeAll}>{action}</Text>
      </TouchableOpacity>
    ) : null}
  </View>
);

/* ── Toast (transient notification) ──────────────── */
export const Toast = ({ visible, message }) => {
  if (!visible) return null;
  return (
    <View pointerEvents="none" style={styles.toastWrap}>
      <View style={styles.toast}>
        <Ionicons name="checkmark-circle" size={18} color="#fff" />
        <Text style={styles.toastText}>{message}</Text>
      </View>
    </View>
  );
};

/* ── Bottom tab bar ──────────────────────────────── */
const TAB_ICONS = {
  Home: 'home',
  Progress: 'activity',
  Chat: 'message-circle',
  Therapists: 'users',
  Records: 'file-text',
  Profile: 'user',
};
export const BottomNav = ({ active, navigation, tabs }) => {
  const list = tabs || ['Home', 'Progress', 'Chat', 'Therapists', 'Profile'];
  const routeFor = {
    Home: 'Dashboard',
    Progress: 'Analytics',
    Chat: 'AIChat',
    Therapists: 'Therapists',
    Records: 'Records',
    Profile: 'Profile',
  };
  return (
    <View style={styles.bnav}>
      {list.map((t) => {
        const on = t === active;
        return (
          <TouchableOpacity
            key={t}
            style={styles.bni}
            activeOpacity={0.7}
            onPress={() => !on && navigation.navigate(routeFor[t])}
          >
            <Feather
              name={TAB_ICONS[t]}
              size={22}
              color={on ? colors.sage : colors.t3}
            />
            <Text style={[styles.bniText, on && { color: colors.sage }]}>{t}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

/* ── Row helpers ─────────────────────────────────── */
export const Row = ({ style, children, ...p }) => (
  <View style={[{ flexDirection: 'row', alignItems: 'center' }, style]} {...p}>{children}</View>
);
export const RowSB = ({ style, children, ...p }) => (
  <View
    style={[
      { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
      style,
    ]}
    {...p}
  >
    {children}
  </View>
);

/* ── Emoji avatar circle ─────────────────────────── */
export const EmojiCircle = ({ emoji, size = 44, gradient = true, bg, style }) => {
  const content = <Text style={{ fontSize: size * 0.47 }}>{emoji}</Text>;
  const s = {
    width: size,
    height: size,
    borderRadius: size / 2,
    alignItems: 'center',
    justifyContent: 'center',
  };
  if (gradient) {
    return (
      <LinearGradient colors={gradients.brand} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[s, style]}>
        {content}
      </LinearGradient>
    );
  }
  return <View style={[s, { backgroundColor: bg || colors.subtle }, style]}>{content}</View>;
};

const styles = StyleSheet.create({
  h1: { fontFamily: fonts.serif, fontSize: 26, lineHeight: 31, color: colors.t1 },
  h2: { fontFamily: fonts.serif, fontSize: 20, lineHeight: 26, color: colors.t1 },
  h3: { fontFamily: fonts.serif, fontSize: 17, lineHeight: 23, color: colors.t1 },
  body: { fontFamily: fonts.sans, fontSize: 13, lineHeight: 21, color: colors.t2 },
  small: { fontFamily: fonts.sans, fontSize: 11, color: colors.t2 },
  tiny: { fontFamily: fonts.sans, fontSize: 10, color: colors.t3 },
  label: {
    fontFamily: fonts.sansSemiBold,
    fontSize: 10,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: colors.t3,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.r3,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.sh1,
  },
  cardSm: {
    backgroundColor: colors.surface,
    borderRadius: radius.r2,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 11,
    paddingVertical: 4,
    borderRadius: 20,
  },
  pillText: { fontFamily: fonts.sansMedium, fontSize: 11 },
  btn: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: radius.r2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: { fontFamily: fonts.sansMedium, fontSize: 14, color: '#fff' },
  btnO: {
    width: '100%',
    paddingVertical: 14,
    borderWidth: 1.5,
    borderColor: colors.border2,
    borderRadius: radius.r2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnOText: { fontFamily: fonts.sans, fontSize: 13, color: colors.t2 },
  inp: {
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 13,
    backgroundColor: colors.inputBg,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.r1,
    color: colors.t1,
    fontFamily: fonts.sans,
    fontSize: 13,
  },
  pbar: { backgroundColor: colors.subtle, borderRadius: 3, overflow: 'hidden' },
  sb: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 8 : 14,
    height: 34,
  },
  sbTime: { fontFamily: fonts.sansSemiBold, fontSize: 13 },
  sbPill: {
    position: 'absolute',
    top: 0,
    left: '50%',
    marginLeft: -50,
    width: 100,
    height: 24,
    backgroundColor: colors.surface,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },
  sbR: { flexDirection: 'row', gap: 6, alignItems: 'center' },
  scrHdr: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 10,
  },
  back: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 8,
  },
  shTitle: { fontFamily: fonts.sansSemiBold, fontSize: 14, color: colors.t1 },
  seeAll: { fontFamily: fonts.sansMedium, fontSize: 12, color: colors.sage },
  toastWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(30,37,48,0.92)',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 16,
  },
  toastText: { color: '#fff', fontFamily: fonts.sansMedium, fontSize: 13 },
  bnav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.98)',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 10,
    paddingBottom: Platform.OS === 'ios' ? 24 : 14,
  },
  bni: { alignItems: 'center', gap: 3, minWidth: 54 },
  bniText: { fontFamily: fonts.sansMedium, fontSize: 9, color: colors.t3 },
});

export { styles as componentStyles };
