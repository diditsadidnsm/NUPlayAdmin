import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import bsCustomFileInput from 'bs-custom-file-input';
import axios from 'axios';

export class FormulirList extends Component {
    state = {
        dataPost : {
            id : 0,
            youtubeVideoId: "",
            snippet: "",
            status: ""
        }
    }
    submitForm = async (e, res) => {
        let getVideoDetails = await axios({
            method: 'GET',
            responseType: 'JSON',
            url: `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${e.target.value}&key=AIzaSyBkC8tex6VBrmaOBxc9LQAapOZT6hCDju8`
        })
        let data = getVideoDetails.data;
        let items = data.items[0];
        const videos = this.state.dataPost({
            youtubeVideoId: items.id,
            snippet: items.snippet,
            status: 1,
        });
        try {
            axios.post(`http://128.199.121.92:1818/videos/`, videos)
        } catch (error) {
            res.status(400).json({message: error.message});
        }
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
                        <a href="/videos/list" className="btn btn-danger">
                            <i className="mdi mdi-arrow-left"></i> Kembali ke Daftar Vidio
                        </a>
                    </h3>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Vidio</a></li>
                            <li className="breadcrumb-item"><a href="/videos/list">Daftar Vidio</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Formulir Vidio</li>
                        </ol>
                    </nav>
                </div>
                <div className="row">
                    <div className="col-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Daftar Vidio</h4>
                                <Form.Group>
                                    <label htmlFor="youtubeVideoId">URL Youtube</label>
                                    <Form.Control type="text" className="form-control" id="youtubeVideoId" name="youtubeVideoId" onChange={this.inputChange} />
                                </Form.Group>
                                <button className="btn btn-primary mr-2" onClick={this.submitForm}>Submit</button>
                                <a href="/videos/list" className="btn btn-dark">Cancel</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FormulirList
