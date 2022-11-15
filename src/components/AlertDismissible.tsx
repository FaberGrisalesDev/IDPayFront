import { Dispatch, SetStateAction, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import { Trans } from '../hook/Internationalization';

type Props = {
    show?: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;
    title?: string,
    message?: string,
    tipo: string
};

export default function AlertDismissible({show, setShow, title, message, tipo}: Props) {
    
    const timing = () => {
        setTimeout(() => {
            setShow(false);
        }, 5000);
    }

    useEffect(() => timing(), []);    

    return (
        <Alert variant={tipo} onClose={() => setShow(false)} dismissible>
            <Alert.Heading className='text-left'>{title && (<Trans>{title}</Trans>)} </Alert.Heading>
            {message && (<Trans>{message}</Trans>)}            
      </Alert>
    );
}
