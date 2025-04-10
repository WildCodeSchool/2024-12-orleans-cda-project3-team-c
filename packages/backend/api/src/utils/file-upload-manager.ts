import type { UploadedFile } from 'express-fileupload';
import fs from 'node:fs/promises';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

export default {
  imageFormat: ['jpg', 'jpeg', 'png', 'webp', 'avif'],
  tempFolderPath: path.join(
    fileURLToPath(import.meta.url),
    '..',
    '..',
    '..',
    'public',
    'pictures',
    'temp',
  ),
  postsPictureFolderPath: path.join(
    fileURLToPath(import.meta.url),
    '..',
    '..',
    '..',
    'public',
    'pictures',
    'posts',
  ),

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
    await file.mv(path.join(this.tempFolderPath, file.name));
  },

  async checkNeedsResizing(fileName: string, size: number) {
    const metadata = await sharp(
      path.join(this.tempFolderPath, fileName),
    ).metadata();

    if (metadata.width !== undefined && metadata.width > size) {
      return true;
    }
    return false;
  },

  async checkNeedsConverting(fileName: string, format: string) {
    const metadata = await sharp(
      path.join(this.tempFolderPath, fileName),
    ).metadata();

    if (metadata.format !== format) {
      return true;
    }
    return false;
  },

  async resizePicture(fileName: string, width: number) {
    if (await this.checkNeedsResizing(fileName, 1080)) {
      await sharp(path.join(this.tempFolderPath, fileName))
        .resize(width)
        .toFile(path.join(this.tempFolderPath, fileName));
    }
  },

  async convertPicture(fileName: string, format: string) {
    if (await this.checkNeedsConverting(fileName, format)) {
      const newFileName = fileName.split('.')[0] + '.' + format;

      await sharp(path.join(this.tempFolderPath, fileName))
        .webp()
        .toFile(path.join(this.tempFolderPath, newFileName));

      await fs.unlink(path.join(this.tempFolderPath, fileName));

      await fs.rename(
        path.join(this.tempFolderPath, newFileName),
        path.join(this.postsPictureFolderPath, newFileName),
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
