'use client';

import { cn } from "@/lib/utils";
import Image from 'next/image';
import { Button } from "./ui/button";
import { ImageIcon, X } from "lucide-react";
import { useCoverImage } from "@/hooks/use-cover-image";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Params } from "next/dist/server/request/params";
import { Id } from "@/convex/_generated/dataModel";
import { useParams } from "next/navigation";
import { useEdgeStore } from "@/lib/edgestore";

interface CoverImageProps {
  url?: string;
  preview?: boolean
};

interface CoverParams extends Params {
  documentId: Id<'documents'>
};

export default function Cover({
  url,
  preview
}: CoverImageProps) {
  const { edgestore } = useEdgeStore();
  const coverImage = useCoverImage();
  const removeCoverImage = useMutation(api.documents.removeCoverImage);
  const params = useParams<CoverParams>();

  const onRemove = async () => {
    if (!url) return;
    await edgestore.publicFiles.delete({
      url
    });
    removeCoverImage({
      id: params.documentId
    });
  }
  return (
    <div className={cn(
      'relative w-full h-[35vh] group',
      !url && 'h-[12vh]',
      url && 'bg-muted'
    )}>
      {!!url && (
        <Image
          src={url}
          fill
          alt="cover"
          className="object-cover"
        />
      )}
      {url && !preview && (
        <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
          <Button
            onClick={() => coverImage.onReplace(url)}
            className="text-muted-foreground text-xs "
            variant="outline"
            size="sm"
          >
            <ImageIcon />
            Change cover
          </Button>

          <Button
            onClick={onRemove}
            className="text-muted-foreground text-xs "
            variant="outline"
            size="sm"
          >
            <X />
            Remove
          </Button>
        </div>
      )}
    </div>
  )
}

