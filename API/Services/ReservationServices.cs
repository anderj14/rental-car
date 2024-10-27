using AutoMapper;
using Core.Dtos;
using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
    public class ReservationServices
    {

        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public ReservationServices(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<ReservationDto> CreateReservationAsync(string userId, int vehicleId, int insuranceId, DateTime startTime, DateTime endTime)
        {
            var vehicle = await _unitOfWork.Repository<Vehicle>().GetByIdAsync(vehicleId);
            var insurance = await _unitOfWork.Repository<Insurance>().GetByIdAsync(insuranceId);

            if (vehicle == null) throw new Exception("Vehicle not found!");
            if (insurance == null) throw new Exception("Insurance not found!");

            if (vehicle.Status != VehicleStatus.Available && vehicle.Status != VehicleStatus.Reserved)
            {
                throw new Exception("Vehicle is not available for reservation!");
            }

            try
            {
                var existingReservations = await _unitOfWork.Repository<Reservation>().FindAsync(
                    r => r.VehicleId == vehicleId &&
                         r.Status != ReservationStatus.Cancelled &&
                         r.EndDate > startTime && r.StartDate < endTime
                );

                if (existingReservations.Any())
                {
                    throw new Exception("Vehicle is already reserved for the selected dates.");
                }
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while checking existing reservations.", ex);
            }

            var reservation = new Reservation
            {
                AppUserId = userId,
                VehicleId = vehicleId,
                InsuranceId = insuranceId,
                StartDate = startTime,
                EndDate = endTime,
                Status = ReservationStatus.Pending,
                Vehicle = vehicle,
                Insurance = insurance
            };

            reservation.CalculateDays();
            reservation.CalculateRentalCost();

            vehicle.Status = VehicleStatus.Reserved;

            _unitOfWork.Repository<Reservation>().Add(reservation);
            _unitOfWork.Repository<Vehicle>().Update(vehicle);
            await _unitOfWork.Complete();

            return _mapper.Map<ReservationDto>(reservation);
        }

        public async Task ExpiredReservationAsync()
        {
            var activeReservations = await _unitOfWork.Repository<Reservation>()
                .FindAsync(
                    r => r.Status == ReservationStatus.Pending && r.EndDate <= DateTime.Now,
                    include: q => q.Include(r => r.Vehicle)
                );

            foreach (var reservation in activeReservations)
            {
                if (reservation.Vehicle != null)
                {
                    reservation.Status = ReservationStatus.Completed;
                    reservation.Vehicle.Status = VehicleStatus.Available;

                    _unitOfWork.Repository<Reservation>().Update(reservation);
                    _unitOfWork.Repository<Vehicle>().Update(reservation.Vehicle);
                }
                else
                {
                    throw new Exception($"Vehicle not found for reservation {reservation.ReservationNumber}");
                }
            }

            await _unitOfWork.Complete();
        }

        public async Task DeleteReservationAsync(int reservationId)
        {
            var reservation = await _unitOfWork.Repository<Reservation>().GetByIdAsync(reservationId);

            if (reservation == null)
            {
                throw new Exception("Reservation not found!");
            }

            if (
                reservation.Status == ReservationStatus.Pending ||
                reservation.Status == ReservationStatus.Confirmed ||
                reservation.Status == ReservationStatus.Completed ||
                reservation.Status == ReservationStatus.Cancelled
            )
            {
                var vehicle = await _unitOfWork.Repository<Vehicle>().GetByIdAsync(reservation.VehicleId);
                vehicle.Status = VehicleStatus.Available;

                _unitOfWork.Repository<Vehicle>().Update(vehicle);
            }

            _unitOfWork.Repository<Reservation>().Delete(reservation);

            await _unitOfWork.Complete();

        }
    }
}