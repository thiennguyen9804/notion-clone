'use client';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { api } from '@/convex/_generated/api';
import { useSearch } from '@/hooks/use-search';
import { useUser } from '@clerk/clerk-react';
import { useQuery } from 'convex/react';
import { File } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SearchCommand() {
  const { user } = useUser();
  const router = useRouter();
  const documents = useQuery(api.documents.getSearch);
  const [isMounted, setIsMoundted] = useState(false);
  const toggle = useSearch(store => store.toggle);
  const isOpen = useSearch(store => store.isOpen);
  const onClose = useSearch(store => store.onClose);

  // useEffect(() => {
  //   setIsMoundted(true);
  // }, []);


  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    }

    document.addEventListener('keydown', down);
    return () => {
      document.removeEventListener('keydown', down);
    }
  }, [toggle]);

  const onSelect = (id: string) => {
    router.push(`/documents/${id}`);
    onClose();
  }

  // if (!isMounted) {
  //   return null;
  // }



  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <CommandInput placeholder={`Search ${user?.fullName}'s Notion components`} />
      <CommandList>
        <CommandEmpty>No results found</CommandEmpty>
        <CommandGroup heading='Documnents'>
          {documents?.map((document) => (
            <CommandItem
              key={document._id}
              value={`${document._id}-${document.title}`}
              title='document.title'
              onSelect={onSelect}
            >
              {document.icon ? (
                <p className='mr-2 text-[18px]'>{document.icon}</p>
              ) : (
                <File className='mr-2 h-4 w-4' />
              )}
              <span>
                {document.title}
              </span>
            </CommandItem>
          ))}

        </CommandGroup>
      </CommandList>

    </CommandDialog>
  )
}


