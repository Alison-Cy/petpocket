import PetNote from '../models/PetNote.js';
import ApiError from '../utils/apiError.js';

export default class PetNoteService {
  async createPetNote(noteData) {
    return await PetNote.create(noteData);
  }

  async findNotesByPetId(petId) {
    return await PetNote.find({ petId })
      .populate('createdBy', 'name email')
      .sort({ date: -1 });
  }

  async findNoteById(id) {
    const note = await PetNote.findById(id).populate('createdBy', 'name');
    if (!note) throw new ApiError(404, 'Nota no encontrada');
    return note;
  }

  async updateNote(id, updateData) {
    const note = await PetNote.findByIdAndUpdate(id, updateData, { 
      new: true 
    });
    if (!note) throw new ApiError(404, 'Nota no encontrada');
    return note;
  }

  async deleteNote(id) {
    const note = await PetNote.findByIdAndDelete(id);
    if (!note) throw new ApiError(404, 'Nota no encontrada');
  }

  async findAllNotes() {
    return await PetNote.find()
      .populate('petId', 'name')
      .populate('createdBy', 'name')
      .sort({ createdAt: -1 });
  }
}