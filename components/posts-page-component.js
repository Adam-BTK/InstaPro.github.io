import { POSTS_PAGE, USER_POSTS_PAGE } from '../routes.js';
import { renderHeaderComponent } from './header-component.js';
import { posts, goToPage } from '../index.js';
import { setPostLike, setPostDisLike } from '../api.js';
import { formatDistance } from 'date-fns';
import { ru } from 'date-fns/locale';

export function renderPostsPageComponent({ appEl, token }) {
  console.log('Актуальный список постов:', posts);

  if (posts.length === 0) {
    const postHtml = `<div class="page-container">
    <div class="header-container"></div>,
    </div>`;
    appEl.innerHTML = postHtml;
  }
  if (posts.length !== 0) {
    const postHtml = posts
      .map((post) => {
        return ` <li class="post">
          <div class="post-header" data-user-id=${post.user.id}>
              <img src=${post.user.imageUrl} class="post-header__user-image">
              <p class="post-header__user-name">${post.user.name}</p>
          </div>
          <div class="post-image-container">
            <img class="post-image" src=${post.imageUrl}>
          </div>
          <div class="post-likes">
            <button data-post-id=${post.id} data-is-Liked=${post.isLiked
          } class="like-button" >
            ${post.isLiked
            ? `<img src="./assets/images/like-active.svg" data-is-Liked=${post.isLiked} class="like-button-img" data-post-id=${post.id}>`
            : `<img src="./assets/images/like-not-active.svg" data-is-Liked=${post.isLiked} class="like-button-img" data-post-id=${post.id}>`
          }
            </button>
            <p class="post-likes-text">
              Нравится: <strong>${post.likes.length}</strong>
            </p>
          </div>
          <p class="post-text">
            <span class="user-name">${post.user.name}</span>
            ${post.description}
          </p>
          <p class="post-date">
            ${formatDistance(new Date(), new Date(post.createdAt), { locale: ru })} назад
          </p>
        </li>`;
      })
      .join('');
    const appHtml = `<div class="page-container">
      <div class="header-container"></div>
      <ul class="posts">
        ${postHtml}
      </ul>
    </div>`;
    appEl.innerHTML = appHtml;
  }

  renderHeaderComponent({
    element: document.querySelector('.header-container'),
  });

  for (let userEl of document.querySelectorAll('.post-header')) {
    userEl.addEventListener('click', () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
      console.log(userEl.dataset.userId);
    });
  }

  const buttonLike = document.querySelectorAll('.like-button');
  for (const buttonEl of buttonLike) {
    buttonEl.addEventListener('click', () => {
      const id = buttonEl.dataset.postId;
      if (buttonEl.dataset.isLiked === 'false') {
        setPostLike({ id, token }).then(() => {
          goToPage(POSTS_PAGE);
        });
      }
      if (buttonEl.dataset.isLiked === 'true') {
        setPostDisLike({ id, token }).then(() => {
          goToPage(POSTS_PAGE);
        });
      }
    });
  }
}
