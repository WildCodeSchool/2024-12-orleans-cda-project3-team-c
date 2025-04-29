import crypto from 'crypto';
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
  usersPictureFolderPath: path.join(
    fileURLToPath(import.meta.url),
    '..',
    '..',
    '..',
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

  // Nouvelle fonction renameFileUser pour générer un nom de fichier basé sur l'ID utilisateur
  renameFileUser(userId: string): string {
    return `user${userId}-mock.png`;
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
        path.join(this.usersPictureFolderPath, newFileName),
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

  // Nouvelle fonction pour l'upload de l'image de l'utilisateur
  async saveUserPicture(file: UploadedFile, userId: string) {
    try {
      // Sauvegarder le fichier temporairement
      await this.saveTemporary(file);

      // Renommer le fichier de l'utilisateur
      const newFileName = this.renameFileUser(userId);

      // Redimensionner l'image (si nécessaire) pour qu'elle ait une largeur maximale de 1080px
      await this.resizePicture(file.name, 1080);

      // Convertir l'image en format WebP
      const finalFileName = await this.convertPicture(file.name, 'webp');

      // Renommer le fichier avec le nom personnalisé
      await fs.rename(
        path.join(this.tempFolderPath, finalFileName),
        path.join(this.usersPictureFolderPath, newFileName),
      );

      return newFileName;
    } catch (error) {
      console.error(
        "Erreur lors de l'upload de la photo de l'utilisateur:",
        error,
      );
      throw new Error("Erreur lors de l'upload de la photo");
    }
  },
};
