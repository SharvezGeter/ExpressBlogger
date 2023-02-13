
const { v4: uuidv4 } = require("uuid");
const express = require("express");
const { validateBlogs } = require("../validation/blogs");
const router = express.Router();

//instantiate mogodb
const { db } = require("../mongo");

/* GET users listing. */
router.get("/", async (req, res, next) => {
  const blogs = await db()
    .collection("sample_blogs")
    .find()
    .limit()
    .toArray();

  res.json({ success: true, blogs: blogs });
});
// router.get("/all", async (req, res, next) => {
//   res.json({
//     success: true,
//     blogs: blogs
//   });
// });

// new assignment 
router.get("/all", async function (req, res, next){
  const blogs = await db()
    .collection('sample_blogs')
    .find()
    .toArray(function(err, result){
    if(err){
      res.status(400).send('error fetching blogs')
    }else{
      res.json(result)
    }
    })
  
    res.json({
    success:true,
    blogs: blogs,
    })
  
  });
router.get("/get-one", async function (req, res, next){
  const blogs = await db()
    .collection('sample_blogs')
    .find()
    .limit(1)
    .toArray(function(err, result){
    if(err){
      res.status(400).send('error fetching blogs')
    }else{
      res.json(result)
    }
    })
  
    res.json({
    success:true,
    blogs: blogs,
    })
  
  });


router.get("/get-one/:id", async (req, res, next)=>{
  const blogPosts = await db()
  .collection("sample_blogs")
  .findOne({
    id: req.params.id  
  })
  
  res.json({
    success: true,
    singleBlog: blogPosts
  })
})



// router.get("/single/:title", async (req, res) => {
//   const singleBlog = sampleBlogs.find((blog) => {
//     return blog.title === req.params.title;
//   });
//   res.json({
//     success: true,
//     allBlogs: singleBlog,
//   });
// });

// router.delete("/delete/:title", async (req, res, next) => {
//   const blogToDelete = req.params.title;

//   const deleteBlogIndex = sampleBlogs.findIndex((blog) => {
//     return blog.title === blogToDelete;
//   });

//   sampleBlogs.splice(deleteBlogIndex, 1);

//   res.json({
//     success: true,
//   });
// });
router.post("/create-one", async function (req, res, next) {

  const id =  uuidv4();
  const text = req.body.text;
  const title = req.body.title;
  const author = req.body.author;
  const categories = req.body.categories;
  const createdAt = new Date();
  const lastModified = new Date();

  const newBlog ={
    id,
    text,
    title,
    author,
    categories,
    createdAt,
    lastModified,
  }

  const addBlog = await db()
          .collection('sample_blogs')
          .insertOne(newBlog, function (err, _result) {
            if (err) {
              res.status(400)
                  .send(`Error adding blog!`);
           } else {
              console.log('1 document added');
              res.status(204).send();
          }
        })

  res.json({
    success: true,
    blogs: newBlog
  });
});

//Stretch Goals
router.get("/get-multi", async function (req, res, next){
  const blogs = await db()
  .collection("sample_blogs")
  .find()
  .sort()
  .limit(3)
  .toArray(function(err, result){
    if(err){
      res.status(400).send('error fetching blogs')
    }else{
      res.json(result)
    }
    })



  res.json({
    success: true,
    blogs: blogs
  })
})



// router.put("/update-blog/:title", async (req, res) => {
//   const blogTitleToFind = req.params.title;

//   const originalBlog = sampleBlogs.find((blog) => {
//     return blog.title === blogTitleToFind;
//   });
//   const originalBlogIndex = sampleBlogs.findIndex((blog) => {
//     return blog.title === blogTitleToFind;
//   });

//   if (!originalBlog) {
//     res.json({
//       success: true,
//     });
//   }

//   const updatedBlog = {};

//   if (req.body.title !== undefined) {
//     updatedBlog.title = req.body.title;
//   } else {
//     updatedBlog.title = originalBlog.title;
//   }

//   if (req.body.author !== undefined) {
//     updatedBlog.author = req.body.author;
//   } else {
//     updatedBlog.author = originalBlog.author;
//   }

//   if (req.body.text !== undefined) {
//     updatedBlog.text = req.body.text;
//   } else {
//     updatedBlog.text = originalBlog.text;
//   }

//   sampleBlogs[originalBlogIndex] = updatedBlog;

//   res.json({
//     success: true,
//     blogs: updatedBlog,
//   });
// });











module.exports = router;

