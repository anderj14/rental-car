
using System.Runtime.Serialization;

namespace Core.Entities
{
    public enum VehicleStatus
    {
        [EnumMember(Value = "Available")]
        Available,

        [EnumMember(Value = "Reserved")]
        Reserved,

        [EnumMember(Value = "In Use")]
        InUse,

        [EnumMember(Value = "Maintenance")]
        Maintenance
    }
}