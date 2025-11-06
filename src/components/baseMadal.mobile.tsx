import React, { useEffect } from 'react';
import {
    Dimensions,
    Modal,
    Pressable,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming
} from 'react-native-reanimated';
import useModal from '../hooks/useModal';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const BaseModalMobile: React.FC<Modal.BaseModalMobileProps> = ({
  isOpen,
  type = 'modal',
  isButtonClose = true,
  styleButtonClose,
  children,
  styleOverlay,
  styleBoxContent,

}) => {
  const overlayOpacity = useSharedValue(0);
  const contentTranslateY = useSharedValue(type === 'bottomSheet' ? SCREEN_HEIGHT : 50);
  const contentScale = useSharedValue(0.8);
  const contentOpacity = useSharedValue(0);
  const { close } = useModal();

  useEffect(() => {
    if (isOpen) {
      // Animate in
      overlayOpacity.value = withTiming(1, { duration: 300 });

      if (type === 'bottomSheet') {
        contentTranslateY.value = withSpring(0, {
          damping: 20,
          stiffness: 300,
        });
        contentOpacity.value = withTiming(1, { duration: 200 });
      } else {
        contentScale.value = withSpring(1, {
          damping: 15,
          stiffness: 300,
        });
        contentOpacity.value = withTiming(1, { duration: 300 });
        contentTranslateY.value = withSpring(0, {
          damping: 20,
          stiffness: 300,
        });
      }
    } else {
      // Animate out
      overlayOpacity.value = withTiming(0, { duration: 200 });

      if (type === 'bottomSheet') {
        contentTranslateY.value = withTiming(SCREEN_HEIGHT, {
          duration: 300,
        });
      } else {
        contentScale.value = withTiming(0.8, { duration: 300 });
        contentOpacity.value = withTiming(0, { duration: 200 });
        contentTranslateY.value = withTiming(50, { duration: 300 });
      }
    }
  }, [isOpen, type]);

  const overlayAnimatedStyle = useAnimatedStyle(() => ({
    opacity: overlayOpacity.value,
  }));

  const contentAnimatedStyle = useAnimatedStyle(() => {
    if (type === 'bottomSheet') {
      return {
        transform: [{ translateY: contentTranslateY.value }],
        opacity: contentOpacity.value,
      };
    } else {
      return {
        transform: [
          { scale: contentScale.value },
          { translateY: contentTranslateY.value },
        ],
        opacity: contentOpacity.value,
      };
    }
  });

  const handleOverlayPress = () => {
   close();
  };

  const handleClosePress = () => {
    close();

  };

  return (
    <Modal
      transparent
      visible={isOpen}
      animationType="none"
      statusBarTranslucent
    >
      <View style={styles.modalContainer}>
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={handleOverlayPress}
        >
          <Animated.View
            style={[
              styles.overlay,
              type === 'bottomSheet' ? styles.overlayBottomSheet : styles.overlayModal,
              overlayAnimatedStyle,
              styleOverlay,
            ]}
          />
        </Pressable>

        <Animated.View
          style={[
            styles.content,
            type === 'bottomSheet' ? styles.contentBottomSheet : styles.contentModal,
            contentAnimatedStyle,
            styleBoxContent,
          ]}
        >
          {isButtonClose && (
            <TouchableOpacity
              onPress={handleClosePress}
              style={[styles.closeButton, styleButtonClose]}
              activeOpacity={0.7}
            >
              <View style={styles.closeButtonText}>
                <View style={styles.closeIcon} />
              </View>
            </TouchableOpacity>
          )}
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  overlayModal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayBottomSheet: {
    justifyContent: 'flex-end',
  },
  content: {
    backgroundColor: 'white',
    padding: 24,
    position: 'relative',
  },
  contentModal: {
    borderRadius: 8,
    maxWidth: '90%',
    maxHeight: '90%',
  },
  contentBottomSheet: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    width: '100%',
    maxHeight: '90%',
    position: 'absolute',
    bottom: 0,
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  closeButtonText: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    width: 20,
    height: 20,
    backgroundColor: '#666',
    opacity: 0.8,
  },
});

export default BaseModalMobile;
