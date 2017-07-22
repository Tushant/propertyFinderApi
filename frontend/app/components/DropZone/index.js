import React from 'react';
import ReactDropzone from 'react-dropzone';


export default class DropZone extends React.Component {
  state = {
      files: [],
      uploading: null,
    };

  onOpenClick = () => {
    this.refs.dropzone.open();
  };

  onDrop = (files) => {
    // const { destination } = this.props;
    // const url = `${BASE_URL}${destination}`;
    this.setState({
      files,
      uploading: true,
    });
    // const req = request
    //   .post(url)
    //   .set('Authorization', `Bearer ${authToken}`);

    files.forEach(file => {
      // req.attach(file.name, file);
      // req.attach('photo', file);
      console.log('file name: '+ file.name);
    });
    // req.end((a, b) => {
    //   this.setState({
    //     uploading: false,
    //   });
    // });
  };

  render() {
    const { files, uploading } = this.state;
    return (
      <div>
        <ReactDropzone ref="dropzone" onDrop={this.onDrop} style={{ display: 'none' }}>
          <div>Drop Files Here <br/> <button className="btn btn-link">Upload</button></div>
        </ReactDropzone>
        {this.state.files ?
          <div>
            {uploading && <h2>Uploading {files.length} files...</h2>}
            <div>
              {this.state.files.map((file) => (
                <span key={file.lastModified}>{file.name}</span>
              ))}
            </div>
          </div> : null
        }
        <button type="button" className="button small" onClick={this.onOpenClick}>
          Add Picture / file
        </button>
      </div>
    );
  }
}
