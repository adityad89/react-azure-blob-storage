import React from 'react';
import { tap, share } from 'rxjs/operators';
import { SharedViewStateContext } from '../azure-storage/services/viewStateContext';
import { BlobSharedViewStateService } from '../azure-storage/services/BlobSharedViewState';
import { BlobItem } from '@azure/storage-blob';

export function useBlobContainer(containerName : string){
    const sharedViewContext = React.useContext<BlobSharedViewStateService>(SharedViewStateContext);
    const [listFiles, setListFiles] = React.useState<BlobItem[]>([]);

    React.useEffect(() => {
      sharedViewContext.getContainerItems(containerName)
      const sub = sharedViewContext.itemsInContainer$
      .pipe(tap(items => setListFiles(items)))
      .subscribe();

    return () => sub.unsubscribe();
    }, [])
    
    return  [listFiles];
};

