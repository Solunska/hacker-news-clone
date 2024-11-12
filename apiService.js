import axios from "axios";
export const fetchTopStories = async () => {
    const response = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json');
    return response.data;
};

export const fetchPostData = async (postId) => {
    const response = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${postId}.json`);
    const postData = response.data;

    return postData;
};

export const fetchPostDataWithComments = async (postId) => {
    const response = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${postId}.json`);
    const postData = response.data;

    if (postData.kids && postData.kids.length > 0) {
        postData.comments = await fetchComments(postData.kids);
    }

    return postData;
};


export const fetchComments = async (commentIds) => {
    const commentPromises = commentIds.map(async (commentId) => {
        const response = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${commentId}.json`);
        const commentData = response.data;

        if (commentData.kids && commentData.kids.length > 0) {
            commentData.comments = await fetchComments(commentData.kids);
        }

        return commentData;
    });

    return Promise.all(commentPromises);
};

export const loadPostsWithPagination = async (postsIDs, from, to) => {
    const slicedPostIds = postsIDs.slice(from, to);

    const postPromises = slicedPostIds.map(postId => fetchPostData(postId));
    const response = await Promise.all(postPromises);
    return response;
};

export const loadPosts = async (postsIDs) => {
    const postPromises = postsIDs.map(postId => fetchPostData(postId));
    const response = await Promise.all(postPromises);
    return response;
};