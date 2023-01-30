import React, { useState, useEffect } from 'react';
import Select from 'react-select'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import toast, { Toaster } from 'react-hot-toast';




const AddEmp = ({ handleClose, show, refresh }) => {

    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [cnum, setCnum] = useState("");
    const [email, setEmailadd] = useState("");
    const [bday, setBirthday] = useState("");
    const [dept, setDept] = useState("");
    const [salary, setSalary] = useState("");

    const [selectdep, setSelectDept] = useState(null)
    const [dep, setDepartment] = useState([])

    const handleChangedept = value => {
        setSelectDept(value)
        console.log(value.id);
    }

    const getData2 = async () => {

        // fetch dept data
        const depdb = await fetch('http://localhost:5000/GetDept')
        const ddata = await depdb.json()
        setDepartment(ddata)

    }

    useEffect(() => {
        getData2()

    }, [])

    // function
    const save = async () => {
        const suppbody = {
            // from postman : const
            firstname: fname,
            lastname: lname,
            contactnum: cnum,
            emailadd: email,
            birthday: bday,
            msalary: salary,
            department: selectdep.id,
        }


        // fetching
        const res = await fetch('http://localhost:5000/AddEmp', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(suppbody)
        })
        const jdata = await res.json()
        toast.success('Added!')
        handleClose()
        setFname("")
        setLname("")
        setCnum("")
        setEmailadd("")
        setFname("")
        setBirthday("")
        setDept("")
        setSalary("")
        refresh()

    }




    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            {/* <Form.Label>First Name</Form.Label> */}
                            <Form.Control className='mb-3' value={fname} onChange={(e) => setFname(e.target.value)} type="text" placeholder="First Name" />
                            <Form.Control className='mb-3' value={lname} onChange={(e) => setLname(e.target.value)} type="text" placeholder="Last Name" />
                            <Form.Control className='mb-3' value={cnum} onChange={(e) => setCnum(e.target.value)} type="number" placeholder="Contact Number" />
                            <Form.Control className='mb-3' value={email} onChange={(e) => setEmailadd(e.target.value)} type="email" placeholder="Email Address" />
                            <Form.Control className='mb-3' value={bday} onChange={(e) => setBirthday(e.target.value)} type="text" placeholder="Birthday" />

                            <Select className='mb-3' placeholder="Department" options={dep} getOptionLabel={e => e.deptname} getOptionValue={e => e.id}
                                value={selectdep} onChange={handleChangedept} defaultValue={selectdep} />

                            {/* <Form.Control className='mb-3' value={dept} onChange={(e) => setDept(e.target.value)} type="text" placeholder="Department" /> */}
                            <Form.Control className='mb-3' value={salary} onChange={(e) => setSalary(e.target.value)} type="number" placeholder="Salary" />
                        </Form.Group>

                        {/* <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group> */}
                        {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group> */}
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={save}>Submit</Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default AddEmp