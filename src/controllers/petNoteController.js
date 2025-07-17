import PetNoteService from '../services/petNoteService.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/apiResponse.js';

const petNoteService = new PetNoteService();

export const createPetNote = asyncHandler(async (req, res) => {
  const noteData = {
    ...req.body,
    createdBy: req.user.id
  };
  const note = await petNoteService.createPetNote(noteData);
  new ApiResponse(res, 201, note).send();
});

export const getNotesByPetId = asyncHandler(async (req, res) => {
  const notes = await petNoteService.findNotesByPetId(req.params.petId);
  new ApiResponse(res, 200, notes).send();
});

export const getNoteById = asyncHandler(async (req, res) => {
  const note = await petNoteService.findNoteById(req.params.id);
  new ApiResponse(res, 200, note).send();
});

export const updateNote = asyncHandler(async (req, res) => {
  const note = await petNoteService.updateNote(req.params.id, req.body);
  new ApiResponse(res, 200, note).send();
});

export const deleteNote = asyncHandler(async (req, res) => {
  await petNoteService.deleteNote(req.params.id);
  new ApiResponse(res, 200, { message: 'Nota eliminada' }).send();
});

export const getAllNotes = asyncHandler(async (req, res) => {
  const notes = await petNoteService.findAllNotes();
  new ApiResponse(res, 200, notes).send();
});