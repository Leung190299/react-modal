# React Modal

A flexible and animated modal library for React and React Native with GSAP (web) and Reanimated (mobile) animations.

## ✨ Features

- 🎨 **Smooth Animations**: GSAP for web, React Native Reanimated for mobile
- 📱 **Cross-Platform**: Works on both web and React Native
- 🎭 **Two Modal Types**: Centered modal and bottom sheet
- 🎯 **Easy to Use**: Simple API with modal manager
- 🎨 **Customizable Styles**: Support for custom styling
- ⚡ **Lightweight**: Minimal dependencies
- 🔧 **TypeScript Support**: Full type definitions included

## 📦 Installation

### For Web Projects

```bash
npm install @your-username/react-modal gsap
# or
yarn add @your-username/react-modal gsap
# or
pnpm add @your-username/react-modal gsap
```

### For React Native Projects

```bash
npm install @your-username/react-modal react-native-reanimated
# or
yarn add @your-username/react-modal react-native-reanimated
# or
pnpm add @your-username/react-modal react-native-reanimated
```

For React Native Reanimated setup, follow their [installation guide](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation).

## 🚀 Quick Start

### 1. Wrap your app with ModalProvider

#### Web (React)

```tsx
import { ModalProvider } from '@your-username/react-modal';

function App() {
  return (
    <>
      {/* Your app content */}
      <YourComponents />
      
      {/* Add ModalProvider at the end */}
      <ModalProvider platform="web" />
    </>
  );
}
```

#### Mobile (React Native)

```tsx
import { ModalProvider } from '@your-username/react-modal';

function App() {
  return (
    <>
      {/* Your app content */}
      <YourComponents />
      
      {/* Add ModalProvider at the end */}
      <ModalProvider platform="mobile" />
    </>
  );
}
```

### 2. Open a modal from anywhere

```tsx
import { modal } from '@your-username/react-modal';

function MyComponent() {
  const openModal = () => {
    modal.open({
      id: 'my-modal',
      render: ({ close, done }) => (
        <div>
          <h2>Hello Modal!</h2>
          <button onClick={close}>Close</button>
          <button onClick={() => done({ result: 'success' })}>Submit</button>
        </div>
      ),
      onClose: () => console.log('Modal closed'),
      onDone: (data) => console.log('Modal submitted:', data),
    });
  };

  return <button onClick={openModal}>Open Modal</button>;
}
```

### 3. Use with useModal hook (inside modal content)

```tsx
import { useModal } from '@your-username/react-modal';

function ModalContent() {
  const { close, done } = useModal();
  
  return (
    <div>
      <h2>Modal Content</h2>
      <button onClick={close}>Cancel</button>
      <button onClick={() => done({ value: 'data' })}>Submit</button>
    </div>
  );
}

// Open it
modal.open({
  id: 'content-modal',
  render: ModalContent,
});
```

## 📖 API Reference

### `modal.open(options)`

Open a new modal with the specified options.

**Options:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `string` | Yes | Unique identifier for the modal |
| `render` | `React.ReactNode \| Component` | Yes | Content to render inside modal |
| `type` | `'modal' \| 'bottomSheet'` | No | Modal type (default: `'modal'`) |
| `isButtonClose` | `boolean` | No | Show close button (default: `true`) |
| `styleOverlay` | `string \| CSSProperties \| StyleProp` | No | Custom overlay style |
| `styleBoxContent` | `string \| CSSProperties \| StyleProp` | No | Custom content box style |
| `styleButtonClose` | `string \| CSSProperties \| StyleProp` | No | Custom close button style |
| `onClose` | `() => void` | No | Callback when modal closes |
| `onDone` | `(data) => void` | No | Callback when modal submits |

### `useModal()`

Hook to access modal context inside modal content.

**Returns:**

```tsx
{
  close: () => void;      // Close the modal
  done: (data) => void;   // Submit and close with data
  id: string;             // Modal ID
  // ... other modal options
}
```

### `<ModalProvider />`

Provider component to manage modals.

**Props:**

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `platform` | `'web' \| 'mobile'` | No | `'web'` | Platform to render for |

## 🎨 Examples

### Centered Modal

```tsx
modal.open({
  id: 'centered-modal',
  type: 'modal', // default
  render: ({ close }) => (
    <div style={{ padding: '20px', minWidth: '300px' }}>
      <h2>Centered Modal</h2>
      <p>This appears in the center with scale animation</p>
      <button onClick={close}>Close</button>
    </div>
  ),
});
```

### Bottom Sheet

```tsx
modal.open({
  id: 'bottom-sheet',
  type: 'bottomSheet',
  render: ({ close }) => (
    <div style={{ padding: '20px' }}>
      <h2>Bottom Sheet</h2>
      <p>This slides up from the bottom</p>
      <button onClick={close}>Close</button>
    </div>
  ),
});
```

### Custom Styled Modal (Web)

```tsx
modal.open({
  id: 'custom-modal',
  render: ({ close }) => <YourComponent />,
  styleOverlay: 'custom-overlay-class', // or inline style object
  styleBoxContent: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '16px',
    padding: '32px',
  },
  styleButtonClose: {
    color: 'white',
  },
});
```

### With Form Data

```tsx
import { useState } from 'react';

function FormModal({ close, done }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    done({ name, email });
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
      <h2>Enter Your Info</h2>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        type="email"
      />
      <button type="submit">Submit</button>
      <button type="button" onClick={close}>Cancel</button>
    </form>
  );
}

modal.open({
  id: 'form-modal',
  render: FormModal,
  onDone: (data) => {
    console.log('Form submitted:', data);
    // Handle form data
  },
});
```

### React Native Example

```tsx
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { modal } from '@your-username/react-modal';

function MyScreen() {
  const openBottomSheet = () => {
    modal.open({
      id: 'native-sheet',
      type: 'bottomSheet',
      render: ({ close }) => (
        <View style={styles.sheet}>
          <Text style={styles.title}>Bottom Sheet</Text>
          <TouchableOpacity onPress={close} style={styles.button}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      ),
      styleBoxContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      },
    });
  };

  return (
    <TouchableOpacity onPress={openBottomSheet}>
      <Text>Open Bottom Sheet</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  sheet: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
});
```

## 🎬 Animation Details

### Web (GSAP)
- **Centered Modal**: Scale from 0.8 to 1 with back ease and fade in
- **Bottom Sheet**: Slide up from bottom with smooth easing
- **Overlay**: Fade in/out

### Mobile (Reanimated)
- **Centered Modal**: Spring animation with scale and fade
- **Bottom Sheet**: Slide up animation with spring physics
- **Overlay**: Fade in/out

## 🔧 TypeScript

Full TypeScript support included. All types are exported:

```tsx
import type { Modal } from '@your-username/react-modal';

// Access type definitions
type ModalOptions = Modal.ModalOptions;
type BaseModalProps = Modal.BaseModalProps;
```

## 📝 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📮 Support

If you have any questions or issues, please open an issue on GitHub.
