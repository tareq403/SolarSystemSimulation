// AssetManager handles loading of images
export class AssetManager {
    constructor() {
        this.images = new Map();
        this.loadedCount = 0;
        this.totalCount = 0;
    }

    // Load a single image
    async loadImage(url, key) {
        return new Promise((resolve) => {
            const img = new Image();

            img.onload = () => {
                this.images.set(key, img);
                this.loadedCount++;
                console.log(`Loaded: ${key} (${this.loadedCount}/${this.totalCount})`);
                resolve(img);
            };

            img.onerror = () => {
                console.warn(`Failed to load image: ${url}`);
                this.loadedCount++;
                // Don't reject - allow fallback to colored circles
                resolve(null);
            };

            img.src = url;
        });
    }

    // Load all images from asset list
    async loadAll(assetList) {
        this.totalCount = assetList.length;
        this.loadedCount = 0;

        const promises = assetList.map(asset =>
            this.loadImage(asset.url, asset.key)
        );

        await Promise.all(promises);
        console.log(`All assets loaded: ${this.loadedCount}/${this.totalCount}`);
    }

    // Get a loaded image
    getImage(key) {
        return this.images.get(key) || null;
    }

    // Check if an image is loaded
    hasImage(key) {
        return this.images.has(key);
    }

    // Get loading progress (0-1)
    getProgress() {
        if (this.totalCount === 0) return 1;
        return this.loadedCount / this.totalCount;
    }

    // Check if all assets are loaded
    isComplete() {
        return this.loadedCount === this.totalCount;
    }
}
