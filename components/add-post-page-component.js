import { renderHeaderComponent } from './header-component.js';
import { renderUploadImageComponent } from './upload-image-component.js';
import { renderPostsPageComponent } from './posts-page-component.js';
import { addPost } from '../api.js';

let imageUrl = '';


export function renderAddPostPageComponent({ appEl, token, onAddPostClick }) {
  const render = () => {
    // TODO: Реализовать страницу добавления поста
    const appHtml = `
    <div class="page-container">
        <div class="header-container"></div>
        <div class="form">
            <h3 class="form-title">
              Добавить пост
              </h3>
          <div class="form-inputs">
          <div class="upload-image-container"></div>
                <label>
                 Опишите фотографию: 
                    <textarea
                      class="input textarea" 
                    /></textarea>
                </label>
                <button class="button" id="add-button">Добавить</button>
          </div>
        </div>
    </div>    
  </div>
`;

    appEl.innerHTML = appHtml;

    renderHeaderComponent({
      element: document.querySelector('.header-container'),
    });

    const uploadImageContainer = appEl.querySelector('.upload-image-container');

    if (uploadImageContainer) {
      renderUploadImageComponent({
        element: appEl.querySelector('.upload-image-container'),
        onImageUrlChange(newImageUrl) {
          imageUrl = newImageUrl;
        },
      });
    }

    document.getElementById('add-button').addEventListener('click', () => {
      const inputValue = document
        .querySelector('.input')
        .value;
      if (imageUrl === '' || inputValue === '') {
        alert('Загрузите фото и опишите его');
      } else {
        addPost({
          description: inputValue,
          imageUrl,
          token,
        }).then(() => {
          renderPostsPageComponent({ appEl });
          onAddPostClick({
            description: inputValue,
            imageUrl,
          });
        });
      }
    });
  };

  render();
}

