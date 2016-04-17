var express = require('express');
var path = require('path');
var router = express.Router();


router.get('/', function(request, response){
    response.sendFile(path.join(__dirname, '../public/views/index.html'));
    //  So maybe this just means if we go to the homepage of our webpage, with no gets or posts or anything, from the server, just open up the index.html page for a view. It seems like it might be kind of deceiving though, because it never shows us in our url that we're really in something like localhost:3000/database-name, even though we're linked up. The first time we do localhost:3000/assignmentsData - we're actually in the collection - right? Or not? Hmmm...
});

//

module.exports = router;
