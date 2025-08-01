import crypto from 'crypto';
import type { UploadedFile } from 'express-fileupload';
import fs from 'node:fs/promises';
import path from 'path';
import sharp from 'sharp';

export default {
  imageFormat: ['jpg', 'jpeg', 'png', 'avif'],
  tempFolderPath: path.join(process.cwd(), 'public', 'pictures', 'temp'),
  postPicturesFolderPath: path.join(
    process.cwd(),
    'public',
    'pictures',
    'posts',
  ),
  userPicturesFolderPath: path.join(
    process.cwd(),
    'public',
    'pictures',
    'users',
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
    if (await this.checkNeedsResizing(fileName, width)) {
      const newName = this.renameFile(`image/${fileName.split('.')[1]}`);

      await sharp(path.join(this.tempFolderPath, fileName))
        .resize(width)
        .toFile(path.join(this.tempFolderPath, newName));

      await fs.unlink(path.join(this.tempFolderPath, fileName));

      return newName;
    }
    return fileName;
  },

  async convertPicture(fileName: string, format: string, type: string) {
    if (await this.checkNeedsConverting(fileName, format)) {
      const newFileName = fileName.split('.')[0] + '.' + format;

      await sharp(path.join(this.tempFolderPath, fileName))
        .webp()
        .toFile(path.join(this.tempFolderPath, newFileName));

      await fs.unlink(path.join(this.tempFolderPath, fileName));

      switch (type) {
        case 'post':
          await fs.rename(
            path.join(this.tempFolderPath, newFileName),
            path.join(this.postPicturesFolderPath, newFileName),
          );
          break;

        case 'user':
          await fs.rename(
            path.join(this.tempFolderPath, newFileName),
            path.join(this.userPicturesFolderPath, newFileName),
          );
          break;
        default:
          break;
      }

      return newFileName;
    }
    return fileName;
  },

  async savePostPicture(fileName: string) {
    try {
      let newName: string;
      newName = await this.resizePicture(fileName, 1080);
      newName = await this.convertPicture(newName, 'webp', 'post');

      return newName;
    } catch (error) {
      console.error(error);
    }
  },

  async saveUserPicture(fileName: string) {
    try {
      let newName: string;
      newName = await this.resizePicture(fileName, 256);
      newName = await this.convertPicture(newName, 'webp', 'user');

      return newName;
    } catch (error) {
      console.error(
        "Erreur lors de l'upload de la photo de l'utilisateur:",
        error,
      );
      throw new Error("Erreur lors de l'upload de la photo");
    }
  },

  async deleteUserPicture(fileName: string) {
    try {
      const filePath = path.join(this.userPicturesFolderPath, fileName);
      await fs.unlink(filePath);
    } catch (error) {
      console.error(
        "Erreur lors de la suppression de l'image utilisateur :",
        error,
      );
    }
  },
};
