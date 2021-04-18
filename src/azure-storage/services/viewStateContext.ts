import React from 'react';
import { BlobDeletesViewStateService } from './BlobDeletesViewState'
import { BlobDownloadsViewStateService } from './BlobDownloadsViewState';
import { BlobSharedViewStateService } from './BlobSharedViewState';
import { BlobStorageService } from './BlobStorageService';
import { BlobUploadsViewStateService } from './BlobUploadsViewState';
import { SasGeneratorService } from './SasGeneratorService';

const blobStorage = new BlobStorageService();
const sasGenerator = new SasGeneratorService();
const sharedViewState = new BlobSharedViewStateService(
  sasGenerator,
  blobStorage
);
const uploadsViewState = new BlobUploadsViewStateService(
  blobStorage,
  sharedViewState
);
const downloadsViewState = new BlobDownloadsViewStateService(
  blobStorage,
  sharedViewState
);
const deletesViewState = new BlobDeletesViewStateService(
  blobStorage,
  sharedViewState
);

export const SharedViewStateContext = React.createContext(sharedViewState);
export const UploadsViewStateContext = React.createContext(uploadsViewState);
export const DownloadsViewStateContext = React.createContext(
  downloadsViewState
);
export const DeletesViewStateContext = React.createContext(deletesViewState);
