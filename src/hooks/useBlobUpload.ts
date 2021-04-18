import React from 'react';
import { tap, share } from 'rxjs/operators';
import { UploadsViewStateContext } from '../azure-storage/services/viewStateContext';
import { BlobItemUpload } from '../azure-storage/types/azure-storage';

export function useBlobUpload(){
  const uploadContext = React.useContext(UploadsViewStateContext);
  const [uploadedFiles, setUploadedFiles] = React.useState<BlobItemUpload[]>([]);

  const getUploadsEffect = () => {
    const sub = uploadContext.uploadedItems$
      .pipe(tap(items => setUploadedFiles(items)),share())
      .subscribe();

    return () => sub.unsubscribe();
  };
  React.useEffect(getUploadsEffect, []);

  const uploadFiles = uploadContext.uploadItems;
  return  [uploadFiles,uploadedFiles];
};

