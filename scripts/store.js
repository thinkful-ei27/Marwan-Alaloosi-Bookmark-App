'use strict'

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

    const filterByRating = function(){
        return this.bookmarks.filter(bookmark => bookmark.rating >= rating);
    };

    const setError = function(err){
        this.err = err;
    }


    return {      
        bookmark: [],
        adding:  false,
        filter: 1,
        error: null,
        addBookmark,
        findById,
        findAndUpdate,
        findAndDelete,
        filterByRating,
    }   
}())