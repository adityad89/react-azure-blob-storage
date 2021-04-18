# react-azure-blob-storage

## Install
```bash
# with npm
npm install react-azure-blob-storage

# or with Yarn
yarn add react-azure-blob-storage
```
## Prerequisite

1. Setup a service to generate a SAS token Azure blob access. Below is a reference using azure nodejs function app.
    https://github.com/adityad89/SASTokenGenerator.git

2. Add following environment variable
 ```
    AZURE_SAS_GENERATOR_URI=<LINK TO SAS GENERATOR SERVICE>
```
## Usage
```javascript
import React from 'react';

import { useBlobContainer, useBlobDownload, useBlobDelete } from 'react-azure-blob-storage'

export default function App() {
  const [listFiles] = useBlobContainer("blob-container-name"); /* */
  const [downloadFile] = useBlobDownload();
  const [deleteFile, deletedFiles] = useBlobDelete();
  const [uploadFiles, uploadedFiles] = useBlobUpload();

  return (
    <div>
      {listFiles.map((file, i) => (
        <div key={i}>
          <span>{file.name}</span>
          <span>{file.properties.contentLength}</span>
          <span>{file.properties.lastModified.toISOString()}</span>
          <div>
            <button onClick={() => downloadFile(file.name)}>
              Download
            </button>
            <button onClick={() => deleteFile(file.name)}>
              Delete
            </button>
          </div>
        </div>
      ))}

      <div className="input-file">
        <input
          style={{ display: 'none' }}
          ref={inputFileRef}
          type="file"
          multiple={true}
          onChange={e => uploadFiles(e.target.files)}
        />
        <button onClick={() => showFileDialog()}>
          Click here to Upload File
      </button>
      </div>
    </div>
  );
};
```


