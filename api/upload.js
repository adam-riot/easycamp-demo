import { handleUpload } from '@vercel/blob/client';

// Issues a short-lived client-upload token so the admin browser can upload
// images straight to Blob (bypasses the function body size limit). The admin
// password is passed as the clientPayload and verified here before a token is granted.
export default async function handler(req, res) {
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const jsonResponse = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        if (!process.env.ADMIN_PASSWORD || clientPayload !== process.env.ADMIN_PASSWORD) {
          throw new Error('Kata laluan salah.');
        }
        return {
          allowedContentTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
          addRandomSuffix: true,
          maximumSizeInBytes: 10 * 1024 * 1024
        };
      },
      onUploadCompleted: async () => {}
    });
    return res.status(200).json(jsonResponse);
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
}
