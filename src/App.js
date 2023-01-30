
import './App.css';
import Select from 'react-select'
import React, { useState, useEffect } from 'react';
import AddEmp from './components/AddEmp';
import AddDept from './components/AddDept';
import toast, { Toaster } from 'react-hot-toast';

function App() {

  const [reports, setReports] = useState([])
  const [dep, setDepartment] = useState([])


  //filtering for Departmet
  const [selectdep, setSelectDept] = useState(null)


  // AddEmp Modal 
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //AddDept Modal
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  //
  const getData = async () => {
    const res = await fetch('http://localhost:5000/GetReports/' + selectdep.id + '/january')
    const jdata = await res.json()
    setReports(jdata)
  }

  //
  const getData2 = async () => {

    // fetch dept data
    const depdb = await fetch('http://localhost:5000/GetDept')
    const ddata = await depdb.json()
    setDepartment(ddata)
    setSelectDept(ddata[0])
  }

  const handleChangedept = value => {
    setSelectDept(value)
    console.log(value.id);
  }

  useEffect(() => {
    getData2()

  }, [])


  useEffect(() => {
    getData()

  }, [selectdep])









  return (

    <div>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />


      <div class="title" mb-3 > <h1> LA IMMACULADA MARKETING</h1></div>








      {/* table */}
      <div class="container">

        {/* filter/dropdown */}


        <div class="d-flex flex-row-reverse bd-highlight mb-4">
          <div class="p-2 bd-highlight">
            {/* <div class="filter1">Month <Select /></div> */}
          </div>


          <div class="p-2 bd-highlight">
            <div class="filter1"> Department<Select options={dep} getOptionLabel={e => e.deptname} getOptionValue={e => e.id}
              value={selectdep} onChange={handleChangedept} defaultValue={selectdep} />
            </div>
          </div>

          {/* buttons */}
          <div class="buttons">
            <button type="button" onClick={handleShow2} class="btn btn-primary me-2">Add Department</button>
            <button type="button" onClick={handleShow} class="btn btn-primary me-2">Add Employee</button>
            {/* <button type="button" class="btn btn-primary me-2">Add Bonus</button> */}
          </div>

        </div>

        <h3>Reports</h3>
        <table class="table">

          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Contact Number</th>
              <th scope="col">Email Address</th>
              <th scope="col">Date of Birth</th>
              <th scope="col">Monthly Salary</th>
              <th scope="col">Percent</th>
              <th scope="col">Bonus</th>
              <th scope="col">Action</th>
            </tr>
          </thead>

          <tbody>
            {
              reports.map((value, index) => (
                <tr>
                  <th scope="row">{value.id}</th>
                  <td>{value.firstname}</td>
                  <td>{value.lastname}</td>
                  <td>{value.contactnum}</td>
                  <td>{value.emailadd}</td>
                  <td>{value.birthday}</td>
                  <td>{value.msalary}</td>
                  { <td>{value.value}</td> }
                  <td>{value.salary_with_bonus}</td>
                  <td> <button class="btn btn-primary me-2" >Delete</button></td>
                </tr>

              ))
            }
          </tbody>

        </table>


      </div>
      <AddEmp handleClose={handleClose} show={show} refresh={getData} />
      <AddDept handleClose={handleClose2} show={show2} refresh={getData} />

    </div>
  );
}

export default App;
