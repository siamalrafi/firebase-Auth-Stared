import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';
import app from '../../Hook/firebaseConfig';

const ResetPassword = (props) => {
    const auth = getAuth(app);

    const [email, setEmail] = useState('');

    const handleResetPass = () => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                // Password reset email sent!
                props.onHide();
                Swal.fire('Check your email.')

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }

    return (
        <div>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Reset Password
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4 className='text-primary'> Reset Password</h4>
                    <input
                        onBlur={(e) => setEmail(e.target.value)}
                        className='form-control p-3 mt-5'
                        type="email" name="email"
                        placeholder='Email' required />

                </Modal.Body>
                <Modal.Footer>
                    {/* <Button onClick={props.onHide}>Close</Button> */}
                    <Button onClick={handleResetPass} >update</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ResetPassword;