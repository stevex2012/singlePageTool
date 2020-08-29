import React, { Component } from "react";

import Modal from 'react-modal';
import styled from "styled-components";

const Container = styled.div({
    width: '600px'
})

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    },
    overlay: {
        background: 'rgba(0,0,0,0.5)',
        zIndex: '99'
    },
};

const CloseBtn = styled.div({
    position: 'absolute',
    top: '-5px',
    right: '-5px',
    cursor: 'pointer'
})

class MyModal extends Component {
    render() {
        const { visible, onClose, children, style = {}, hascloseBtn = true } = this.props
        return (
            <Container>
                <Modal
                    isOpen={visible}
                    onRequestClose={onClose}
                    style={{ ...customStyles, ...style }}
                    shouldCloseOnOverlayClick={true}
                >
                    <div style={{ position: 'relative' }}>
                        {hascloseBtn && <CloseBtn onClick={onClose}>
                            <svg t="1591348686391" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4014" width="20" height="20"><path d="M916.945455 954.181818c-9.309091 0-18.618182-4.654545-25.6-11.636363L81.454545 132.654545c-13.963636-13.963636-13.963636-37.236364 0-51.2 13.963636-13.963636 37.236364-13.963636 51.2 0l812.218182 812.218182c13.963636 13.963636 13.963636 37.236364 0 51.2-9.309091 4.654545-18.618182 9.309091-27.927272 9.309091z" p-id="4015"></path><path d="M107.054545 954.181818c-9.309091 0-18.618182-4.654545-25.6-11.636363-13.963636-13.963636-13.963636-37.236364 0-51.2L891.345455 81.454545c13.963636-13.963636 37.236364-13.963636 51.2 0 13.963636 13.963636 13.963636 37.236364 0 51.2L132.654545 942.545455c-6.981818 6.981818-16.290909 11.636364-25.6 11.636363z" p-id="4016"></path></svg>
                        </CloseBtn> || ''}
                        {children}
                    </div>
                </Modal>
            </Container>
        );
    }
}

export default MyModal