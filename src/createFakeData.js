const Post = require('./models/post');

function createFakeData(){
    const posts = [...Array(40).keys()].map(i => ({
        title:`포스트 ${i}`,
        body:'안녕하세요',
        tags:['가짜','데이터']
    }))
    
    Post.insertMany(posts)}

module.exports = createFakeData;