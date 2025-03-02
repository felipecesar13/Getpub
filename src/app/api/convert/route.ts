export async function POST(requst: Request) {
  const data = await requst.formData();

  console.log(data);

  const file = data.get('file');

  console.log(file);
}
