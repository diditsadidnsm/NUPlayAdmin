import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import axios from 'axios'
import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';

export class List extends Component {
    state = {
        dataApi : []
    }
    getDataApi = () => {
        axios.get("http://128.199.121.92:1818/videos/")
            .then(res => this.setState({
                dataApi : res.data
            }))
        $(document).ready(function () {
            setTimeout(function(){
                $('#list').DataTable();
            } ,1000);
        });
    }
    handleRemove = (e) => {
        console.log(e.target.value)
        axios.delete(`http://128.199.121.92:1818/videos/${e.target.value}`)
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
                            <a href="/formulir/list" className="btn btn-success">
                                <i className="mdi mdi-plus"></i> Tambah Baru Vidio
                            </a>
                        </h3>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Vidio</a></li>
                                <li className="breadcrumb-item active" aria-current="page">Daftar Vidio</li>
                            </ol>
                        </nav>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Daftar Vidio</h4>
                                    <div className="table-responsive">
                                        <table id="list" className="table table-hover table-dark">
                                            <thead>
                                            <tr>
                                                <th> Tanggal Unggah </th>
                                                <th> Judul </th>
                                                <th> Saluran </th>
                                                <th> URL </th>
                                                <th> Tindakan </th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {this.state.dataApi.map((data,index) => {
                                                return (
                                                    <tr key={data._id}>
                                                        <td> {data.snippet.publishedAt} </td>
                                                        <td> {data.snippet.title} </td>
                                                        <td> {data.snippet.channelTitle} </td>
                                                        <td> {data.youtubeVideoId} </td>
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
export default List
