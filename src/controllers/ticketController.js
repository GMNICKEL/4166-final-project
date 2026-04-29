import {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
} from "../services/ticketService.js";

export async function createTicketHandler(req, res, next) {
  try {
    const title = req.body.title;
    const description = req.body.description;
    const categoryId = req.body.categoryId;

    const newTicket = await createTicket(
      title,
      description,
      categoryId,
      req.user.id
    );

    res.status(201).json(newTicket);
  } catch (error) {
    next(error);
  }
}

export async function getAllTicketsHandler(req, res, next) {
  try {
    const tickets = await getAllTickets(req.user);
    res.status(200).json(tickets);
  } catch (error) {
    next(error);
  }
}

export async function getTicketByIdHandler(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const ticket = await getTicketById(id, req.user);
    res.status(200).json(ticket);
  } catch (error) {
    next(error);
  }
}

export async function updateTicketHandler(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const title = req.body.title;
    const description = req.body.description;
    const categoryId = req.body.categoryId;
    const status = req.body.status;

    const updatedTicket = await updateTicket(
      id,
      title,
      description,
      categoryId,
      status,
      req.user
    );

    res.status(200).json(updatedTicket);
  } catch (error) {
    next(error);
  }
}

export async function deleteTicketHandler(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    await deleteTicket(id, req.user);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}