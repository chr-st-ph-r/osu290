var http = {
	xhr: new XMLHttpRequest(),
	request: function(d) {
    var type = d.type,
    url = d.url,
    data = d.data || {},
    header = d.header || {};

    http.xhr.onreadystatechange = function() {
        if ( http.xhr.readyState === 4 ) {
            if ( http.xhr.status === 200 ) {
                try { // this will work on GET requests
                    var obj = JSON.parse( http.xhr.responseText );
                } catch(err) {
                    // but it will fail on POST requests and kill the function.
                    // all without informing you in any way...
                    // perhaps this is what is meant by "bubbling up"?
                    console.log(err);
                };
                d.callback(obj);
            };
        };
    }

    http.xhr.open(type, url, true);
    if (d.header) {
      http.xhr.setRequestHeader(d.header.head, d.header.value);
    }
    http.xhr.send(data);
    console.log(type, " request sent.");
  }
}

var U = {
    assert: function(condition, message) {
        if (!condition) {
            throw message || "Assertion failed";
        }
    },

    shuffle: function(array) {
        // http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array-in-javascript
        var counter = array.length;

        while (counter > 0) {
            var index = Math.floor(Math.random() * counter);

            counter--;

            var temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }
    },

    find: function(string) {
        return document.querySelector(string);
    },

    make: function(elem) {
        var e = document.createElement(elem);
        return e;
    },

    set: function(elem, attr, val) {
        elem.setAttribute(attr, val);
        return this;
    },

    add: function(father, child) {
        father.appendChild(child);
    }
}
