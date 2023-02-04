const validateBlogs = (blogData) => {
    if (blogData.title === undefined || typeof(blogData.title) !== "string") {
        return {
            isValid: false,
            message: "title is required and must be of type string"
        }
    }
    if (blogData.text === undefined || typeof(blogData.text) !== "string") {
        return {
            isValid: false,
            message: "blog is required and must be of type string"
        }
    }
    if (blogData.author === undefined || typeof(blogData.author) !== "string") {
        return {
            isValid: false,
            message: "Author is required and it must be a string"
        }
    }
    if (blogData.category === undefined || !Array.isArray(blogData.category) || blogData.category.length === 0) {
        return {
            isValid: false,
            message: "category is required and must have length"
        }
    }
    const newBlogData = blogData.category.filter((blogs)=>{
        if (typeof(blogs) !== 'string') {
            return true
        } else {
            return false
        }
    })
    console.log("blogs", newBlogData)
    if (newBlogData.length > 0) {
        return {
            isValid: false,
            message: "category must be an array of strings"
        }
    }
    return {
        isValid: true
    }
}
module.exports = {
    validateBlogs,
}