'use strict';
/* global store api*/

const bookmarkList = (function () {

    const addBookMarkForm = `
    <form class="new-bookmark">
    <h2>Create a bookmark</h2>
    
    <input required type="text" name="new-bookmark-name" class="new-bookmark-name" placeholder="Title..">
    <input required type="url" name="new-bookmark-url" class="new-bookmark-url" placeholder="http://...">
    <br>
    <textarea required name="new-bookmark-desc" class="new-bookmark-desc" cols="30" rows="10" placeholder="Descripe your Bookmark here..!"></textarea>

    <div class="radio-buttons" >
    <label for="title" class="radio-title">Rate this bookmark!</label>

    <label for="one" class="label">1</label>
    <input type="radio" name="rating" value="1"

    <label for="two" class="label">2</label>
    <input type="radio" name="rating" value="2"

    <label for="three" class="label">3</label>
    <input type="radio" name="rating" value="3"

    <label for="four" class="label">4</label>
    <input type="radio" name="rating" value="4"

    <label for="five" class="label">5</label>
    <input type="radio" name="rating" value="5" 
    </div>
    <br>
    <input type="submit" value="Submit" class="submit-btn">
    </form>
        `;

    const restoreNewButton = '<button name="subject" type="submit" class="show-new-bookmark-box">New Bookmark</button>';


    function generateBookmarkToHtml(bookmark) {

        let ratingHtml = `<div class="rating"No rating</div>`;
        if (bookmark.rating === 1) {
            ratingHtml = `<div class="rating">
            <span clas="fa fa-star checked"></span>
            <span clas="fa fa-star"></span>
            <span clas="fa fa-star"></span>
            <span clas="fa fa-star"></span>
            <span clas="fa fa-star"></span>
            </div>`;
        }
        if (bookmark.rating === 2) {
            ratingHtml = `<div class="rating">
            <span clas="fa fa-star checked"></span>
            <span clas="fa fa-star checked"></span>
            <span clas="fa fa-star"></span>
            <span clas="fa fa-star"></span>
            <span clas="fa fa-star"></span>
            </div>`;
        }
        if (bookmark.rating === 3) {
            ratingHtml = `<div class="rating">
        <span clas="fa fa-star checked"></span>
        <span clas="fa fa-star checked"></span>
        <span clas="fa fa-star checked"></span>
        <span clas="fa fa-star"></span>
        <span clas="fa fa-star"></span>
        </div>`;
        }
        if (bookmark.rating === 4) {
            ratingHtml = `<div class="rating">
        <span clas="fa fa-star checked"></span>
        <span clas="fa fa-star checked"></span>
        <span clas="fa fa-star checked"></span>
        <span clas="fa fa-star checked"></span>
        <span clas="fa fa-star"></span>
        </div>`;
        }
        if (bookmark.rating === 5) {
            ratingHtml = `<div class="rating">
    <span clas="fa fa-star checked"></span>
    <span clas="fa fa-star checked"></span>
    <span clas="fa fa-star checked"></span>
    <span clas="fa fa-star checked"></span>
    <span clas="fa fa-star checked"></span>
    </div>`;
        }

        const radBtn = [1, 2, 3, 4, 5].map(num => {
            if (num === bookmark.rating) {
                return `<input type="radio" class="radio-btn" name="rating" value="${num}" checked>`
            }
            return `<input type="radio" class="radio-btn" name="rating" value="${num}">`

        })

        const radLbl = [1, 2, 3, 4, 5].map(num => {
            return `<label for="${num}" class="label">${num}</label>`
        });

        const radioLabels = radLbl.toString().replace('');
        const radioButtons = radBtn.toString().replace('');

        let updateButtonToHtml = `<li class="container" data-bookmark-id="${bookmark.id}">
<div class="row2" bookmark-bookmark">
  <div class="name-description-box">
  <form class="update-form">
    <label for="bookmark-title" class="update-title-label">Title</label>
    <input class="update-bookmark-title" type="text" value="${bookmark.title}" /><br>
    <label for="bookmark-desc" class="update-desc-label">Description</label>
    <input class="update-bookmark-desc" type="text" value="${bookmark.desc}" /><br>
    <div class="update-radio-buttons">
    <label for="title" class="radio-title">How do you rate this out of 5?</label>
    ${radioLabels}<br>
    ${radioButtons}
    </div>
    <div class="links">
    <label for="bookmark-url" class="update-url-label">URL</label>
    <input class="update-bookmark-url" type="text" value="${bookmark.url}" />
    </div>
    <input type="submit" class="submit-update-button">
  </form>
  <button class="delete-button" type="submit" name="delete-button">Delete</button>
  </div>
</div>
</li>`;

        if (!bookmark.updated) {
            updateButtonToHtml = `<li class="container" data-bookmark-id="${bookmark.id}">
    <div class="row2 bookmark-bookmark">
    <div class="name-desc-box">
    <h2 class="bookmark-name">${bookmark.title}</h2>
    <p class="description">${bookmark.desc}</p>
    </div>
    ${ratingHtml}
    <div class=Links">
    <a href="${bookmark.url}" target="_blank" class="link">view Bookmark</a>
    </div>
    <button name="less-button" type="submit" class="change-button">Less</button>
    <button name="update-button" type="submit" class="edit-button">Update</button>
    <button name="delete-button" type="submit" class="delete-button">Delete</button>
    </div>
    </div>
    </li>
    `;
        }

        if (bookmark.expanded) {
            return `${updateButtonToHtml}`;
        }

        if (!bookmark.expanded) {
            return `<li class="container" data-bookmark-id="${bookmark.id}">
    <div class="row2 bookmark-item">
    <div class="name-desc-box">
    <h2 class="bookmark-name">${bookmark.title}</h2>
    <p class="description">${bookmark.desc}</p>
    </div>
    ${ratingHtml}
    <button name="expand-button" type="submit" class="change-button">More</button>
    </div>
    </li>
    `
        }

    }

    function render(){

        const bookmarksToString = '';
        $('.js-bookmark').html(bookmarksToString)
    }

    function generateString(bookmarks){
        const bookmarks = bookmark.map((item)=> generateBookmarkToHtml(item));
        return bookmarks.join('');
    }

    function getBookmarkIdFromElement(bookmark){
        return bookmark.closest('.container').data('bookmark-id');
    }

    const handleNewBookmarkClicked = function(){
        $('.new-box').on('click','.show-new-bookmark-box',function(event){
            return $('.new-box').html(addBookMarkForm);
        });
    };




}());