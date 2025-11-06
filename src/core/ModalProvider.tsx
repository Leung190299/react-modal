import { createContext, useCallback, useEffect, useRef, useState } from "react";
import BaseModalWeb from "../components/baseModal.web";
import { eventManager, listeners } from "./eventManager";

const ModalContext = createContext<Modal.OptionsModalContext>({} as Modal.OptionsModalContext);

function ModalProvider<P extends 'web' | 'mobile' = 'web'>({platform = 'web' as P}: {platform?: P}) {
    const [modalIds, setModalIds] = useState<Record<string, boolean>>({})
    const [updateTrigger, setUpdateTrigger] = useState(0);
    const modalRender = useRef(new Map<string, { content: React.ReactNode; data: Modal.OptionsModalContext }>()).current;

    if (platform === 'mobile') {
        throw new Error('Mobile platform is not supported in web build. Please use the React Native build for mobile support.');
    }

     useEffect(() => {
        // Subscribe to modal changes
        const listener = () => {
            setUpdateTrigger(prev => prev + 1);
        };
        listeners.add(listener);

        return () => {
            listeners.delete(listener);
        };
    }, []);

    const removeModal = useCallback((modalId?: string) => {
        if (modalId == null) {
            setModalIds({});
        } else {
            setModalIds((state) => {
                const { [modalId]: remove, ...newState } = state;
                return newState;
            });
            modalRender.delete(modalId);
        }
    }, [modalRender]);

    const isNotValid = useCallback(
        (options: Modal.ModalOptions) => {
            return modalRender.has(options.id);
        },
        [modalRender]
    );

    const appendModal = useCallback(
        (content: React.ReactNode, modalProps: Modal.OptionsModalContext) => {
            const { id } = modalProps;
            modalRender.set(id, { content, data: modalProps as any });
            setModalIds((state) => ({ ...state, [id]: true }));
        },
        [modalRender]
    );

    const buildModal = useCallback(
        (options: Modal.ModalOptions) => {
            const newOptions = Object.assign({}, { ...options });
            if (isNotValid(newOptions)) return;

            const Render = newOptions.render;
            const modalRenderProps = {
                close() {
                    newOptions.onClose?.();
                    removeModal(newOptions.id);
                    eventManager.delete(newOptions.id);
                },
                async done(data: unknown) {
                    if (newOptions.onDone) await newOptions.onDone(data);
                    removeModal(newOptions.id);
                    eventManager.delete(newOptions.id);

                }
            };
            const modalProps: Modal.OptionsModalContext = {
                ...newOptions,
                ...modalRenderProps
            };
            const content = typeof Render === 'function' ? <Render {...modalRenderProps} /> : Render;
            appendModal(content, modalProps);
        },
        [appendModal, isNotValid, removeModal]
    );

    useEffect(() => {
        if (eventManager.size > 0) {
            eventManager.forEach((options) => {
                buildModal(options);
            });
        }
    }, [updateTrigger, buildModal]);

    const renderModal = (content: React.ReactNode, props: Modal.OptionsModalContext) => {
        const isVisible = modalIds[props.id] || false;
        return <BaseModalWeb key={props.id} isOpen={isVisible} {...(props as Modal.OptionsModalContextWeb)}>{content}</BaseModalWeb>;
    }

        return (
        <>
            {Array.from(modalRender.values()).map(({ content, data: props }) => {
                return (
                    <ModalContext.Provider key={props.id} value={props}>
                       { renderModal(content, props) }
                    </ModalContext.Provider>
                );
            })}
        </>
    );
}

export { ModalContext, ModalProvider };

