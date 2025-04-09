import type { UploadedFile } from 'express-fileupload';
import fs from 'node:fs/promises';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

export default {
  imageFormat: ['jpg', 'jpeg', 'png', 'webp', 'avif'],

  checkFormat(format: string) {
    if (this.imageFormat.includes(format.split('/')[1])) {
      return true;
    }
    return false;
  },

  renameFile(format: string): string {
    return `${crypto.randomUUID()}.${format.split('/')[1]}`;
  },

  async saveTemporary(file: UploadedFile) {
    await file.mv(
      path.join(
        fileURLToPath(import.meta.url),
        '..',
        '..',
        '..',
        'public',
        'pictures',
        'temp',
        file.name,
      ),
    );
  },

  async checkNeedsResizing(fileName: string, size: number) {
    const metadata = await sharp(
      path.join(
        fileURLToPath(import.meta.url),
        '..',
        '..',
        '..',
        'public',
        'pictures',
        'temp',
        fileName,
      ),
    ).metadata();

    if (metadata.width && metadata.width > size) {
      return true;
    }
    return false;

    console.log(metadata);
  },

  async checkNeedsConverting(fileName: string, format: string) {
    const metadata = await sharp(
      path.join(
        fileURLToPath(import.meta.url),
        '..',
        '..',
        '..',
        'public',
        'pictures',
        'temp',
        fileName,
      ),
    ).metadata();
    console.log(metadata);
    if (metadata.format !== format) {
      return true;
    }
    return false;
  },

  async resizePicture(fileName: string, width: number) {
    if (await this.checkNeedsResizing(fileName, 1080)) {
      await sharp(
        path.join(
          fileURLToPath(import.meta.url),
          '..',
          '..',
          '..',
          'public',
          'pictures',
          'temp',
          fileName,
        ),
      )
        .resize(1080)
        .toFile(
          path.join(
            fileURLToPath(import.meta.url),
            '..',
            '..',
            '..',
            'public',
            'pictures',
            'temp',
            fileName,
          ),
        );
    }
  },

  async convertPicture(fileName: string, format: string) {
    if (await this.checkNeedsConverting(fileName, format)) {
      const newFileName = fileName.split('.')[0] + '.webp';
      console.log('here');

      await sharp(
        path.join(
          fileURLToPath(import.meta.url),
          '..',
          '..',
          '..',
          'public',
          'pictures',
          'temp',
          fileName,
        ),
      )
        .webp()
        .toFile(
          path.join(
            fileURLToPath(import.meta.url),
            '..',
            '..',
            '..',
            'public',
            'pictures',
            'temp',
            newFileName,
          ),
        );

      await fs.unlink(
        path.join(
          fileURLToPath(import.meta.url),
          '..',
          '..',
          '..',
          'public',
          'pictures',
          'temp',
          fileName,
        ),
      );

      await fs.rename(
        path.join(
          fileURLToPath(import.meta.url),
          '..',
          '..',
          '..',
          'public',
          'pictures',
          'temp',
          newFileName,
        ),
        path.join(
          fileURLToPath(import.meta.url),
          '..',
          '..',
          '..',
          'public',
          'pictures',
          'posts',
          newFileName,
        ),
      );

      return newFileName;
    }
    return fileName;
  },

  async savePostPicture(fileName: string) {
    try {
      await this.resizePicture(fileName, 1080);
      const newName = await this.convertPicture(fileName, 'webp');
      return newName;
    } catch (error) {
      console.error(error);
    }
  },
};
