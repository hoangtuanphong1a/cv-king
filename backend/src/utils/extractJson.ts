export default function extractJson(raw: any[]): any {
  if (!raw?.[0]) return null;

  // Lấy object dòng đầu tiên
  const row = raw[0];
  // Lấy key đầu tiên của row (thường là 'JSON_F52E2B61...')
  const firstKey = Object.keys(row)[0];
  const jsonStr = row[firstKey];

  return jsonStr ? JSON.parse(jsonStr) : null;
}
export function extractJsonArray(raw: any[]): any[] {
  if (!raw?.[0]) return [];

  const firstRow = raw[0];
  const firstKey = Object.keys(firstRow)[0]; // lấy tên cột duy nhất trả về
  const jsonStr = firstRow[firstKey];

  if (!jsonStr || typeof jsonStr !== 'string') return [];

  try {
    const data = JSON.parse(jsonStr);
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error(
      'Failed to parse JSON from SQL result:',
      err,
      '\nRAW:',
      jsonStr?.slice(0, 200) + '...'
    );
    return [];
  }
}
