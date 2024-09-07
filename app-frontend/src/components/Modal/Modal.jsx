import React, {useState} from 'react';

function Modal({title, setResult}) {
    const [visible, setVisible] = useState(true);
    const handleBtnYesClick = () => {
        setResult(true);
    };

    const handleBtnNoClick = () => {
        setResult(false);
    };



    if (!visible) return null;

    return (
        <div className="modal-container">
            <div className="modal-container__card card">
                <div className="">
                    <div className="d-flex justify-content-between align-items-center">
                        <p>
                            {title}
                        </p>
                        <span >
                           {/*<button onClick={handleCloseModalBtnClick} className="btn btn-outline-dark">*/}
                           {/*     <i className="fa-solid fa-xmark"></i>*/}
                           {/*</button>*/}
                        </span>
                    </div>

                    <button onClick={handleBtnYesClick} className="btn btn-primary mr-1">
                        Yes
                    </button>
                    <button onClick={handleBtnNoClick} className="btn btn-outline-dark">
                        No
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Modal;
