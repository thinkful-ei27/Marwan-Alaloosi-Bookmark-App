'use strict';
/* global store api*/

const bookmarkList = (function () {

    const addBookMarkForm = `
    <form class="new-form">
    <input required type="text" name="new-bookmark-name" class="new-bookmark-name" placeholder="Title..">
    <input required type="url" name="new-bookmark-url" class="new-bookmark-url" placeholder="http://...">
    <br>
    <textarea required name="new-bookmark-desc" class="new-bookmark-desc" cols="30" rows="10" placeholder="Descripe your Bookmark here..!"></textarea>

    <div class="radio-buttons" >
    <label for="title" class="radio-title">Rate this bookmark!</label>

    <label for="one" class="label">1</label>
    <input type="radio" name="rating" value="1" class="radio-btn">

    <label for="two" class="label">2</label>
    <input type="radio" name="rating" value="2" class="radio-btn">

    <label for="three" class="label">3</label>
    <input type="radio" name="rating" value="3" class="radio-btn">

    <label for="four" class="label">4</label>
    <input type="radio" name="rating" value="4" class="radio-btn">

    <label for="five" class="label">5</label>
    <input type="radio" name="rating" value="5" class="radio-btn">
    </div>
    <br>
    <input type="submit" value="Submit" class="submit-btn">
    </form>
        `;

    const restoreNewButton = '<button name="subject" type="submit" class="add-new-bookmark-box">Add a Bookmark</button>';

    function serverError(error) {
        let message = '';
        if (error.responseJSON && error.responseJSON.message) {
          message = error.responseJSON.message;
        } else {
          message = `${error.code}: Server Error`;
        }
    
        return `
          <section class="error-content">
            <button id="cancel-error">X</button>
            <p>${message}</p>
          </section>
        `;
      }
    function generateBookmarkToHtml(bookmark) {

        let ratingHtml = `<div class="rating">No rating</div>`;
        if (bookmark.rating === 1) {
            ratingHtml = `<div class="rating">
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            </div>`;
        }
        if (bookmark.rating === 2) {
            ratingHtml = `<div class="rating">
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            </div>`;
        }
        if (bookmark.rating === 3) {
            ratingHtml = `<div class="rating">
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        </div>`;
        }
        if (bookmark.rating === 4) {
            ratingHtml = `<div class="rating">
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        </div>`;
        }
        if (bookmark.rating === 5) {
            ratingHtml = `<div class="rating">
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>
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

        const radioLabels = radLbl.toString().replace(/,/g, '');
        const radioButtons = radBtn.toString().replace(/,/g, '');

        let updateButtonToHtml = `<li class="container" data-bookmark-id="${bookmark.id}">
<div class="row2" bookmark-item">
  <div class="name-desc-box">
  <form class="update-form">
    <label for="bookmark-title" class="update-title-label">Title</label>
    <input class="update-bookmark-title" type="text" value="${bookmark.title}" /><br>
    <label for="bookmark-desc" class="update-desc-label">Description</label>
    <input class="update-bookmark-desc" type="text" value="${bookmark.desc}" /><br>
    <div class="update-radio-buttons">
    <label for="title" class="radio-title">Rate this bookmark!</label>
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

        if (!bookmark.adding) {
            updateButtonToHtml = `<li class="container" data-bookmark-id="${bookmark.id}">
    <div class="row2 bookmark-item">
    <div class="name-desc-box">
    <h2 class="bookmark-name">${bookmark.title}</h2>
    <p class="description">${bookmark.desc}</p>
    </div>
    ${ratingHtml}
    <div class="Links">
    <a href="${bookmark.url}" target="_blank" class="link"><code>Visit site</code></a> 
    </div>
    <hr>
    <button name="less-button" type="submit" class="change-button">Less</button>
    <button name="update-button" type="submit" class="update-button">Update</button>
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
    </div>
    ${ratingHtml}
    <button name="expand-button" type="submit" class="change-button">More</button>
    </div>
    </li>`;
    
        }

    }

    function render() {
        if (store.error) {
            const someError = serverError(store.error);
            $('.err-container').html(someError);
        } else {
            $('.err-container').empty();
        }

        let items = store.bookmarks;
        if (store.filter === 2) {
            items = store.bookmarks.filter(bookmark => bookmark.rating > 1)
        }
        if (store.filter === 3) {
            items = store.bookmarks.filter(bookmark => bookmark.rating > 2)
        }
        if (store.filter === 4) {
            items = store.bookmarks.filter(bookmark => bookmark.rating > 3)
        }
        if (store.filter === 5) {
            items = store.bookmarks.filter(bookmark => bookmark.rating === 5)
        }

        const bookmarksToString = generateString(items);
        $('.js-bookmarks-list').html(bookmarksToString)
    }

    function generateString(bookmarks) {
        const items = bookmarks.map((item) => generateBookmarkToHtml(item));
        return items.join('');
    }

    function getBookmarkIdFromElement(bookmark) {
        return $(bookmark).closest('.container').data('bookmark-id');
    }

    const handleNewBookmarkClicked = function () {
        $('.new-box').on('click', '.add-new-bookmark-box', event => {
            return $('.new-box').html(addBookMarkForm);
        });
    };

    function handleNewBookmarkSubmit() {
        $('.new-box').on('submit', '.new-form', function (event) {
            event.preventDefault();

            let bookmarkName = $('.new-bookmark-name').val();
            let bookmarkUrl = $('.new-bookmark-url').val();
            let bookmarkDesciptiom = $('.new-bookmark-desc').val();
            let bookmarkRating = $('input[name="rating"]:checked').val();
            let bookmarkRatingNumber = parseInt(bookmarkRating);

            let newBookMark = {
                title: bookmarkName,
                url: bookmarkUrl,
                desc: bookmarkDesciptiom,
                rating: bookmarkRatingNumber
            };

            api.createBookmark(newBookMark, (newBookmarkToStore) => {
                store.addBookmark(newBookmarkToStore);
                render();
            }, (error) => {
                store.setError(error);
                render();
            });

            $('.new-box').html(restoreNewButton);

        });
    }

    function handleDropDownFilter() {
        $('.filter-bookmarks').on('click', function (event) {
            event.preventDefault();

            let dropMenu = document.getElementById('drop-down-menu');
            let dropMenuVal = dropMenu.options[dropMenu.selectedIndex].value;
            store.filter = parseInt(dropMenuVal);

            render();
        });
    }

    const handleChangeBookmark = function(){
        $('.js-bookmarks-list').on('click','.change-button',function(event){
           const id = getBookmarkIdFromElement(this);
           const bookmark = store.findById(id);
           bookmark.expanded = !bookmark.expanded ;

           render();
        });
    };

    function handleDeleteBookmark() {
        $('.js-bookmarks-list').on('click','.delete-button',function(event){
            const id = getBookmarkIdFromElement(this);

            api.removeBookmark(id, () => {
                store.findAndDelete(id);
                render();
            });

        });
        }

        function handleExitError() {
            $('.err-container').on('click','#cancel-error',() => {
                store.setError(null);
                render();
            });
        }

        function handleUdpateBookmark() {
            $('.js-bookmarks-list').on('click','.update-button',(event)=>{
               event.preventDefault();
               const id = getBookmarkIdFromElement(event.currentTarget);
               const bookmark = store.findById(id);
               
               bookmark.adding = !bookmark.adding;
               render();

            })
        }

        function handleUpdateSubmit() {
            $('.js-bookmarks-list').on('submit','.update-form',(event)=>{
                event.preventDefault();
                const id = getBookmarkIdFromElement(event.currentTarget);
                const bookmark = store.findById(id);

                let newTitle = $('.update-bookmark-title').val();
                let newUrl = $('.update-bookmark-url').val();
                let newDescription = $('.update-bookmark-desc').val()
                let newRating = parseInt($('input[name="rating"]:checked').val());

                let newBookMark = {
                    title: newTitle,
                    url: newUrl,
                    desc: newDescription,
                    rating: newRating
                };

                api.updateBookmark(id, newBookMark, () => {
                    store.findAndUpdate(id, newBookMark);
                    render();
                  }, (error) => {
                    store.setError(error);
                    render();
                  });
            
            
                  bookmark.adding = !bookmark.adding;
                  render();
            });
        }

        function handleFunctionsExposed(){
            handleNewBookmarkClicked();
            handleNewBookmarkSubmit();
            handleDropDownFilter();
            handleChangeBookmark();
            handleDeleteBookmark();
            handleExitError();
            handleUdpateBookmark();
            handleUpdateSubmit();
        }

        return {
            render,
            handleFunctionsExposed,
        };

}());