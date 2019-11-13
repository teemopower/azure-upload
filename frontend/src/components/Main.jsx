import React from 'react';
import '../../src/index.css'

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageURL: '',
    };

    this.handleUploadImage = this.handleUploadImage.bind(this);
  }

  handleUploadImage(ev) {
    ev.preventDefault();

    const data = new FormData();
    data.append('file', this.uploadInput.files[0]);
    data.append('filename', this.fileName.value);

    fetch('http://localhost:8000/upload', {
      method: 'POST',
      body: data,
    }).then((response) => {
      response.json().then((body) => {
        this.setState({ imageURL: `http://localhost:8000/${body.file}` });
      });
    });
  }

  render() {
    return (
      <div>
        <div className="page-container">
          
          <div className="form-container">
            <img src="https://catstoragepoc.blob.core.windows.net/demo12/qwe.jpg"/>
            <h2>Select File</h2>
            <div className="">
              <form onSubmit={this.handleUploadImage}>
                <div>
                  <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
                </div>
                <div>
                  <h2>File Name</h2>
                  <input className="file-name-input" ref={(ref) => { this.fileName = ref; }} type="text" placeholder="Enter name" />
                </div>
                <br />
                <div>
                  <button>Upload</button>
                </div>

                { this.state.imageURL ? <img src={this.state.imageURL} alt="img" /> 
                : null}
                
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
