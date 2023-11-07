const filesystem = require('fs').promises;
const path = require('path');

const categoriesFilePath = path.join(__dirname, '../data/categories.json');

const getCategories = () => {
    return filesystem.readFile(categoriesFilePath, 'utf-8')
        .then((categoriesData) => JSON.parse(categoriesData))
        .catch((error) => {
            throw new Error('Não foi possível ler o arquivo');
        });
};

const createCategory = (newCategory) => {
    return getCategories()
    .then((categoriesData) => {
        categoriesData.push({ name: newCategory.name });
        return filesystem.writeFile(categoriesFilePath, JSON.stringify(categoriesData, null, 2),'utf-8');
    })
    .catch((error) => {
        throw new Error('A categoria não foi criada')
    })
}

const deleteCategory  = (categoryRecived) => {    
    return getCategories()
        .then((categoriesData) => {
            const categoryIndex = categoriesData.findIndex(
                category => category.name === categoryRecived 
            )

            if(categoryIndex != -1){

                const updatedCatecoriesData =  categoriesData.filter(
                    category => category.name != categoryRecived
                )

                const deletedCategory = categoriesData[categoryIndex];

                return filesystem.writeFile(categoriesFilePath, JSON.stringify(updatedCatecoriesData, null, 2), 'utf-8')
                    .then(() =>{
                        return deletedCategory;
                    })
                    .catch((error) => {
                        throw new Error('Não foi possível excluir a categoria!')
                    })


            } else {
                throw new Error('Categoria não encontrada!')
            }

            
        })
        .catch((error) => {
            throw new Error('Base dados não disponível')
        })
}


const updateCategory = (currentCategoryName, updatedData) => {

    return getCategories()
        .then((categoriesData) => {
            const categoryIndex = categoriesData.findIndex(
                category => category.name === currentCategoryName
            )

            if(categoryIndex != -1){
                const existingCategory = categoriesData[categoryIndex];

                if(updatedData != undefined){
                    existingCategory.name = updatedData;
                } 
                
                categoriesData[categoryIndex] = existingCategory;

                return filesystem.writeFile(categoriesFilePath, JSON.stringify(categoriesData, null, 2), 'utf-8')
                    .then(() => {
                        return existingCategory;
                    })
                    .error((error) => {
                        throw new Error('Não foi possível atualizar a categoria!')
                    })

            } else {
                throw new Error('A categoria não foi encontrada');
            }

            }
        )
        .catch((error) => {
            throw new Error('Não possível ler as categorias!');
        })

}




module.exports = {
    getCategories,
    createCategory,
    deleteCategory,
    updateCategory
};