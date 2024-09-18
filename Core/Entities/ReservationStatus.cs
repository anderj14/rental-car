
using System.Runtime.Serialization;

namespace Core.Entities
{
    public enum ReservationStatus
    {
        [EnumMember(Value = "Pending")]
        Pending,

        [EnumMember(Value = "Confirmed")]
        Confirmed,

        [EnumMember(Value = "Cancelled")]
        Cancelled,

        [EnumMember(Value = "Completed")]
        Completed
    }
}