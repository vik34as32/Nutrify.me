const mongoose = require('mongoose');
const url =process.env.DATABASE

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
    .then(()=>{ 
        console.log('DATABASE Is Connected Sucessfully')
        })
    .catch((error) => {
        console.error("DATABASE Is  not Connected",error)
        });


module.exports =mongoose