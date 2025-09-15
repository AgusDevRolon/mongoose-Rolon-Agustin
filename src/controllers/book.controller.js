import bookModel from "../models/book.model";

export const createBook = async (req, res)=>{
    const {title, description, publishedDate, author, reviews} = req.body;
    try{
        const newBook = await bookModel.create({
            title,
            description,
            publishedDate,
            author,
            reviews: reviews || [],
        });
        res.status(201).json({
            ok: true,
            msg:"libro creado correctamente",
            data: newBook,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "error interno del server"
        });
    }
};

export const getAllBook = async (req, res)=>{
    try{
        const books = await bookModel.find().populate("author");
        return res.status(200).json({
            ok: true,
            data: books,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg:"error interno del server",
        });
    }
};

export const getBookById = async (req, res)=>{
    const {id} = req.params;
    try{
        const book = await bookModel.findById(id).populate("author");
        if (!book){
            return res.status(404).json({
                ok: false,
                msg: "libro no encontrado",
            });
        }
        return res.status(200).json({
            ok: true,
            data: book,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "error interno del server",
        });
    }
};

export const updateBook = async (req, res)=>{
    const {id} = req.params;
    try {
        const updateBook = await bookModel.findByIdAndUpdate( 
            id,
            req.body,
            {new: true}
        ).populate("author");
        if (!updateBook){
            return res.status(404).json({
                ok: false,
                msg: "libro no encontrado",
            });
        }
        return res.status(200).json({
            ok: true,
            msg: "libro actualizado correctamente",
            data: updateBook,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "error interno del server",
        });
    }
};

export const deleteBook = async (req, res)=>{
    const {id} = req.params;
    try{
        const deleteBook = await bookModel.findByIdAndDelete(id);
        if (!deleteBook){
            return res.status(404).json({
                ok: false,
                msg: "libro no encontrado",
            });
        }
        return res.status(200).json({
            ok: true,
            msg: "libro eliminado correctamente",
            data: deleteBook,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "error interno del server",
        });
    }
};

export const addReviewToBook = async (req, res) => {
  const { bookId } = req.params;
  const { user, content, rating } = req.body;

  try {
    const book = await bookModel.findById(bookId);
    if (!book) {
      return res.status(404).json({
        ok: false,
        msg: "Libro no encontrado",
      });
    }

    const newReview = { user: mongoose.Types.ObjectId(user), content, rating };
    book.reviews.push(newReview);
    await book.save();

    return res.status(201).json({
      ok: true,
      msg: "Review agregada correctamente",
      data: book,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

export const updateReviewInBook = async (req, res) => {
  const { bookId, reviewId } = req.params;
  const { content, rating } = req.body;

  try {
    const book = await bookModel.findById(bookId);
    if (!book) {
      return res.status(404).json({
        ok: false,
        msg: "Libro no encontrado",
      });
    }

    const review = book.reviews.id(reviewId);
    if (!review) {
      return res.status(404).json({
        ok: false,
        msg: "Review no encontrada",
      });
    }

    review.content = content || review.content;
    review.rating = rating || review.rating;

    await book.save();

    return res.status(200).json({
      ok: true,
      msg: "Review actualizada correctamente",
      data: book,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

export const deleteReviewFromBook = async (req, res) => {
  const { bookId, reviewId } = req.params;

  try {
    const book = await bookModel.findById(bookId);
    if (!book) {
      return res.status(404).json({
        ok: false,
        msg: "Libro no encontrado",
      });
    }

    const review = book.reviews.id(reviewId);
    if (!review) {
      return res.status(404).json({
        ok: false,
        msg: "Review no encontrada",
      });
    }

    review.remove();
    await book.save();

    return res.status(200).json({
      ok: true,
      msg: "Review eliminada correctamente",
      data: book,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

export {
    createBook,
    getBookById,
    getAllBook,
    updateBook,
    deleteBook,
    addReviewToBook,
    updateReviewInBook,
    deleteReviewFromBook
};