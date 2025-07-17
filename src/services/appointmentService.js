import Appointment from '../models/Appointment.js';
import ApiError from '../utils/apiError.js';

export default class AppointmentService {
  async createAppointment(appointmentData) {
    return await Appointment.create(appointmentData);
  }

  async getAppointmentById(id) {
    const appointment = await Appointment.findByPk(id, {
      include: ['cliente', 'mascota', 'servicio', 'estadoCita']
    });
    if (!appointment) throw new ApiError(404, 'Cita no encontrada');
    return appointment;
  }

  async updateAppointment(id, updateData) {
    const appointment = await this.getAppointmentById(id);
    return await appointment.update(updateData);
  }

  async cancelAppointment(id) {
    const appointment = await this.getAppointmentById(id);
    return await appointment.update({ estado_cita_id: 3 }); // Assuming 3 is "Cancelled"
  }

  async getAppointmentsByUser(userId) {
    return await Appointment.findAll({
      where: { cliente_id: userId },
      include: ['mascota', 'servicio', 'estadoCita']
    });
  }

  async getAppointmentsByPet(petId) {
    return await Appointment.findAll({
      where: { mascota_id: petId },
      include: ['servicio', 'estadoCita']
    });
  }

  async getAppointmentsByStatus(statusId) {
    return await Appointment.findAll({
      where: { estado_cita_id: statusId },
      include: ['cliente', 'mascota']
    });
  }
}