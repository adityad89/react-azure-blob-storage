import React from 'react';
import { tap, share } from 'rxjs/operators';
import { DownloadsViewStateContext } from '../azure-storage/services/viewStateContext';
import FileSaver from 'file-saver';

export function useBlobDownload(){
  const downloadContext = React.useContext(DownloadsViewStateContext);

  const getDownloadedItems = () => {       
    const sub = downloadContext.downloadedItems$
    .pipe(tap(items => items.url && FileSaver.saveAs(items.url)),share())
    .subscribe();

    return () => sub.unsubscribe();
  };
  React.useEffect(getDownloadedItems, []);

  const downloadFile = downloadContext.downloadItem;
  return  [downloadFile];
};

