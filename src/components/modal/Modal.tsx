import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { RiCloseFill } from "react-icons/ri";
import "./Modal.css";

interface ModalProps {
  body: any,
  onClose: () => void,
  visible: boolean
}

const Modal: React.FC<ModalProps> = ({ visible, body, onClose }) => {

  return (
    <>
      {
        visible ? (
          <div className="modal" onClick={onClose}>
            <div className="modal-wrapper p-4">
              <div style={{ borderRadius: 8 }} className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="p-4 items-center justify-between flex">
                  <div></div>
                  <div><RiCloseFill className="cursor-pointer" onClick={onClose} color="gray" size={24} /></div>
                </div>
                {body}
              </div>
            </div>
          </div>
        ) : (
          <></>
        )
      }
    </>
  );
};

export default Modal;
