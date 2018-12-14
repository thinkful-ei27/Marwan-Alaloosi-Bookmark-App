'use strict';

const bookmark = (function () {
    
    const validateBookmark = function(bookmark){
        if (!name) throw new TypeError('Invalid input');

    }


    const create = function(name) {
    return {
        
            "id": cuid(),
            "title": store.bookmarks.title,
            "url": store.bookmarks.url,
            "desc": store.bookmarks.desc,
            "rating": store.bookmarks.rating
    };
  };

  return {
    validateBookmark,
    create,
  };

})()