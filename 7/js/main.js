import { getPictures } from './data.js';
import { renderGallery } from './gallery.js';

const picturesData = getPictures(25);

renderGallery(picturesData);
