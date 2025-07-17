import AppointmentService from '../services/appointmentService.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/apiResponse.js';

const appointmentService = new AppointmentService();

export const createAppointment = asyncHandler(async (req, res) => {
  const appointment = await appointmentService.createAppointment(req.body);
  new ApiResponse(res, 201, appointment).send();
});

export const getAppointment = asyncHandler(async (req, res) => {
  const appointment = await appointmentService.getAppointmentById(req.params.id);
  new ApiResponse(res, 200, appointment).send();
});

export const updateAppointment = asyncHandler(async (req, res) => {
  const appointment = await appointmentService.updateAppointment(
    req.params.id,
    req.body
  );
  new ApiResponse(res, 200, appointment).send();
});

export const cancelAppointment = asyncHandler(async (req, res) => {
  const result = await appointmentService.cancelAppointment(req.params.id);
  new ApiResponse(res, 200, result).send();
});

export const getUserAppointments = asyncHandler(async (req, res) => {
  const appointments = await appointmentService.getAppointmentsByUser(req.user.id);
  new ApiResponse(res, 200, appointments).send();
});

export const getPetAppointments = asyncHandler(async (req, res) => {
  const appointments = await appointmentService.getAppointmentsByPet(req.params.petId);
  new ApiResponse(res, 200, appointments).send();
});