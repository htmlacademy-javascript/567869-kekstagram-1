import { DEFAULT_SCALE, PICTURES_COUNT } from './consts.js';
import { getPictures } from './data.js';
import { photoEditorInit } from './photo-editor.js';
import { renderGallery } from './gallery.js';
import { updateScale } from './scale.js';

const picturesData = getPictures(PICTURES_COUNT);

renderGallery(picturesData);

photoEditorInit();

updateScale(DEFAULT_SCALE);
<<<<<<< HEAD

=======
>>>>>>> f3126a6ba52b2f30f5e8121606dfe4dfee6b575a
