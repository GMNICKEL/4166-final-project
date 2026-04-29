import prisma from "../db.js";

export async function createCategory(name) {
  const existingCategory = await prisma.category.findUnique({
    where: { name: name },
  });

  if (existingCategory) {
    const error = new Error("Category already exists");
    error.status = 409;
    throw error;
  }

  const newCategory = await prisma.category.create({
    data: {
      name: name,
    },
  });

  return newCategory;
}

export async function getAllCategories() {
  const categories = await prisma.category.findMany({
    orderBy: {
      id: "asc",
    },
  });

  return categories;
}

export async function getCategoryById(id) {
  const category = await prisma.category.findUnique({
    where: { id: id },
  });

  if (!category) {
    const error = new Error("Category not found");
    error.status = 404;
    throw error;
  }

  return category;
}

export async function updateCategory(id, name) {
  const existingCategory = await prisma.category.findUnique({
    where: { id: id },
  });

  if (!existingCategory) {
    const error = new Error("Category not found");
    error.status = 404;
    throw error;
  }

  const duplicateCategory = await prisma.category.findUnique({
    where: { name: name },
  });

  if (duplicateCategory && duplicateCategory.id !== id) {
    const error = new Error("Category already exists");
    error.status = 409;
    throw error;
  }

  const updatedCategory = await prisma.category.update({
    where: { id: id },
    data: {
      name: name,
    },
  });

  return updatedCategory;
}

export async function deleteCategory(id) {
  const existingCategory = await prisma.category.findUnique({
    where: { id: id },
  });

  if (!existingCategory) {
    const error = new Error("Category not found");
    error.status = 404;
    throw error;
  }

  await prisma.category.delete({
    where: { id: id },
  });
}