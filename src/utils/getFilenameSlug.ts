export function getFilenameSlug(filename: string): string {
  return filename
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-_.]/g, '-') // Substitui caracteres especiais por '-'
    .replace(/-+/g, '-') // Substitui múltiplos '-' por um único '-'
    .replace(/(^-+|-+$)/g, ''); // Remove '-' do início e do fim
}
