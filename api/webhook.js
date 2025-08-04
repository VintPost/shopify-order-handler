export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const { line_items } = req.body;
  const item = line_items[0];

  const sku = item.sku; // Ex: Gangloff beer - Jean d'Ylen - 1925
  const variantTitle = item.variant_title; // Ex: 30x40cm med kant

  // Sätt ihop rätt filnamn: [sku]_[variantTitle].png
  const folder = encodeURIComponent(sku);
  const filename = encodeURIComponent(`${sku}_${variantTitle}.png`);
  const fileUrl = `https://vintpost.b-cdn.net/${folder}/${filename}`;

  console.log('✅ Byggd URL:', fileUrl);

  return res.status(200).json({ image: fileUrl });
}
