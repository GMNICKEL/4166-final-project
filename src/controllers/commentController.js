import {
  createComment,
  getAllComments,
  getCommentById,
  updateComment,
  deleteComment,
} from "../services/commentService.js";

export async function createCommentHandler(req, res, next) {
  try {
    const message = req.body.message;
    const ticketId = req.body.ticketId;

    const newComment = await createComment(message, ticketId, req.user);
    res.status(201).json(newComment);
  } catch (error) {
    next(error);
  }
}

export async function getAllCommentsHandler(req, res, next) {
  try {
    const comments = await getAllComments(req.user);
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
}

export async function getCommentByIdHandler(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const comment = await getCommentById(id, req.user);
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
}

export async function updateCommentHandler(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const message = req.body.message;

    const updatedComment = await updateComment(id, message, req.user);
    res.status(200).json(updatedComment);
  } catch (error) {
    next(error);
  }
}

export async function deleteCommentHandler(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    await deleteComment(id, req.user);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}