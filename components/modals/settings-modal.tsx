'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { useSettings } from '@/hooks/use-settings';
import { Label } from '@/components/ui/label';
import { ModeToggle } from '@/components/mode-toggle';

export default function SettingsModal() {
  const settings = useSettings();

  return (
    <Dialog onOpenChange={settings.onClose} open={settings.isOpen}>
      <DialogContent>
        <DialogHeader className='border-b pb-3'>
          <DialogTitle className='text-lg font-medium'>
            My settings
          </DialogTitle>
        </DialogHeader>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col gap-y-1'>
            <Label>Appearance</Label>
            <span className='text-[0.8rem] text-muted-foreground'>
              Customize how Notion Clone looks on your device
            </span>
          </div>
          <ModeToggle />
        </div>
      </DialogContent>
    </Dialog>
  )
}


