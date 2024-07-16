import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './crud.css';
import { IoMdAdd } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [edit, setEdit] = useState("");

  const getData = () => {
    let data = JSON.parse(localStorage.getItem('users'));
    if (data) {
      return data;
    } else {
      return [];
    }
  }

  const [record, setRecord] = useState(getData());

  const handle = (e) => {
    e.preventDefault();

    let obj = {
      id: Date.now(),
      name,
      phone,
      deleted: false
    };

    if (!name || !phone) {
      alert("All fields are required.");
      return false;
    }

    if (edit) {
      let updatedRecords = record.map((val) => {
        if (val.id === edit) {
          val.name = name;
          val.phone = phone;
        }
        return val;
      });
      localStorage.setItem('users', JSON.stringify(updatedRecords));
      setRecord(updatedRecords);
      alert("Data update successfully....!");
      setEdit("");
    } else {
      let newRecord = [...record, obj];
      localStorage.setItem('users', JSON.stringify(newRecord));
      setRecord(newRecord);
      alert("Data add successfully....!");
    }

    setName("");
    setPhone("");
  }

  const deleteUser = (id) => {
    let updatedRecords = record.map((val) => {
      if (val.id === id) {
        val.deleted = true;
      }
      return val;
    });
    localStorage.setItem('users', JSON.stringify(updatedRecords));
    setRecord(updatedRecords);
    alert("Data deleted successfully....!");
  }

  const editUser = (id, name, phone) => {
    setName(name);
    setPhone(phone);
    setEdit(id);
  }

  return (
    <div className="main-card">
      <div className="card-body">
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-12">
              <h1 style={{fontSize:"30px"}}>TODO App</h1>
              <form onSubmit={handle} className="mb-3">
                <div className="form-detail">
                 
                  <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} value={name} style={{backgroundColor:"#abcea1"}} placeholder="add your name"/>
                 
                </div>
                <div className="form-detail">
               
                  <input type="text" className="form-control mt-3" onChange={(e) => setPhone(e.target.value)} value={phone} style={{backgroundColor:"#abcea1"}}placeholder="add your phone"/>
                </div>
                <button type="submit" className="btn btn-success btn-block" style={{width:"50px"}}>{edit ? <FaRegEdit /> : <IoMdAdd />}</button>
              </form>
            </div>
          </div>
          <div className="row">
            {
              record.filter(val => !val.deleted).map((val) => (
                <div className="col-12 mb-4" key={val.id}>
                  <div className="card">
                    <div className="card-body "style={{backgroundColor:"#abcea1",border:"2px solid #abcea1"}}>
                      <h5 className="titles">{val.name}</h5>
                      <p className="Texts">{val.phone}</p>
                      <button className="btn  mr-2" onClick={() => deleteUser(val.id)}style={{fontSize:"25px"}}><MdDelete /></button>
                      <button className="btn " onClick={() => editUser(val.id, val.name, val.phone)}style={{fontSize:"25px"}}><FaRegEdit /></button>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
