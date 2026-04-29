import prisma from "../db.js";

export async function createComment(message, ticketId, user) {
  const ticket = await prisma.ticket.findUnique({
    where: { id: ticketId },
  });

  if (!ticket) {
    const error = new Error("Ticket not found");
    error.status = 404;
    throw error;
  }

  if (user.role !== "SUPPORT" && ticket.userId !== user.id) {
    const error = new Error("Forbidden");
    error.status = 403;
    throw error;
  }

  const newComment = await prisma.comment.create({
    data: {
      message: message,
      ticketId: ticketId,
      userId: user.id,
    },
    include: {
      ticket: true,
      user: {
        select: {
          id: true,
          email: true,
          role: true,
        },
      },
    },
  });

  return newComment;
}

export async function getAllComments(user) {
  if (user.role === "SUPPORT") {
    return await prisma.comment.findMany({
      orderBy: {
        id: "asc",
      },
      include: {
        ticket: true,
        user: {
          select: {
            id: true,
            email: true,
            role: true,
          },
        },
      },
    });
  }

  return await prisma.comment.findMany({
    where: {
      OR: [
        { userId: user.id },
        {
          ticket: {
            userId: user.id,
          },
        },
      ],
    },
    orderBy: {
      id: "asc",
    },
    include: {
      ticket: true,
      user: {
        select: {
          id: true,
          email: true,
          role: true,
        },
      },
    },
  });
}

export async function getCommentById(id, user) {
  const comment = await prisma.comment.findUnique({
    where: { id: id },
    include: {
      ticket: true,
      user: {
        select: {
          id: true,
          email: true,
          role: true,
        },
      },
    },
  });

  if (!comment) {
    const error = new Error("Comment not found");
    error.status = 404;
    throw error;
  }

  if (
    user.role !== "SUPPORT" &&
    comment.userId !== user.id &&
    comment.ticket.userId !== user.id
  ) {
    const error = new Error("Forbidden");
    error.status = 403;
    throw error;
  }

  return comment;
}

export async function updateComment(id, message, user) {
  const existingComment = await prisma.comment.findUnique({
    where: { id: id },
  });

  if (!existingComment) {
    const error = new Error("Comment not found");
    error.status = 404;
    throw error;
  }

  if (user.role !== "SUPPORT" && existingComment.userId !== user.id) {
    const error = new Error("Forbidden");
    error.status = 403;
    throw error;
  }

  const updatedComment = await prisma.comment.update({
    where: { id: id },
    data: {
      message: message,
    },
    include: {
      ticket: true,
      user: {
        select: {
          id: true,
          email: true,
          role: true,
        },
      },
    },
  });

  return updatedComment;
}

export async function deleteComment(id, user) {
  const existingComment = await prisma.comment.findUnique({
    where: { id: id },
  });

  if (!existingComment) {
    const error = new Error("Comment not found");
    error.status = 404;
    throw error;
  }

  if (user.role !== "SUPPORT" && existingComment.userId !== user.id) {
    const error = new Error("Forbidden");
    error.status = 403;
    throw error;
  }

  await prisma.comment.delete({
    where: { id: id },
  });
}