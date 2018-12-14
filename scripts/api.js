'use strict';

const api = (function(){
let BASE_URL = "https://thinkful-list-api.herokuapp.com/Marwan"

const getBookmarks = function(callback){
    $.getJSON(`${BASE_URL}/bookmarks`,callback);
}
const createBookmark = function(bookmark,callback){
    const newBookMark = JSON.stringify({
        bookmark
    });

    $.ajax({
        url: `${BASE_URL}/bookmarks`,
        method: 'POST',
        contentType: 'application/json',
        data: newBookMark,
        success: callback,
        error: error
    });

};

const updateBookmark = function(id, updateData, callback){
    $.ajax({
        url: `${BASE_URL}/bookmarks/${id}`,
        method: 'PATCH',
        contentType: 'application/json',
        data: JSON.stringify(updateData),
        success: callback,
        error: error
    });
}

const deleteBookmark = function(id, callback) {
    $.ajax({
      url: `${BASE_URL}/bookmarks/${id}`,
      method: 'DELETE',
      contentType: 'application/json',
      success: callback,
    });
  };


    return{
BASE_URL,
createBookmark,
getBookmarks,
updateBookmark,
deleteBookmark
    }
}())