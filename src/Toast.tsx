import { useEffect } from "react";

type ToastProps = {
    onClose: () => void;
    message?: string;
}

const Toast: React.FC<ToastProps> = ({ onClose, message }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 1000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="toast-custom">
            {message ? message : "Quantity is maximum"}
        </div>
    );
}


export default Toast;