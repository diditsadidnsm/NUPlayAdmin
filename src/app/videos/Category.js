import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import axios from 'axios'
import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';

export class Category extends Component {
  state = {
    dataApi : []
  }
  getDataApi = () => {
    axios.get("http://128.199.121.92:1818/category/")
        .then(res => this.setState({
          dataApi : res.data
        }))
    $(document).ready(function () {
      setTimeout(function(){
        $('#category').DataTable();
      } ,1000);
    });
  }
  handleRemove = (e) => {
    console.log(e.target.value)
    axios.delete(`http://128.199.121.92:1818/category/${e.target.value}`)
        .then(res => {
      this.getDataApi()
    })
  }
  componentDidMount = () => {
    this.getDataApi()
  }

  render() {
    return (
      <>
      <div>
        <div className="page-header">
          <h3 className="page-title">
            <a className="btn btn-success" href="/formulir/category">
              <i className="mdi mdi-plus"></i> Tambah Baru Kategori
            </a>
          </h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Vidio</a></li>
              <li className="breadcrumb-item active" aria-current="page">Kategori Vidio</li>
            </ol>
          </nav>
        </div>
        <div className="row">
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Kategori Vidio</h4>
                <div className="table-responsive">
                  <table id="category" className="table table-hover table-dark">
                    <thead>
                      <tr>
                        <th> Kategori </th>
                        <th> Narasumber </th>
                        <th> Tindakan </th>
                      </tr>
                    </thead>
                    <tbody>
                    {this.state.dataApi.map((data,index) => {
                      return (
                          <tr key={data._id}>
                            <td> {data.title} </td>
                            <td> {data.narasumber} </td>
                            <td>
                              <Button className="btn btn-warning" value={data._id} onClick={this.handleRemove}>
                                <i className="mdi mdi-pencil m"></i> Edit
                              </Button>
                              &nbsp;
                              <Button className="btn btn-danger" value={data._id} onClick={this.handleRemove}>
                                <i className="mdi mdi-eraser m"></i> Delete
                              </Button>
                            </td>
                          </tr>
                      )
                    })}
                    </tbody>
                  </table>
                  <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog"
                       aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          ...
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                          <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
    )
  }
}
export default Category
