import React from 'react';
import { tap, share } from 'rxjs/operators';
import { DeletesViewStateContext } from '../azure-storage/services/viewStateContext';
import { BlobItem } from '../azure-storage/types/azure-storage';

export function useBlobDelete(){
  const deleteContext = React.useContext(DeletesViewStateContext);
  const [deletedFiles, setDeletedFiles] = React.useState<BlobItem[]>([]);

  const getDownloadedItems = () => {
    const sub = deleteContext.deletedItems$
      .pipe(tap(items => setDeletedFiles(items)),share())
      .subscribe();

    return () => sub.unsubscribe();
  };
  React.useEffect(getDownloadedItems, []);

  const deleteFile = deleteContext.deleteItem;
  return  [deleteFile,deletedFiles];
};

