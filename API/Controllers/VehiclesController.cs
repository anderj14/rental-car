
using API.Errors;
using API.Helpers;
using AutoMapper;
using Core.Dtos;
using Core.Dtos.VehiclesDtos;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class VehiclesController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;
        private readonly IUnitOfWork _unitOfWork;

        public VehiclesController(IUnitOfWork unitOfWork, IMapper mapper, IPhotoService photoService)
        {
            _mapper = mapper;
            _photoService = photoService;
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<ActionResult<Pagination<VehicleDto>>> GetVehicles(
            [FromQuery] VehicleSpecParams vehicleSpecParams
        )
        {
            var spec = new VehicleWithAllSpecification(vehicleSpecParams);

            var countSpec = new VehicleWithFiltersForCountSpecification(vehicleSpecParams);
            var totalItems = await _unitOfWork.Repository<Vehicle>().CountAsync(countSpec);

            var vehicles = await _unitOfWork.Repository<Vehicle>().ListAsync(spec);

            var data = _mapper.Map<IReadOnlyList<VehicleDto>>(vehicles);

            return Ok(new Pagination<VehicleDto>(vehicleSpecParams.PageIndex,
            vehicleSpecParams.PageSize, totalItems, data));
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<VehicleDto>> GetVehicle(int id)
        {
            var spec = new VehicleWithAllSpecification(id);

            var vehicle = await _unitOfWork.Repository<Vehicle>().GetEntityWithSpec(spec);

            if (vehicle == null) return NotFound(new ApiResponse(404));

            return _mapper.Map<Vehicle, VehicleDto>(vehicle);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<VehicleDto>> CreateVehicle([FromBody] CreateVehicleDto createVehicle)
        {
            var vehicle = _mapper.Map<CreateVehicleDto, Vehicle>(createVehicle);

            vehicle.Status = VehicleStatus.Available;

            _unitOfWork.Repository<Vehicle>().Add(vehicle);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem creating vehicle item"));

            return Ok(vehicle);

        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<VehicleDto>> UpdateVehicle(int id, CreateVehicleDto updateVehicleDto)
        {
            var vehicle = await _unitOfWork.Repository<Vehicle>().GetByIdAsync(id);

            _mapper.Map(updateVehicleDto, vehicle);

            vehicle.Status = updateVehicleDto.Status;

            _unitOfWork.Repository<Vehicle>().Update(vehicle);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem updating vehicle"));

            return Ok(vehicle);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> DeleteVehicle(int id)
        {
            var vehicle = await _unitOfWork.Repository<Vehicle>().GetByIdAsync(id);

            if (vehicle.Status != VehicleStatus.Available)
            {
                return BadRequest(new ApiResponse(400, "Cannot delete a vehicle that is not available"));
            }

            foreach (var photo in vehicle.Photos)
            {
                if (photo.Id > 18)
                {
                    _photoService.DeleteFromDisk(photo);
                }
            }

            _unitOfWork.Repository<Vehicle>().Delete(vehicle);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem deleting vehicle"));

            return Ok();
        }

        [HttpPut("{id}/photo")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<VehicleDto>> AddProductPhoto(int id, [FromForm] VehiclePhotoDto photoDto)
        {
            var spec = new VehicleWithAllSpecification(id);
            var vehicle = await _unitOfWork.Repository<Vehicle>().GetEntityWithSpec(spec);

            if (photoDto.Photo.Length > 0)
            {
                var photo = await _photoService.SaveToDiskAsync(photoDto.Photo);

                if (photo != null)
                {
                    vehicle.AddPhoto(photo.PictureUrl, photo.FileName);

                    _unitOfWork.Repository<Vehicle>().Update(vehicle);

                    var result = await _unitOfWork.Complete();

                    if (result <= 0) return BadRequest(new ApiResponse(400, "Problem adding photo vehicle"));
                }
                else
                {
                    return BadRequest(new ApiResponse(400, "problem saving photo to disk"));
                }
            }

            return _mapper.Map<Vehicle, VehicleDto>(vehicle);
        }

        [HttpDelete("{id}/photo/{photoId}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> DeleteVehiclePhoto(int id, int photoId)
        {
            var spec = new VehicleWithAllSpecification(id);
            var vehicle = await _unitOfWork.Repository<Vehicle>().GetEntityWithSpec(spec);

            var photo = vehicle.Photos.SingleOrDefault(x => x.Id == photoId);

            if (photo != null)
            {
                if (photo.IsMain) return BadRequest(new ApiResponse(400, "You cannot delete the main photo"));

                _photoService.DeleteFromDisk(photo);
            }
            else
            {
                return BadRequest(new ApiResponse(400, "PHoto does not exist"));
            }

            vehicle.RemovePhoto(photoId);
            _unitOfWork.Repository<Vehicle>().Update(vehicle);
            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem adding photo product"));

            return Ok();
        }

        [HttpPost("{id}/mainphoto/{photoId}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<VehicleDto>> SetMainPhoto(int id, int photoId)
        {
            var spec = new VehicleWithAllSpecification(id);
            var vehicle = await _unitOfWork.Repository<Vehicle>().GetEntityWithSpec(spec);

            if (vehicle.Photos.All(x => x.Id != photoId)) return NotFound();

            vehicle.SetMainPhoto(photoId);

            _unitOfWork.Repository<Vehicle>().Update(vehicle);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem adding photo vehicle"));

            return _mapper.Map<Vehicle, VehicleDto>(vehicle);
        }
    }
}