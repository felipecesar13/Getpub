'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Home() {
  const [epubUrl, setEpubUrl] = useState('');

  function submitFile() {
    const files = (document.getElementById('inputFile') as HTMLInputElement).files;
    const pdfFile = files && files[0];

    console.log(pdfFile);

    if (!pdfFile) {
      return toast('File not selected', {
        description: 'Pdf file not selected',
        action: {
          label: 'Undo',
          onClick: () => console.log('Undo'),
        },
      });
    }

    const formData = new FormData();
    formData.append('file', pdfFile);

    axios
      .post('/api/convert', formData)
      .then(response => setEpubUrl(response.data.filenameSlug))
      .catch(() => window.alert('Ocorreu um erro ao gerar o seu EPUB'));
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6 text-center">
      <h1 className="mb-4 text-3xl font-bold text-purple-700">Convert your PDF to EPUB</h1>
      <p className="mb-6 text-lg text-gray-600">Select a PDF file and convert it easily.</p>
      <div className="w-full max-w-sm space-y-4">
        <Input
          type="file"
          id="inputFile"
          accept=".pdf"
          className="h-full w-full cursor-pointer border-2 border-purple-300 p-2 text-gray-700 focus:border-purple-500 focus:ring-purple-500"
        />
        <Button onClick={submitFile} className="w-full bg-purple-700 text-white hover:bg-purple-800">
          Convert
        </Button>
        {epubUrl !== '' ? (
          <a
            href={`/${epubUrl}.epub`}
            className="mt-4 inline-block rounded-lg bg-purple-700 px-6 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:bg-purple-800 hover:shadow-lg focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:outline-none"
          >
            📥 Baixar EPUB
          </a>
        ) : null}
      </div>
    </div>
  );
}
