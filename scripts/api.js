'use strict';
/* global */

const api = (function(){
let BASE_URL = "https://thinkful-list-api.herokuapp.com/Marwan"

const getBookmarks = function(callback){
    $.getJSON(`${BASE_URL}/bookmarks`,response => {
        callback(response);
    });
}
const createBookmark = function(name,callback,error){
    let newBookMark = name;

    $.ajax({
        url: `${BASE_URL}/bookmarks`,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(newBookMark),
        success: callback,
        error: error
    });

};

const updateBookmark = function(id, updateData,success, error){
    $.ajax({
        url: `${BASE_URL}/bookmarks/${id}`,
        method: 'PATCH',
        contentType: 'application/json',
        data: JSON.stringify(updateData),
        success: success,
        error: error
    });
}

const removeBookmark = function(id, callback) {
    $.ajax({
      url: `${BASE_URL}/bookmarks/${id}`,
      method: 'DELETE',
      success: callback,
    });
  };


return{
createBookmark,
getBookmarks,
updateBookmark,
removeBookmark
    }
}())