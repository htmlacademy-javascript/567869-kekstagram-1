import { imageUploadInit } from './image-upload.js';
import { renderGallery } from './gallery.js';
import { getData } from './api.js';
import { showAlert } from './util.js';
import { enableFilters } from './filters.js';

try {
  const pictures = await getData();
  renderGallery(pictures);
  enableFilters(pictures);
} catch (err) {
  showAlert(err.message);
}

imageUploadInit();
