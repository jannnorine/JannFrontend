import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import toast, { Toaster } from 'react-hot-toast';




const AddDept = ({ handleClose, show, refresh }) => {

    const [dname, setDname] = useState("");
    
    // function
    const save = async () => {
        const suppbody = {
            // from postman : const
            deptname: dname,
        }

        // fetching
        const res = await fetch('http://localhost:5000/AddDept', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(suppbody)
        })
        const jdata = await res.json()
        toast.success('Added!')
         handleClose()
         setDname("")
    }

    
    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Department</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            {/* <Form.Label>First Name</Form.Label> */}
                            <Form.Control className='mb-3' value={dname} onChange={(e) => setDname(e.target.value)} type="text" placeholder="Department" />
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={save}>Submit</Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default AddDept