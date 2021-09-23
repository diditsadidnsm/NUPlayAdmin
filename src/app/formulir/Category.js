import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import bsCustomFileInput from 'bs-custom-file-input';
import axios from 'axios';

export class FormulirCategory extends Component {
  state = {
    dataPost : {
      id : 0,
      title: "",
      narasumber : ""
    }
  }
  submitForm = () => {
    axios.post(`http://128.199.121.92:1818/category/`, this.state.dataPost)
  }

  inputChange = e => {
    let newDataPost = { ...this.state.dataPost }
    newDataPost["id"] = new Date().getTime()
    newDataPost[e.target.name] = e.target.value
    this.setState({
      dataPost: newDataPost,
    })
  }
  componentDidMount() {
    bsCustomFileInput.init()
  }

  render() {
    return (
      <div>
        <div className="page-header">
          <h3 className="page-title">
            <a href="/videos/category" className="btn btn-danger">
              <i className="mdi mdi-arrow-left"></i> Kembali ke Daftar Kategori
            </a>
          </h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Vidio</a></li>
              <li className="breadcrumb-item"><a href="/videos/category">Kategori Vidio</a></li>
              <li className="breadcrumb-item active" aria-current="page">Formulir Vidio</li>
            </ol>
          </nav>
        </div>
        <div className="row">
          <div className="col-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Kategori Vidio</h4>
                  <Form.Group>
                    <label htmlFor="title">Kategori</label>
                    <Form.Control type="text" className="form-control" id="title" name="title" placeholder="Nama Kategori" onChange={this.inputChange} />
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="narasumber">Narasumber</label>
                    <Form.Control type="text" className="form-control" id="narasumber" name="narasumber" placeholder="Nama Narasumber" onChange={this.inputChange} />
                  </Form.Group>
                  <button className="btn btn-primary mr-2" onClick={this.submitForm}>Submit</button>
                  <a href="/videos/category" className="btn btn-dark">Cancel</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default FormulirCategory
