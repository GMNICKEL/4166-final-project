import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../services/categoryService.js";

export async function createCategoryHandler(req, res, next) {
  try {
    const name = req.body.name;
    const newCategory = await createCategory(name);
    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
}

export async function getAllCategoriesHandler(req, res, next) {
  try {
    const categories = await getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
}

export async function getCategoryByIdHandler(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const category = await getCategoryById(id);
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
}

export async function updateCategoryHandler(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const name = req.body.name;
    const updatedCategory = await updateCategory(id, name);
    res.status(200).json(updatedCategory);
  } catch (error) {
    next(error);
  }
}

export async function deleteCategoryHandler(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    await deleteCategory(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}