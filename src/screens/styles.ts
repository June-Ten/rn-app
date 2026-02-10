import { StyleSheet, Dimensions } from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  settingRoot: {
    flex: 1,
    backgroundColor: '#f5f6f8',
    paddingHorizontal: 16,
  },
  settingScrollContent: {
    paddingBottom: 24,
  },
  settingTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginTop: 8,
  },
  settingSubTitle: {
    color: '#6b7280',
    marginTop: 6,
    marginBottom: 14,
  },
  card: {
    borderRadius: 14,
    marginTop: 12,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
  },
  cardContent: {
    paddingTop: 8,
  },
  primaryButton: {
    borderRadius: 12,
  },
  buttonContent: {
    height: 44,
  },
  mutedText: {
    color: '#6b7280',
    marginBottom: 10,
  },
  progress: {
    height: 8,
    borderRadius: 8,
    marginBottom: 12,
  },
  updateBanner: {
    width: '100%',
  },
  mapContainer: {
    flex: 1,
  },
  mapTopBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    paddingHorizontal: 12,
  },
  mapBackBtn: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(17,24,39,0.12)',
  },
  mapBackText: {
    color: '#111827',
    fontSize: 14,
    fontWeight: '600',
  },
  listContainer: {
    flex: 1,
    width: '100%',
    marginTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
  },
  listItem: {
    fontSize: 18,
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  counterText: {
    fontSize: 18,
    marginBottom: 12,
  },
  actionSheetContent: {
    padding: 16,
  },
  actionSheetText: {
    fontSize: 16,
    marginBottom: 12,
  },
  actionSheetListContainer: {
    height: SCREEN_HEIGHT * 0.4, // 使用屏幕高度的 40%
    width: '100%',
    marginTop: 16,
    marginBottom: 16,
  },
});


