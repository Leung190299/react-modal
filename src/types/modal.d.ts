
declare namespace Modal {

	interface ModalOptions<T = any> {
		id: string;
		render: React.ReactNode | React.ComponentType<ModalRenderProps<T>>;
		onClose?(): void;
		onDone?(data: T): void | Promise<any>;
	}

	interface OptionsModalContextWeb extends ModalOptions, Omit<BaseModalProps, 'children' | 'isOpen'> {
		close: () => void;
		done: (data: any) => void;
	}

	interface OptionsModalContextMobile extends ModalOptions, Omit<BaseModalMobileProps, 'children' | 'isOpen'> {
		close: () => void;
		done: (data: any) => void;
	}

	type OptionsModalContext = OptionsModalContextWeb | OptionsModalContextMobile;

	interface BaseModalProps {
		isOpen: boolean;
		type?: 'modal' | 'bottomSheet';
		isButtonClose?: boolean;
		styleButtonClose?: string | React.CSSProperties;
		children: React.ReactNode;
		styleOverlay?: string | React.CSSProperties;
		styleBoxContent?: string | React.CSSProperties;
	}

	interface BaseModalMobileProps {
		isOpen: boolean;
		type?: 'modal' | 'bottomSheet';
		isButtonClose?: boolean;
		styleButtonClose?: any;
		children: React.ReactNode;
		styleOverlay?: any;
		styleBoxContent?: any;
	}

}