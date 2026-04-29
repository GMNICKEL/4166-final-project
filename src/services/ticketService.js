import prisma from "../db.js";

export async function createTicket(title, description, categoryId, userId) {
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
  });

  if (!category) {
    const error = new Error("Category not found");
    error.status = 404;
    throw error;
  }

  const newTicket = await prisma.ticket.create({
    data: {
      title: title,
      description: description,
      categoryId: categoryId,
      userId: userId,
      status: "PENDING",
    },
    include: {
      category: true,
      user: {
        select: {
          id: true,
          email: true,
          role: true,
        },
      },
    },
  });

  return newTicket;
}

export async function getAllTickets(user) {
  if (user.role === "SUPPORT") {
    return await prisma.ticket.findMany({
      orderBy: {
        id: "asc",
      },
      include: {
        category: true,
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

  return await prisma.ticket.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      id: "asc",
    },
    include: {
      category: true,
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

export async function getTicketById(id, user) {
  const ticket = await prisma.ticket.findUnique({
    where: { id: id },
    include: {
      category: true,
      user: {
        select: {
          id: true,
          email: true,
          role: true,
        },
      },
    },
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

  return ticket;
}

export async function updateTicket(id, title, description, categoryId, status, user) {
  const existingTicket = await prisma.ticket.findUnique({
    where: { id: id },
  });

  if (!existingTicket) {
    const error = new Error("Ticket not found");
    error.status = 404;
    throw error;
  }

  if (user.role !== "SUPPORT" && existingTicket.userId !== user.id) {
    const error = new Error("Forbidden");
    error.status = 403;
    throw error;
  }

  const updateData = {};

  if (title !== undefined) {
    updateData.title = title;
  }

  if (description !== undefined) {
    updateData.description = description;
  }

  if (categoryId !== undefined) {
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      const error = new Error("Category not found");
      error.status = 404;
      throw error;
    }

    updateData.categoryId = categoryId;
  }

  if (status !== undefined) {
    if (user.role !== "SUPPORT") {
      const error = new Error("Forbidden");
      error.status = 403;
      throw error;
    }

    updateData.status = status;
  }

  const updatedTicket = await prisma.ticket.update({
    where: { id: id },
    data: updateData,
    include: {
      category: true,
      user: {
        select: {
          id: true,
          email: true,
          role: true,
        },
      },
    },
  });

  return updatedTicket;
}

export async function deleteTicket(id, user) {
  const existingTicket = await prisma.ticket.findUnique({
    where: { id: id },
  });

  if (!existingTicket) {
    const error = new Error("Ticket not found");
    error.status = 404;
    throw error;
  }

  if (user.role !== "SUPPORT" && existingTicket.userId !== user.id) {
    const error = new Error("Forbidden");
    error.status = 403;
    throw error;
  }

  await prisma.ticket.delete({
    where: { id: id },
  });
}