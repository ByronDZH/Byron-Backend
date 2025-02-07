const logicDB = require('./logicDB')

const newBook = async (req,res) => {
    let book = req.body.book
    try{
        let response = await logicDB.newBookDB(book)
        res.status(200).json({
            'books':response
        })
        return
    }catch(error){
        res.status(500).json({error})
        return 
    }
}

const getBook = async (req,res)=>{
    try{
        let response = await logicDB.getBookDB()
        res.status(200).json({
            'books': response
        })
    }catch{
        res.status(500).json({error})
        return
    }
}

const delBookID = async (req,res)=>{
    let book = req.params.book
    try{
        let response = await logicDB.delBookIDDB(book)
        res.status(200).json({
            'books': response
        })
    }catch{
        res.status(500).json({error})
        return
    }
}

const delBook = async (req,res) => {
    let book = req.params.book;
    try {
        let response = await logicDB.delBookDB(book);
        if(response.deletedCount == 0){
            return res.status(200).json({
                'books': 'No existe o ya fué eliminado'
            });
        }else{
            return res.status(200).json({
                'books': response
            });
        }
        
    } catch(error){
        return res.status(500).json({ error }); 
    }
}
module.exports = {
    newBook,
    getBook,
    delBookID,
    delBook
}