
using System.Linq.Expressions;
using Core.Entities;
using Core.Specifications;

namespace Core.Interfaces
{
    public interface IGenericRepository<T> where T : BaseEntity
    {
        Task<T> GetByIdAsync(int id);
        Task<IReadOnlyList<T>> ListAllAsync();

        Task<T> GetEntityWithSpec(ISpecification<T> spec);
        Task<IReadOnlyList<T>> ListAsync(ISpecification<T> spec);
        Task<IReadOnlyList<T>> ListAllByUserAsync(Expression<Func<T, bool>> filter, ISpecification<T> spec, int pageIndex, int pageSize);

        Task<T> GetByConditionAsync(Expression<Func<T, bool>> predicate);

        Task<int> CountAsync(ISpecification<T> spec);
        Task<int> CountByUserAsync(Expression<Func<T, bool>> filter, ISpecification<T> spec);

        void Add(T entity);
        void Update(T entity);
        void Delete(T entity);
    }
}