import { NextResponse } from 'next/server';
import pdfParse from 'pdf-parse';
import epubGen from 'epub-gen';
import { getFilenameSlug } from '@/utils/getFilenameSlug';

export async function POST(request: Request) {
  const textToRemove = ['https://sanderlei.com.br/https://sanderley.com/https://sanderleisilveira.com.br/'];

  const data = await request.formData();
  const file = data.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: 'Nenhum arquivo enviado' }, { status: 400 });
  }

  const fileBuffer = Buffer.from(await file.arrayBuffer());
  const fileData = await pdfParse(fileBuffer);

  let myBook = fileData.text;

  textToRemove.forEach(text => {
    myBook = myBook.replaceAll(text, '');
  });

  const options = {
    title: fileData.info.Title || 'Titulo do Livro',
    author: fileData.info.Author || 'Conversor',
    content: [
      {
        title: 'Capítulo 1',
        data: myBook, // Texto extraído do PDF
      },
    ],
  };

  const filenameSlug = getFilenameSlug(fileData.info.Title || crypto.randomUUID());

  return await new epubGen(options, `./public/${filenameSlug}.epub`).promise
    .then(() => {
      return NextResponse.json({ filenameSlug });
    })
    .catch(err => {
      console.log(err);
      return NextResponse.json({ error: 'epub generate error' });
    });
}
