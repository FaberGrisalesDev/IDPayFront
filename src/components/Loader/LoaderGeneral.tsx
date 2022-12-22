import React, {useState} from 'react';



/**
 * Styles
 */
import './loader-general.css';

/**
 * images
 */
import loader from '../../images/loader/general-loader.gif';


type Props = {
    show: boolean;
    modal: boolean;
}
export default function LoaderGeneral (props: Props) {
    const [modal, setmodal] = useState<boolean>(props.modal);

    return (
        <>
        {
            props.show == true && (
                <>
                    <div>
                        <img className={modal ? 'loader-style-modal' : 'loader-style'}  src={loader} alt="" />
                    </div>
                </>
            )
        }
        
        </>
    )
}