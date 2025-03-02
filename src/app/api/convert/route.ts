import { NextResponse } from 'next/server';
import pdfParse from 'pdf-parse';
import epubGen from 'epub-gen';

export async function POST(request: Request) {
  const data = await request.formData();
  const file = data.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: 'Nenhum arquivo enviado' }, { status: 400 });
  }

  const fileBuffer = Buffer.from(await file.arrayBuffer());
  const fileData = await pdfParse(fileBuffer);

  console.log(fileData);

  const options = {
    title: 'Documento Convertido',
    author: 'Conversor',
    content: [
      {
        title: 'Capítulo 1',
        data: fileData.text, // Texto extraído do PDF
      },
    ],
  };

  new epubGen(options, './public/livro.epub').promise
    .then(() => console.log('EPUB gerado com sucesso!'))
    .catch(err => console.error('Erro ao gerar EPUB:', err));

  return NextResponse.json({ ok: true });
}
