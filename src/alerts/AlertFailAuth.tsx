import {Alert} from "react-bootstrap";
import React, {Dispatch, SetStateAction, useState} from "react";

type Props = {
    variant: Variant,
    setShow: Dispatch<SetStateAction<boolean>>,
    children?: React.ReactNode
}

type Variant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light' | string;

interface AlertProps {
    title: string,
    message: string,
    variant: Variant,
    setShow: Dispatch<SetStateAction<boolean>>,
    children?: React.ReactNode
}

function AlertWrap(props: Props) {
    return (
        <>
            <Alert
                className={"position-absolute w-50 d-none d-md-block"}
                style={{top: 15, right: 15}}
                variant={props.variant}
                onClose={() => props.setShow(false)}
                dismissible>
                {props.children}
            </Alert>

            <Alert
                className={"position-absolute w-auto d-block d-md-none"}
                style={{top: 15, right: 15, left: 15}}
                variant={props.variant}
                onClose={() => props.setShow(false)}
                dismissible>
                {props.children}
            </Alert>
        </>
    )
}

export function AlertComponent(props: AlertProps) {
    const [show, setShow] = useState(true);

    if (show) {
        return (
            <AlertWrap setShow={setShow} variant={props.variant}>
                <Alert.Heading>{props.title}</Alert.Heading>
                <p>{props.message}</p>
            </AlertWrap>
        );
    } else {
        return null;
    }
}