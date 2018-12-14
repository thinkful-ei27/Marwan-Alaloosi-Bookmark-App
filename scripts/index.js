'use strict'

/* global store api bookmarkList */

$(document).ready(function () {
    bookmarkList.render();
    bookmarkList.handleFunctionsExposed();
    api.getBookmarks((bookmarks) => {
      bookmarks.forEach((bookmark) => store.addBookmark(bookmark));
      bookmarkList.render();
    });
  
  });