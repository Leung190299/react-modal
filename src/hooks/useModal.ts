import { useContext } from "react";
import { ModalContext } from "../core/ModalProvider";

const useModal = () => useContext(ModalContext);

export default useModal;
