import { StyleSheet, Dimensions } from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  mapContainer: {
    flex: 1,
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


