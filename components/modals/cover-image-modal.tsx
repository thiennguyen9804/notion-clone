'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useCoverImage } from '@/hooks/use-cover-image';
import { useEdgeStore } from '@/lib/edgestore';
import { useMutation } from 'convex/react';
import { Params } from 'next/dist/server/request/params';
import { useParams } from 'next/navigation';
import { useCallback, useState } from 'react';
import { SingleImageDropzone } from '../upload/single-image';
import { UploaderProvider, UploadFn } from '../upload/uploader-provider';
import { useMeasure } from '@/hooks/use-measure';

interface CoverImageParams extends Params {
  documentId: Id<'documents'>
};

export default function CoverImageModal() {
  const coverImage = useCoverImage();
  const [file, setFile] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { edgestore } = useEdgeStore();
  const update = useMutation(api.documents.update);
  const params = useParams<CoverImageParams>();
  const [ref, bounds] = useMeasure<any>();



  const uploadFn: UploadFn = useCallback(
    async ({ file, onProgressChange, signal }) => {
      const res = await edgestore.publicFiles.upload({
        file,
        signal,
        onProgressChange,
      });
      // you can run some server action or api here
      // to add the necessary data to your databas
      //
      await update({
        id: params.documentId,
        coverImage: res.url
      });

      onClose();
      return res;
    },
    [edgestore],
  );

  const onClose = () => {
    setFile(undefined);
    setIsSubmitting(false);
    coverImage.onClose();
  };

  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-center text-lg font-semibold'>
            Cover Image
          </DialogTitle>
        </DialogHeader>
        <div className="w-full">
          <UploaderProvider uploadFn={uploadFn} autoUpload>
            <SingleImageDropzone
              width={100}
              height={100} // ví dụ tỉ lệ 3:2
              className='outline-none'
              disabled={isSubmitting}
            />
          </UploaderProvider>
        </div>
      </DialogContent>
    </Dialog>
  )
}


