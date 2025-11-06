import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';
import useModal from '../hooks/useModal';



const BaseModalWeb: React.FC<Modal.BaseModalProps> = ({
    isOpen,
    type = 'modal',
    isButtonClose = true,
    styleButtonClose,
    children,
    styleOverlay,
    styleBoxContent,
}) => {
    const overlayRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const { close } = useModal();

    useEffect(() => {
        if (!modalRef.current) return;

        if (isOpen) {
            // Show modal
            modalRef.current.style.display = 'flex';

            // Animate in
            const tl = gsap.timeline();
            tl.fromTo(
                overlayRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.3, ease: 'power2.out' }
            );

            if (type === 'bottomSheet') {
                tl.fromTo(
                    contentRef.current,
                    { y: '100%', opacity: 1 },
                    { y: 0, duration: 0.4, ease: 'power2.out' },
                    '-=0.2'
                );
            } else {
                tl.fromTo(
                    contentRef.current,
                    { scale: 0.8, opacity: 0, y: 50 },
                    { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)' },
                    '-=0.2'
                );
            }
        } else {
            // Animate out
            const tl = gsap.timeline({
                onComplete: () => {
                    if (modalRef.current) {
                        modalRef.current.style.display = 'none';
                    }
                },
            });

            if (type === 'bottomSheet') {
                tl.to(contentRef.current, {
                    y: '100%',
                    duration: 0.3,
                    ease: 'power2.in',
                }).to(
                    overlayRef.current,
                    { opacity: 0, duration: 0.2, ease: 'power2.in' },
                    '-=0.1'
                );
            } else {
                tl.to(contentRef.current, {
                    scale: 0.8,
                    opacity: 0,
                    y: 50,
                    duration: 0.3,
                    ease: 'power2.in',
                }).to(
                    overlayRef.current,
                    { opacity: 0, duration: 0.2, ease: 'power2.in' },
                    '-=0.1'
                );
            }
        }
    }, [isOpen, type]);

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === overlayRef.current ) {
            close();
        }
    };

    const handleCloseClick = () => {
        close();
    };

    // Convert string className to style object if needed
    const getStyleProp = (style: string | React.CSSProperties | undefined) => {
        if (typeof style === 'string') {
            return { className: style };
        }
        return { style };
    };

    const overlayProps = getStyleProp(styleOverlay);
    const contentProps = getStyleProp(styleBoxContent);
    const closeButtonProps = getStyleProp(styleButtonClose);

    const defaultOverlayStyle: React.CSSProperties = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: type === 'bottomSheet' ? 'flex-end' : 'center',
        justifyContent: 'center',
        zIndex: 1000,
    };

    const defaultContentStyle: React.CSSProperties = {
        backgroundColor: 'white',
        borderRadius: type === 'bottomSheet' ? '16px 16px 0 0' : '8px',
        padding: '24px',
        position: 'relative',
        maxWidth: type === 'bottomSheet' ? '100%' : '90%',
        width: type === 'bottomSheet' ? '100%' : 'auto',
        maxHeight: '90%',
        overflow: 'auto',
    };

    const defaultCloseButtonStyle: React.CSSProperties = {
        position: 'absolute',
        top: '12px',
        right: '12px',
        background: 'transparent',
        border: 'none',
        fontSize: '24px',
        cursor: 'pointer',
        padding: '4px 8px',
        lineHeight: 1,
        color: '#666',
    };

    return (
        <div
            ref={modalRef}
            style={{ display: 'none' }}
        >
            <div
                ref={overlayRef}
                onClick={handleOverlayClick}
                {...(overlayProps.className ? { className: overlayProps.className } : {})}
                style={{
                    ...defaultOverlayStyle,
                    ...(overlayProps.style as React.CSSProperties),
                }}
            >
                <div
                    ref={contentRef}
                    {...(contentProps.className ? { className: contentProps.className } : {})}
                    style={{
                        ...defaultContentStyle,
                        ...(contentProps.style as React.CSSProperties),
                    }}
                >
                    {isButtonClose && (
                        <button
                            onClick={handleCloseClick}
                            {...(closeButtonProps.className ? { className: closeButtonProps.className } : {})}
                            style={{
                                ...defaultCloseButtonStyle,
                                ...(closeButtonProps.style as React.CSSProperties),
                            }}
                            aria-label="Close modal"
                        >
                            ×
                        </button>
                    )}
                    {children}
                </div>
            </div>
        </div>
    );
};

export default BaseModalWeb;
