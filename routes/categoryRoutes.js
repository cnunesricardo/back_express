const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController')

router.get('/', (req, res) => {
    categoryController.getCategories()
    .then((categories) => res.json(categories))
    .catch((error) => res.status(500).send('Base de dados não acessível'))

    console.log('camada de roteamento');
})

router.post('/', (req, res) =>{
    const newCategory = req.body;
    categoryController.createCategory(newCategory)
        .then(() => res.status(201).send('Categoria criada com sucesso'))
        .catch((error) => res.status(500).send('Ocorreu um erro interno no servidor'))
})

router.delete('/', (req, res) =>{
    const categoryRecived = req.body.name;
    categoryController.deleteCategory(categoryRecived)
        .then(() => res.status(201).send('Categoria deletada com sucesso'))
        .catch((error) => res.status(500).send('Ocorreu um erro interno no servidor'))
})


router.put('/', (req, res) => {
    const currentCategoryName = req.body.name;
    const updatedData = req.body.name2;

    categoryController.updateCategory(currentCategoryName, updatedData)
        .then(() =>{
            res.status(201).send("Produto atualizado com sucesso!")
        })
        .catch((error) => {
           res.send(error);
        })
})

module.exports = router;