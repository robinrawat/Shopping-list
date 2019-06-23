const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

//Item Model
const Item = require('../../models/item');

//@route GET api/item
//@desc GET all item
//@acess public

router.get('/',(req,res)=>{
    Item.find()
        .sort({date: -1})
        .then(items => res.json(items))
});

//@route POST api/item
//@desc create a item
//@acess private
router.post('/',auth,(req,res)=>{
    const newItem = new Item({
        name: req.body.name
    });

    newItem.save().then(item => res.json(item));
});

//@route Delete api/item
//@desc create a item
//@acess private
router.delete('/:id',auth,(req,res) => {
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));        
});


module.exports = router;