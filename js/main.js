import { PICTURES_COUNT } from './consts.js';
import { getPictures } from './data.js';
import { renderGallery } from './gallery.js';

const picturesData = getPictures(PICTURES_COUNT);

renderGallery(picturesData);
