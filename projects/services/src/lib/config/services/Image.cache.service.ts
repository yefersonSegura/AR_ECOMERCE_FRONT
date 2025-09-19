import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class ImageCacheService {
  private cache = new Map<string, string>(); // key: url, value: dataURL

  async getImage(url: string): Promise<string> {
    if (this.cache.has(url)) return this.cache.get(url)!;

    const response = await fetch(url);
    const blob = await response.blob();
    const dataUrl = await this.blobToDataURL(blob);
    this.cache.set(url, dataUrl);
    return dataUrl;
  }

  private blobToDataURL(blob: Blob): Promise<string> {
    return new Promise(res => {
      const reader = new FileReader();
      reader.onload = () => res(reader.result as string);
      reader.readAsDataURL(blob);
    });
  }
}
