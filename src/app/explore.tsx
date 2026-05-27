import React from 'react';
import { Platform, Pressable, ScrollView, StyleSheet } from 'react-native';
import { Image, ImageSource } from 'expo-image';
import { SymbolView } from 'expo-symbols';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ExternalLink } from '@/components/external-link';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Collapsible } from '@/components/ui/collapsible';
import { WebBadge } from '@/components/web-badge';
import { useTheme } from '@/hooks/use-theme';

export default function TabTwoScreen() {
  const safeAreaInsets = useSafeAreaInsets();
  const theme = useTheme();

  const paddingTop = safeAreaInsets?.top ? Number(safeAreaInsets.top) : 0;
  const paddingLeft = safeAreaInsets?.left ? Number(safeAreaInsets.left) : 0;
  const paddingRight = safeAreaInsets?.right ? Number(safeAreaInsets.right) : 0;
  const safeBottom = safeAreaInsets?.bottom ? Number(safeAreaInsets.bottom) : 0;
  
  const tabInset = 49;
  const spacingThree = 12;
  const spacingSix = 24;
  const spacingFour = 16;

  const paddingBottom = safeBottom + tabInset + spacingThree;

  const paddingStyle = Platform.OS === 'web' 
    ? {
        paddingTop: spacingSix,
        paddingBottom: spacingFour,
      }
    : {
        paddingTop,
        paddingLeft,
        paddingRight,
        paddingBottom,
      };

  const combinedContentContainerStyle = StyleSheet.flatten([
    styles.contentContainer,
    paddingStyle,
  ]);

  return (
    <ScrollView
      style={[styles.scrollView, { backgroundColor: theme.background }]}
      contentContainerStyle={combinedContentContainerStyle}
    >
      <ThemedView style={styles.container}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="subtitle">Explore</ThemedText>
          <ThemedText style={styles.centerText} themeColor="textSecondary">
            This starter app includes example{'\n'}code to help you get started.
          </ThemedText>

          <ExternalLink href="https://docs.expo.dev" asChild>
            <Pressable style={({ pressed }) => [pressed && styles.pressed]}>
              <ThemedView type="backgroundElement" style={styles.linkButton}>
                <ThemedText type="link">Expo documentation</ThemedText>
                <SymbolView
                  tintColor={theme.text}
                  name={{ ios: 'arrow.up.right.square', android: 'link', web: 'link' }}
                  size={12}
                />
              </ThemedView>
            </Pressable>
          </ExternalLink>
        </ThemedView>

        <ThemedView style={styles.sectionsWrapper}>
          <Collapsible title="File-based routing">
            <ThemedText type="small">
              This app has two screens: <ThemedText type="code">src/app/index.tsx</ThemedText> and{' '}
              <ThemedText type="code">src/app/explore.tsx</ThemedText>
            </ThemedText>
            <ThemedText type="small">
              The layout file in <ThemedText type="code">src/app/_layout.tsx</ThemedText> sets up
              the tab navigator.
            </ThemedText>
            <ExternalLink href="https://docs.expo.dev/router/introduction">
              <ThemedText type="linkPrimary">Learn more</ThemedText>
            </ExternalLink>
          </Collapsible>

          <Collapsible title="Android, iOS, and web support">
            <ThemedView type="backgroundElement" style={styles.collapsibleContent}>
              <ThemedText type="small">
                You can open this project on Android, iOS, and the web. To open the web version,
                press <ThemedText type="smallBold">w</ThemedText> in the terminal running this
                project.
              </ThemedText>
              <Image
                source={require('@/assets/images/tutorial-web.png') as ImageSource}
                style={styles.imageTutorial}
              />
            </ThemedView>
          </Collapsible>

          <Collapsible title="Light and dark mode components">
            <ThemedText type="small">
              This template has light and dark mode support. The{' '}
              <ThemedText type="code">useColorScheme()</ThemedText> hook lets you inspect what the
              user's current color scheme is, and so you can adjust UI colors accordingly.
            </ThemedText>
            <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
              <ThemedText type="linkPrimary">Learn more</ThemedText>
            </ExternalLink>
          </Collapsible>

          <Collapsible title="Animations">
            <ThemedText type="small">
              This template includes an example of an animated component. The{' '}
              <ThemedText type="code">src/components/ui/collapsible.tsx</ThemedText> component uses
              the powerful <ThemedText type="code">react-native-reanimated</ThemedText> library to
              animate opening this hint.
            </ThemedText>
          </Collapsible>
        </ThemedView>

        {Platform.OS === 'web' && <WebBadge />}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container: {
    maxWidth: 960, // Fallback para MaxContentWidth antigo
    flexGrow: 1,
  },
  titleContainer: {
    gap: 12,
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  centerText: {
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
  linkButton: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    justifyContent: 'center',
    gap: 4,
    alignItems: 'center',
  },
  sectionsWrapper: {
    gap: 20,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  collapsibleContent: {
    alignItems: 'center',
  },
  imageTutorial: {
    width: '100%',
    aspectRatio: 296 / 171,
    borderRadius: 12,
    marginTop: 8,
  },
});