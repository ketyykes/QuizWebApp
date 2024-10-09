"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (questions: any[]) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onUpload }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target?.result as string);
          if (Array.isArray(json.questions)) {
            onUpload(json.questions);
            onClose();
          } else {
            alert('Invalid JSON format. Expected an array of questions.');
          }
        } catch (error) {
          alert('Error parsing JSON file.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Upload Questions</SheetTitle>
        </SheetHeader>
        <div className="mt-4">
          <input
            type="file"
            accept=".json"
            onChange={handleFileChange}
            className="mb-4"
          />
          <Button onClick={handleUpload} disabled={!file}>
            Upload
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};