// const sampleBlogs = [
//   {
//     title: "dicta",
//     text: "Iusto et in et. Nulla accusantium fugit. Et qui dolorem inventore soluta et veritatis. Aut ut aut non laudantium eveniet suscipit odit. Sapiente sint nihil nihil sit et molestias. In nisi omnis quas et sed aut minus aperiam ea.\n \rLaudantium quo quisquam quae. Et et quas officia perspiciatis iusto sunt sunt eaque. Quidem sit voluptas deserunt sequi magni.\n \rEst est facere cumque ipsam omnis animi. Voluptatem magnam officiis architecto possimus. Quia similique aut eos qui. Quasi quae sed aliquam.",
//     author: "Darren Abbott",
//     category: ["Lorem", "sit", "amet"],
//     createdAt: "2022-03-22T10:36:37.176Z",
//     lastModified: "2022-03-22T10:36:37.176Z",
//   },
//   {
//     title: "ducimus",
//     text: "Placeat ea et fuga. Qui itaque quibusdam nam. Maxime nobis quam. Et laudantium sunt incidunt reiciendis.\n \rEarum aut sed omnis autem aliquam architecto corporis sint. Nostrum cumque voluptatem aperiam alias similique. Tenetur et esse omnis praesentium ipsum alias. Impedit rerum qui quia quaerat architecto mollitia est autem. Qui blanditiis earum et qui dolorum reprehenderit. Debitis est temporibus.\n \rEt nam sed. Corporis ut rerum. Ut qui dolore est dolorem ex.",
//     author: "Luke Rogahn PhD",
//     category: ["Lorem", "ipsum"],
//     createdAt: "2022-03-22T15:16:56.285Z",
//     lastModified: "2022-03-22T15:16:56.285Z",
//   },
//   {
//     title: "quod",
//     text: "Accusamus nisi eos. Tenetur earum tenetur nemo. Qui voluptas temporibus repellendus maxime. Ipsum optio voluptate enim nihil. Ea et dolorem. Omnis unde perspiciatis.\n \rUt odio eaque. Harum non placeat. Eveniet molestiae in cupiditate dolor doloremque rerum eligendi aut ab.\n \rMolestias eligendi et. Nemo velit natus autem numquam atque provident et nulla. In et dolores ad nihil. Delectus quis doloremque asperiores similique. Asperiores id nam vitae nobis labore autem. Dolor aperiam provident quia consectetur aut ut.",
//     author: "Maryann Schneider",
//     category: ["Lorem", "ipsum", "dolor", "sit", "amet"],
//     createdAt: "2022-03-21T20:09:32.298Z",
//     lastModified: "2022-03-21T20:09:32.298Z",
//   },
//   {
//     title: "ut",
//     text: "Itaque necessitatibus repudiandae. Porro suscipit exercitationem qui atque. Perferendis suscipit debitis sint aut dignissimos nobis ut. Modi ea nihil est vel consequuntur voluptatem. In magnam delectus in eos reiciendis sit est enim eligendi. Sint dicta at.\n \rConsectetur aspernatur alias sed non explicabo blanditiis laborum fugit voluptate. Reiciendis iste aut sit natus qui et in ratione. Placeat qui in voluptatum autem nulla ratione. Commodi sit alias sint sapiente rem. Quia sapiente minus deleniti vitae.\n \rExercitationem numquam omnis maxime dolorum sed deserunt suscipit laudantium. Ad et autem voluptatem esse laudantium et. Id fuga accusamus est sapiente dicta.",
//     author: "Dr. Lorenzo Anderson",
//     category: ["ipsum", "dolor", "sit", "amet"],
//     createdAt: "2022-03-21T23:07:53.447Z",
//     lastModified: "2022-03-21T23:07:53.447Z",
//   },
//   {
//     title: "id",
//     text: "Porro officia aliquid fugiat sed reprehenderit illo amet doloribus sed. Molestiae vero et. Quae voluptates dolores. Voluptatem facere fuga. Veniam perferendis illo ut sunt earum deleniti.\n \rIusto neque dolorem esse error. Saepe et quia ut corrupti. Autem repellendus similique dolorem sunt in ipsa perferendis. Et excepturi ut voluptatem deserunt accusantium dolores aperiam cum ut.\n \rDoloremque expedita sit et voluptatem unde libero. Numquam beatae sed repellat iusto doloribus fugit tenetur. Possimus et ut adipisci harum voluptatem provident consequatur. Corporis quo aut vel itaque blanditiis illum.",
//     author: "Bobbie Dach",
//     category: ["amet"],
//     createdAt: "2022-03-22T15:14:39.819Z",
//     lastModified: "2022-03-22T15:14:39.819Z",
//   },
// ];
