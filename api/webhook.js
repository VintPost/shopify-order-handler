export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const { line_items } = req.body;

  const urls = line_items.map(item => {
    const sku = item.sku;
    const variantTitle = item.title;

    const folderName = encodeURIComponent(sku);
    const fileName = encodeURIComponent(`${sku}_${variantTitle}.png`);

    return `https://vintpost.b-cdn.net/${folderName}/${fileName}`;
  });

  console.log('Generated URLs:', urls);

  return res.status(200).json({ urls });
}
