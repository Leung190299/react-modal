import { useState } from 'react';
import { ModalProvider, modal, useModal } from '../src/index';
import './styles.css';

// Example modal content component
const ExampleModalContent = () => {
  const [inputValue, setInputValue] = useState('');
  const { close, done } = useModal();
  return (
    <div style={{ minWidth: '300px' }}>
      <h2 style={{ marginTop: 0 }}>Example Modal</h2>
      <p>This is a centered modal with scale animation</p>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter something..."
        style={{
          width: '100%',
          padding: '8px',
          marginBottom: '16px',
          border: '1px solid #ddd',
          borderRadius: '4px',
        }}
      />
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
        <button
          onClick={close}
          style={{
            padding: '8px 16px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            background: 'white',
            cursor: 'pointer',
          }}
        >
          Cancel
        </button>
        <button
          onClick={() => done({ value: inputValue })}
          style={{
            padding: '8px 16px',
            border: 'none',
            borderRadius: '4px',
            background: '#007bff',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

// Bottom sheet content
const BottomSheetContent = ({ close }: { close: () => void }) => {
  return (
    <div>
      <h2 style={{ marginTop: 0 }}>Bottom Sheet</h2>
      <p>This slides up from the bottom</p>
      <div style={{ marginTop: '20px' }}>
        <button
          onClick={close}
          style={{
            padding: '12px 24px',
            border: 'none',
            borderRadius: '4px',
            background: '#28a745',
            color: 'white',
            cursor: 'pointer',
            width: '100%',
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

function App() {
  const openCenteredModal = () => {
    modal.open({
      id: 'centered-modal',
      render: <ExampleModalContent/>,
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
        <div>
          <h2 style={{ margin: '0 0 16px 0', color: '#ff6b6b' }}>Custom Styled Modal</h2>
          <p>This modal has custom styling</p>
          <button
            onClick={close}
            style={{
              marginTop: '16px',
              padding: '8px 16px',
              border: 'none',
              borderRadius: '4px',
              background: '#ff6b6b',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            Close
          </button>
        </div>
      ),
      styleOverlay: 'custom-overlay',
      styleBoxContent: 'custom-content',
      isButtonClose: true,
    });
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif' }}>
      <h1>React Modal Demo (Web)</h1>
      <p>Test the modal animations with different configurations</p>
      
      <div style={{ display: 'flex', gap: '16px', flexDirection: 'column', maxWidth: '300px' }}>
        <button
          onClick={openCenteredModal}
          style={{
            padding: '12px 24px',
            border: 'none',
            borderRadius: '4px',
            background: '#007bff',
            color: 'white',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          Open Centered Modal
        </button>

        <button
          onClick={openBottomSheet}
          style={{
            padding: '12px 24px',
            border: 'none',
            borderRadius: '4px',
            background: '#28a745',
            color: 'white',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          Open Bottom Sheet
        </button>

        <button
          onClick={openCustomStyledModal}
          style={{
            padding: '12px 24px',
            border: 'none',
            borderRadius: '4px',
            background: '#ff6b6b',
            color: 'white',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          Open Custom Styled Modal
        </button>
      </div>

      <ModalProvider platform="web" />
    </div>
  );
}

export default App;


