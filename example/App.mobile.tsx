import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ModalProvider } from '../src/core/ModalProvider';
import { modal } from '../src/core/eventManager';

// Example modal content component
const ExampleModalContent = ({ close, done }: { close: () => void; done: (data: any) => void }) => {
  const [inputValue, setInputValue] = useState('');

  return (
    <View style={{ minWidth: 300 }}>
      <Text style={styles.title}>Example Modal</Text>
      <Text style={styles.description}>This is a centered modal with scale animation</Text>
      <TextInput
        value={inputValue}
        onChangeText={setInputValue}
        placeholder="Enter something..."
        style={styles.input}
      />
      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={close} style={[styles.button, styles.cancelButton]}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => done({ value: inputValue })}
          style={[styles.button, styles.submitButton]}
        >
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Bottom sheet content
const BottomSheetContent = ({ close }: { close: () => void }) => {
  return (
    <View>
      <Text style={styles.title}>Bottom Sheet</Text>
      <Text style={styles.description}>This slides up from the bottom</Text>
      <TouchableOpacity onPress={close} style={[styles.button, styles.closeButton]}>
        <Text style={styles.submitText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

function AppMobile() {
  const openCenteredModal = () => {
    modal.open({
      id: 'centered-modal',
      render: ExampleModalContent,
      onDone: (data: any) => {
        console.log('Modal submitted with:', data);
      },
      onClose: () => {
        console.log('Modal closed');
      },
    });
  };

  const openBottomSheet = () => {
    modal.open({
      id: 'bottom-sheet',
      type: 'bottomSheet',
      render: BottomSheetContent,
      onClose: () => {
        console.log('Bottom sheet closed');
      },
    });
  };

  const openCustomStyledModal = () => {
    modal.open({
      id: 'custom-modal',
      render: ({ close }: any) => (
        <View>
          <Text style={[styles.title, { color: '#ff6b6b' }]}>Custom Styled Modal</Text>
          <Text style={styles.description}>This modal has custom styling</Text>
          <TouchableOpacity onPress={close} style={[styles.button, { backgroundColor: '#ff6b6b' }]}>
            <Text style={styles.submitText}>Close</Text>
          </TouchableOpacity>
        </View>
      ),
      styleOverlay: { backgroundColor: 'rgba(255, 107, 107, 0.3)' },
      styleBoxContent: { backgroundColor: '#764ba2', borderRadius: 16 },
      isButtonClose: true,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>React Modal Demo (Mobile)</Text>
      <Text style={styles.subtitle}>Test the modal animations with different configurations</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={openCenteredModal} style={[styles.demoButton, styles.blueButton]}>
          <Text style={styles.demoButtonText}>Open Centered Modal</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={openBottomSheet} style={[styles.demoButton, styles.greenButton]}>
          <Text style={styles.demoButtonText}>Open Bottom Sheet</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={openCustomStyledModal} style={[styles.demoButton, styles.redButton]}>
          <Text style={styles.demoButtonText}>Open Custom Styled Modal</Text>
        </TouchableOpacity>
      </View>

      <ModalProvider platform="mobile" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: '#f5f5f5',
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },
  buttonContainer: {
    gap: 16,
  },
  demoButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  blueButton: {
    backgroundColor: '#007bff',
  },
  greenButton: {
    backgroundColor: '#28a745',
  },
  redButton: {
    backgroundColor: '#ff6b6b',
  },
  demoButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    backgroundColor: '#f9f9f9',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'flex-end',
  },
  button: {
    padding: 12,
    borderRadius: 4,
    minWidth: 80,
    alignItems: 'center',
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: 'white',
  },
  cancelText: {
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#007bff',
  },
  closeButton: {
    backgroundColor: '#28a745',
    marginTop: 20,
  },
  submitText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default AppMobile;
