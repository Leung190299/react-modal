# @leung99/react-modal

A flexible and powerful modal library for React with beautiful GSAP animations. Support centered modals and bottom sheets with customizable styles.

## ✨ Features

- 🎨 **Smooth Animations**: Powered by GSAP for fluid, professional animations
- 🎭 **Two Modal Types**: Centered modal with scale animation and bottom sheet with slide-up effect
- 🎯 **Simple API**: Event-based modal manager for opening modals from anywhere
- 💅 **Highly Customizable**: Custom styles via className or inline styles
- ⚡ **Lightweight**: Minimal dependencies, optimized performance
- 🔧 **TypeScript**: Full type definitions included
- ♻️ **React Hooks**: Built with modern React patterns

## 📦 Installation

```bash
npm install @leung99/react-modal gsap
# or
yarn add @leung99/react-modal gsap
# or
pnpm add @leung99/react-modal gsap
```

**Note**: GSAP is a peer dependency and must be installed separately.

## 🚀 Quick Start

### 1. Add ModalProvider to your app

Place the `ModalProvider` component at the root level of your app (typically in `App.tsx` or `_app.tsx`):

```tsx
import { ModalProvider } from '@leung99/react-modal';

function App() {
  return (
    <>
      {/* Your app content */}
      <YourComponents />
      
      {/* Add ModalProvider at the end */}
      <ModalProvider />
    </>
  );
}
```

### 2. Open a modal from anywhere

```tsx
import { modal } from '@leung99/react-modal';

function MyComponent() {
  const handleOpen = () => {
    modal.open({
      render: ({ close, done }) => (
        <div>
          <h2>Hello Modal!</h2>
          <button onClick={close}>Close</button>
          <button onClick={() => done({ result: 'success' })}>Submit</button>
        </div>
      ),
      onClose: () => console.log('Modal closed'),
      onDone: (data) => console.log('Submitted:', data),
    });
  };

  return <button onClick={handleOpen}>Open Modal</button>;
}
```

### 3. Use with useModal hook

The `useModal` hook provides access to modal context when used inside modal content:

```tsx
import { modal, useModal } from '@leung99/react-modal';

function ModalContent() {
  const { close, done, id } = useModal();
  
  return (
    <div>
      <h2>Modal Content</h2>
      <p>Modal ID: {id}</p>
      <button onClick={close}>Cancel</button>
      <button onClick={() => done({ value: 'data' })}>Submit</button>
    </div>
  );
}

// Open it
modal.open({
  id: 'content-modal',
  render: <ModalContent />,
});
```

## 📖 API Reference

### `modal.open(options)`

Opens a new modal with the specified configuration.

#### Options

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `id` | `string` | ✅ Yes | - | Unique identifier for the modal |
| `render` | `ReactNode \| Component` | ✅ Yes | - | Modal content to render |
| `type` | `'modal' \| 'bottomSheet'` | No | `'modal'` | Type of modal animation |
| `isButtonClose` | `boolean` | No | `true` | Show/hide the close button (×) |
| `styleOverlay` | `string \| CSSProperties` | No | - | Custom styles for the overlay backdrop |
| `styleBoxContent` | `string \| CSSProperties` | No | - | Custom styles for the modal content box |
| `styleButtonClose` | `string \| CSSProperties` | No | - | Custom styles for the close button |
| `onClose` | `() => void` | No | - | Callback when modal is closed |
| `onDone` | `(data) => void \| Promise<any>` | No | - | Callback when done() is called |

#### Render Props

When using a function component for `render`, it receives these props:

```tsx
interface ModalRenderProps<T = any> {
  close: () => void;          // Close the modal
  done: (data: T) => void;    // Submit data and close
}
```

### `useModal()`

Hook to access modal context. Must be used inside modal content.

**Returns:**

```tsx
{
  id: string;                    // Modal ID
  close: () => void;             // Close the modal
  done: (data: any) => void;     // Submit and close with data
  type?: 'modal' | 'bottomSheet'; // Modal type
  isButtonClose?: boolean;       // Close button visibility
  styleOverlay?: string | CSSProperties;
  styleBoxContent?: string | CSSProperties;
  styleButtonClose?: string | CSSProperties;
  // ... other modal options
}
```

### `<ModalProvider />`

Provider component that manages and renders all modals. Must be included once in your app.

```tsx
<ModalProvider />
```

## 🎨 Examples

### Basic Centered Modal

```tsx
import { modal } from '@leung99/react-modal';

modal.open({
  id: 'basic-modal',
  render: ({ close }) => (
    <div style={{ padding: '20px', minWidth: '300px' }}>
      <h2>Basic Modal</h2>
      <p>This is a centered modal with scale animation</p>
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
      <p>This slides up from the bottom of the screen</p>
      <button onClick={close}>Close</button>
    </div>
  ),
});
```

### Custom Styled Modal

You can use CSS classes or inline styles:

```tsx
// Using CSS class
modal.open({
  render: <YourComponent />,
  styleOverlay: 'my-custom-overlay',
  styleBoxContent: 'my-custom-content',
});

// Using inline styles
modal.open({
  render: <YourComponent />,
  styleBoxContent: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '16px',
    padding: '32px',
    color: 'white',
  },
  styleButtonClose: {
    color: 'white',
  },
});
```

### Form Modal with Data Submission

```tsx
import { useState } from 'react';
import { modal, useModal } from '@leung99/react-modal';

function FormModal() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { close, done } = useModal();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    done({ name, email });
  };

  return (
    <form onSubmit={handleSubmit} style={{ minWidth: '300px' }}>
      <h2>Contact Form</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
        <button type="button" onClick={close}>Cancel</button>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

// Open and handle submission
modal.open({
  id: 'form-modal',
  render: <FormModal />,
  onDone: async (data) => {
    console.log('Form data:', data);
    // You can perform async operations here
    await sendToAPI(data);
  },
});
```

### Modal Without Close Button

```tsx
modal.open({
  id: 'no-close-btn',
  isButtonClose: false,
  render: ({ close }) => (
    <div>
      <h2>No Close Button</h2>
      <p>You must use the button below to close</p>
      <button onClick={close}>Done</button>
    </div>
  ),
});
```

## 🎬 Animation Details

### Centered Modal
- **Entry**: Scale from 0.8 to 1.0 with back easing + fade in + slight upward movement
- **Exit**: Scale down to 0.8 with fade out + downward movement
- **Duration**: 400ms entry, 300ms exit

### Bottom Sheet
- **Entry**: Slide up from bottom (translateY: 100% → 0)
- **Exit**: Slide down to bottom (translateY: 0 → 100%)
- **Duration**: 400ms entry, 300ms exit

### Overlay
- **Entry**: Fade in (opacity: 0 → 1) over 300ms
- **Exit**: Fade out (opacity: 1 → 0) over 200ms

All animations use GSAP's `power2` easing for smooth, professional motion.

## 🔧 TypeScript

Full TypeScript support with comprehensive type definitions:

```tsx
import type { Modal } from '@leung99/react-modal';

// Available types
type ModalOptions = Modal.ModalOptions;
type BaseModalProps = Modal.BaseModalProps;
type OptionsModalContext = Modal.OptionsModalContext;
```

## 📝 License

MIT © [Leung190299](https://github.com/Leung190299)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](https://github.com/Leung190299/react-modal/issues).

## 📮 Support

If you like this project, please give it a ⭐️ on [GitHub](https://github.com/Leung190299/react-modal)!

For questions or issues, please [open an issue](https://github.com/Leung190299/react-modal/issues).
