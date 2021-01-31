const express = require('express')
const BlogPost = require('../models/blogModel');
const User = require('../models/userModel')
const sessionChecker = require('../middleware/sessionCheck')
const multer = require('multer')  //for image upload
const sharp = require('sharp') 
const upload = multer({
    // 'dest': 'images',  //saves in this folder
    'limits': { 
        'fileSize':1000000   //1 mb
    },
    fileFilter(req, file, cb) {
        
        if(!file) {
            console.log('no file')
            cb(undefined, false)
        }

        if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {   //only these files types
            return cb(new Error('please upload an image'))
        }
        console.log('file', file)
        cb(undefined, true)
    }
})

const router = new express.Router()

router.get('/api/blogpost', async (req, res) => {
    try {
      const blogposts = await BlogPost.findAll({ order: [['createdAt', 'DESC']], include:  [{ model: User, attributes: ['name'] }] });
      return res.send(blogposts);
    } catch (e) {
        
      return res.status(404).send(e)
    }
});

router.get('/api/blogpost/:id', async (req, res) => {
    try {
        const blogpost = await BlogPost.findOne({ where: { id: req.params.id } });
        if(!blogpost) {
            return res.status(404).send()
        }
        return res.send(blogpost);
    } catch (e) {
      return res.send(e);
    }
})

//upload image if you want
// router.post('/api/blogpost',sessionChecker, async (req, res) => {
    router.post('/api/blogpost', sessionChecker, upload.single('upload'), async (req, res) => {   //uses upload header in key
    try {
        let buffer
        if(req.file) {
            buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
        }
        const blogpost = BlogPost.build({
            ...req.body,
            imageUrl: buffer
        })
        console.log('blogpost', blogpost)
        await blogpost.save()
        res.status(201).send(blogpost)
    } catch (e) {
        res.status(400).send(e)
    }
})

//turn route into link for image
router.get('/api/blogpost/:id/image', async (req, res) => {
    try {
        const blogpost = await BlogPost.findOne({ where: { id: req.params.id } });

        if(!blogpost || !blogpost.imageUrl) {
            throw Error()
        }
        res.set('Content-Type', 'image/png')
        res.send(blogpost.imageUrl)

    } catch (e) {
        res.status(404).send()
    }
})

//TODO update this for images too
router.patch('/api/blogpost/:id', sessionChecker, async (req, res) => {
    try {
        const existingBp = await BlogPost.findOne({ where: { id: req.params.id, UserId:req.session.user.id } });
        const updatedBp =  await existingBp.update(req.body)
        return res.send(updatedBp)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/api/blogpost/:id', sessionChecker, async (req, res) => {
    try {
        await BlogPost.destroy({ where: { id: req.params.id, UserId: req.session.user.id  } })
        res.sendStatus(200)
    } catch (e) {
        res.sendStatus(404)
    }
})


module.exports = router