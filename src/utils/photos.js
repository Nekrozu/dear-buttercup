/** Resize user photos before browser storage so several photos can fit in localStorage. */
export function preparePhoto(file, maxDimension = 1150) {
  return new Promise((resolve, reject) => {
    if (!file?.type?.startsWith('image/')) { reject(new Error('Please choose an image file.')); return; }
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Could not read that photo.'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Could not open that image.'));
      img.onload = () => {
        const scale = Math.min(1, maxDimension / Math.max(img.width, img.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(img.width * scale));
        canvas.height = Math.max(1, Math.round(img.height * scale));
        const ctx = canvas.getContext('2d');
        if (!ctx) { reject(new Error('This browser cannot prepare images.')); return; }
        ctx.fillStyle = '#fff8f2';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', 0.73));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

export async function photosFromFiles(files) {
  const imageFiles = [...files].filter(file => file.type.startsWith('image/'));
  const photos = await Promise.all(imageFiles.map(async (file) => ({
    id: `user-${globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`}`,
    image: await preparePhoto(file),
    title: 'A moment of ours',
    caption: 'One of my favourite moments with you. ♡',
    date: '',
    alt: `Photo uploaded from ${file.name}`,
  })));
  return photos;
}
