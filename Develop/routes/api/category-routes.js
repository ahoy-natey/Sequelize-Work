const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const catagoryData = await Category.findAll({include: [Product]});
    res.status(200).json(catagoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const catagoryData = await Category.findByPk(req.params.id, {
      // JOIN with Catagory, using the products through table
      include: [Product]
    });

    if (!catagoryData) {
      res.status(404).json({ message: 'No Category found with this id!' });
      return;
    }

    res.status(200).json(catagoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const catagoryData = await Category.create(req.body);
    res.status(200).json(catagoryData);
  } catch (err) {
    res.status(400).json(err);
  }
  // create a new category
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const catagoryData = await Category.update(req.body, {where: {id: req.params.id}})
    res.status(200).json(catagoryData)
  } catch (err) {
    res.status(404).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const catagoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!catagoryData) {
      res.status(404).json({ message: 'No Category found with this id!' });
      return;
    }

    res.status(200).json(catagoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
