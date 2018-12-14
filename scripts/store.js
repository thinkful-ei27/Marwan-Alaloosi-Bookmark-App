'use strict'
/*global */

const store = (function(){

    const addBookmark = function (bookmark){
        this.bookmarks.push(bookmark);
    }

    const findById = function(id){
        return this.bookmarks.find(bookmark => bookmark.id === id);

    };


    const findAndUpdate = function(id, newData){
        let oldBookMark = this.bookmarks.find(bookmark => bookmark.id === id)
        Object.assign(oldBookMark,newData);
    }

    const findAndDelete = function(id) {
        this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id);
    };


    const setError = function(error){
        this.error = error;
    }

    return {      
        bookmarks: [],
        adding:  false,
        filter: 0,
        error: null,

        addBookmark,
        findById,
        findAndUpdate,
        findAndDelete,
        setError
    };   
}());